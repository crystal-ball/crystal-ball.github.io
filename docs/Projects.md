# Crystal Ball Projects

_This guide contains best practices and checklists for setting up and
maintaining Crystal Ball Projects._

## Github

- Create a `.github` directory with contributing, pull request and issue
  templates.
- Update the project labels using the `./scripts/github-labels.sh` script.
- In the repo settings disable wikis, projects and merge commits

## Docs

- Keep the project Readme focused on providing an overview of the project and
  workflows, details can be documented in a guide.
- Project guides or detailed code documentation should be kept in guides in the
  `docs` dir.

## webpack

You can add another loader for Babel transpile of an npm package...

## Dependencies management

- Projects should use exact versions for better control over dependency updates.
  For packages lockfiles should be disabled to more closely mirror how the
  package will be installed.

## Integrations

### Renovate

_Renovate provides a highly configurable automatic dependency upgrade workflow._

#### Setup

Renovate configuration is managed under the org Settings tab in Installed Github
Apps. Renovate will automatically open an initial configuration setup PR after
adding access for a repository.

### Travis

Enable Travis and add a `.travis.yml` to build and test the project.

#### Slack notifications

Setting up Slack notifications for Travis build status:

1. Install the Travis CLI gem `gem install travis --no-document`
1. Create a Github token with user permissions
1. Login to Travis CLI with token `travis login --pro --github-token xxx`
1. Install the Travis Slack integration and configure room
1. Encrypt the `account:token#channel` info for a repo
   `travis encrypt "ACCOUNT:TOKEN#ROOM" --pro --add notifications.slack.rooms`

_[Configuring Slack Notifications](https://docs.travis-ci.com/user/notifications/#configuring-slack-notifications)_

### Code Climate

_Integration with Code Climate provides fun visuals for project code coverage
and some general maintainability best practices._

- https://codeclimate.com/oss/dashboard

#### Setup

Adding a repo to the Code Coverage org will automatically provide
maintainability coverage 🎉 Add code coverage by:

- Output `lcov` code coverage reports from Jest
- Add a `CC_TEST_REPORTER_ID` env var to Travis from the
  `/settings/test_reporter/` Code Climate dashboard.
- Add `before_script` and `after_script` lifecycles to `.travis.yml` to install
  and call the Code Climate reporter.
- Add the badges!

#### Github

- Enable pull request comments

#### Code coverage with Docker containers

Code coverage from tests run inside of a Docker container need to have the path
included when reporting the results. Eg if the tests ran at `/usr/src/app` then
the call to the reporter would need to be:

- `cc-test-reporter format-coverage --prefix /usr/src/app --exit-code $TRAVIS_TEST_RESULT`

> ℹ️ `--exit-code` prevents sending test coverage for failed tests
