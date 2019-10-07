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
