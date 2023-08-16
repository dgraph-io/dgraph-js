# Publishing to npm

This document contains instructions to publish dgraph-js-http to [npm].

[npm]: https://www.npmjs.com/

## Before deploying

- Bump version by modifying the `version` field in `package.json` file
- If necessary, regenerate protobufs by runnings `bash generate_proto.sh`
- Run `npm install` to update the version in `package-lock.json` file
- Update changelog
- Commit these changes

## Deploying

- Publish github release notes (specify version tag upon publish)
- Run `cd-dgraph-js` workflow (input: version tag)
