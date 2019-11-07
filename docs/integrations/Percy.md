# [Percy](https://docs.percy.io/docs)

Percy provides visual regression testing. It is integrated with Cypress and
takes snapshots during acceptance tests.

## Setup

1. Install the dependency: `@percy/cypress`
1. Setup healthcheck in `cypress/plugins/index.js`
1. Import command in `cypress/support/index.js`
1. Get `PERCY_TOKEN` from Percy dashboard and add to CI/CD secrets
1. Add a Dockerfile to `cypress` dir to enable installing additional testing
   dependencies for Cypress and overriding the run command to use Percy
1. The Percy app isn't able to determine the branch for PRs or for Docker runs,
   Set a `PERCY_BRANCH` environment variable to fix.

_See *CI-CD#Providing commit info for Cypress+Percy* for details on parsing out
commit info during workflow runs._

### Ref

- [Percy environment variables][] are used to instruct Percy which branch is
  being tested.
- [Percy tutorials][] has example apps for using with Cypress and Storybook.

<!-- Links -->
<!-- prettier-ignore-start -->
[Percy environment variables]:https://docs.percy.io/v1/docs/environment-variables
[Percy tutorials]:https://docs.percy.io/docs/example-apps
<!-- prettier-ignore-end -->
