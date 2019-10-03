const dgraph = require('dgraph-js');
const grpc = require('grpc');
const twitter = require('twitter');

const creds = require('./credentials.json');
const client = new twitter(creds);

const ALPHA_ADDR = process.env.ALPHA_ADDR || "localhost:9080"
const LOG_INTERVAL_TIME = process.env.LOG_INTERVAL_TIME || 2000;
const startStatus = new Date().getTime();

let lastStatus = 0;
let retry = true;
let failureCount = 0;
let totalTweets = 0;
let oldTotalTweets = 0;
let retryCount = 0;
let errorCount = 0;

const dgraphClientStub = new dgraph.DgraphClientStub(ALPHA_ADDR, grpc.credentials.createInsecure());
const dgraphClient = new dgraph.DgraphClient(dgraphClientStub);

async function setSchema() {
  const schema = `
    type Tweet {
        id_str: string
        created_at: dateTime
        message: string
        urls: [string]
        hashtags: [string]
        author: [User]
        mention: [User]
        retweet: bool
    }

    type User {
        user_id: string
        user_name: string
        screen_name: string
        description: string
        friends_count: int
        verified: bool
        profile_banner_url: string
        profile_image_url: string
    }

    user_id: string @index(exact) .
    user_name: string @index(hash) .
    screen_name: string @index(term) .
    id_str: string @index(exact) .
    created_at: dateTime @index(hour) .
    urls: [string] @index(term) .
    hashtags: [string] @index(exact) .
    mention: [uid] @count @reverse .
    author: [uid] @count @reverse .
  `;
  const op = new dgraph.Operation();
  op.setSchema(schema)
  await dgraphClient.alter(op);
}

async function upsertData(jsonObj, query) {
  try {
    const mu = new dgraph.Mutation();
    mu.setSetJson(jsonObj);

    const req = new dgraph.Request();
    req.setMutationsList([mu]);
    req.setQuery(query);
    req.setCommitNow(true);

    await dgraphClient.newTxn().doRequest(req);
  } catch (err) {
    const errMsg = err.message;
    if (errMsg.includes('connection refused')) {
      // wait for alpha to restart
      console.log('ERROR Connection refused... waiting a bit');
      await wait(5000);
    } else if (errMsg.includes('already been committed or discarded')) {
      failureCount += 1;
    } else if (retry && errMsg.includes('Please retry')) {
      retryCount += 1;
      await wait(100);
      retry = false;
      await upsertData(jsonObj, query);
    } else {
      errorCount += 1;
      console.log(`ERROR Unable to commit.\n${err}\n`);
    }
  }
}

async function filterTweet(tweet) {
  const userMentions = [];
  const usersObject = [];
  usersObject[tweet.user.id_str] = 'uid(u)';
  tweet.entities.user_mentions.forEach((element, index) => {
    let uid;
    if (usersObject[element.id_str] != undefined) {
      uid = usersObject[element.id_str];
    } else {
      uid = `uid(m${index+1})`;
      usersObject[element.id_str] = uid;
    }
    userMentions.push({
      'uid': uid,
      'user_id': element.id_str,
      'dgraph.type': 'User',
      'user_name': element.name,
      'screen_name': element.screen_name,
    });
  });
  const hashtags = [];
  tweet.entities.hashtags.forEach((element) => {
    hashtags.push(element.text);
  });
  const author = {
    'uid': `uid(u)`,
    'user_id': tweet.user.id_str,
    'dgraph.type': 'User',
    'user_name': tweet.user.name,
    'screen_name': tweet.user.screen_name,
    'description': tweet.user.description,
    'friends_count': tweet.user.friends_count,
    'followers_count': tweet.user.followers_count,
    'verified': tweet.user.verified,
    'profile_banner_url': tweet.user.profile_banner_url,
    'profile_image_url': tweet.user.profile_image_url,
  };
  const userObj = {
    'uid': `uid(t)`,
    'id_str': tweet.id_str,
    'dgraph.type': 'Tweet',
    'created_at': new Date(tweet.created_at),
    'message': tweet.text,
    'urls': tweet.urls,
    'hashtags': hashtags,
    'mention': userMentions,
    'author': author,
  };
  return userObj;
}

async function buildQuery(tweet) {
  const usersObject = [];
  const query = [];

  query.push(`t as var(func: eq(id_str, "${tweet.id_str}"))`);
  query.push(`u as var(func: eq(user_id, "${tweet.author.user_id}"))`);

  usersObject[tweet.author.user_id] = 'u';

  tweet.mention.forEach((element, index) => {
    let name;
    if (usersObject[element.user_id] != undefined) {
      name = usersObject[element.user_id];
    } else {
      name = `m${index+1}`;
      query.push(`${name} as var(func: eq(user_id, ${element.user_id}))`);
      usersObject[element.user_id] = name;
    }
  });

  const finalQuery = `query {${query.join('\n')}}`;
  return finalQuery;
}

function reportStats() {
  const now = new Date().getTime();
  // tslint:disable-next-line no-console
  console.log(`STATS Tweets: ${totalTweets}, Failues: ${failureCount}, Retries: ${retryCount}, \
Errors: ${errorCount}, Commit Rate: ${(totalTweets-oldTotalTweets)/(LOG_INTERVAL_TIME/1000)}  Total Time: ${now - startStatus} ms`);
  oldTotalTweets = totalTweets;
}

async function wait(time) {
  return new Promise((resolve) => {
    const id = setTimeout(
        () => {
          clearTimeout(id);
          resolve();
        },
        time,
    );
  });
}

async function main() {
  await setSchema();
  setInterval(reportStats, LOG_INTERVAL_TIME);
  client.stream('statuses/sample.json', function(stream) {
    stream.on('data', async function(tweet) {
      totalTweets += 1;
      const tweetObj = await filterTweet(tweet);
      const queries = await buildQuery(tweetObj);
      retry = true;
      await upsertData(tweetObj, queries);
    });
    stream.on('error', function(error) {
      console.log(error);
    });
  });
}

main().then(() => {
  console.log(`\nReporting stats every ${LOG_INTERVAL_TIME/1000} seconds\n`)
}).catch((e) => {
  console.log(e);
});
