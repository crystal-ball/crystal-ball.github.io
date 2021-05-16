# Contributing Guide for 🔮 Projects

_👋 Welcome and thank you for contributing, you are awesome 🎉_

## Code of Conduct

Please read the repository [Code of Conduct][], we take it seriously and
contributors are required to adhere to the guidelines.

## Code authoring

This project uses ESLint and Prettier to make writing consistent code easy.
Formatting and linting can be run with npm commands:

```sh
# Format the project with Prettier
npm run format

# Lint the project with ESLint
npm run test:lint
```

Commit messages are generated with [Commitizen][] to make writing consistent
commit messages easy. On commit a Husky pre-commit hook will start an
interactive terminal session to step through each part of the commit message
with prompts.

> ℹ️ Commitizen commit messages make it possible to use Semantic Release to
> automatically publish packages on change to main.

## Roadmap

_ℹ️ Roadmap items track long term project goals, see the [ZenHub board][] for
ready to work issues._

- Testing and application development for improved continuous deployment
  capabilities: Acceptance testing for applications should _always_ mock API
  requests to ensure test outcome is determined by the code being tested and no
  the environment tests run in. The most robust system is a fault tolerant
  system -> Applications should expect APIs to change unexpectedly and to fail
  at some point. Running acceptance tests against unstable environments is not
  the way to handle this, it only provides point in time confidence for a
  continuous concern. **Instead** applications should leverage the API layer to
  validate responses. Response failures and changes to expected data structures
  should trigger alerting, and the UI should gracefully fall back to an error
  message.

  - Should include an error type for debugging, eg 'connection failure',
    'response failure', 'validation failure', etc.
  - UI should always provide the user context, no matter what the API responses
    return

  Developing applications in this way enables faster, more stable acceptance
  testing, and a more robust system in entirety. It also encourages self
  documenting API layers and shared ownership for the status of the system.

- Document the motivation for the directory structure in applications.
  - Design system components are managed in Componentry, Applications rely on
    the design system for managing shared styles and providing hooks for user
    events. This enables writing self contained application logic in the app
    components.
  - Components used in more than one screen are kept in `universal` to provide
    quick understanding of which elements are unique to screens. This is also
    where wrapper components for logic can be setup, eg an application Link
    component that handles dispatching redux actions to the store.
  - Screens provide easy mental mapping of the application structure and should
    be used to isolate application layout styling and composition.

<!-- Links -->
<!-- prettier-ignore-start -->
[Commitizen]:https://commitizen.github.io/cz-cli/
[Code of Conduct]:../CODE_OF_CONDUCT.md
[ZenHub board]:https://github.com/crystal-ball/crystal-ball.github.io#workspaces/-projects-5b88b5c9af3c0a2186966767/board?repos=131720045
<!-- prettier-ignore-end -->
