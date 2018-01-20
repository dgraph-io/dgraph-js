# Publishing to npm

This document contains instructions to publish dgraph-js to [npm].

[npm]: https://www.npmjs.com/

## Before deploying

- Get access to credentials for Dgraph's account on npm with username dgraph-io
- Run `npm login` to login to this account

## Deploying

- Build and test the code that needs to be published
- Bump version by modifying the `version` field in `package.json` file
- Run `npm install` to update the version in `package-lock.json` file
- If necessary, update the `CHANGELOG.md` file to reflect new changes
- Commit the changes
- Run `npm publish` (for a next release run `npm publish --tag next`)
- If necessary, create a new release tag on the Github repository
