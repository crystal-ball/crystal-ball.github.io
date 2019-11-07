# Continuous Integration and Deployment

_Configure github actions for each repo to handle testing each pull request and
deploying on change to master._

## Continous integration

- Github action configuration
- Zeit for applications
- Should build and run tests for each PR

## Continuous deployment

- Github action configuration
- Should use Semantic Release for publishing npm packages. Include package.json
  release field to configure:

  ```json
  {
    "release": {
      "extends": ["@crystal-ball/semantic-release-base"]
    }
  }
  ```

## Providing commit info for Cypress+Percy

Because CI runs in Docker, on pull requests, Cypress+Percy are unable to
determine the git info for the merge commit being tested and show
_unknown_/`HEAD` as the branch. This is fixed by checking for a merging branch
commit SHA in the `github` workflow context. If it exists it's used to determine
the commit info for the test run, otherwise the Github Action workflow env
variables contain the correct info for master branch pushes.
