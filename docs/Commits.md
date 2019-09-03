# Commits

_*Goal* Automate generating a changelog and determining package version for a release
using its commits._

#### Workflow

1. Use [`husky`][] and [`commitizen`][] to create a pre-commit hook with
   Commitizen interactive prompts to create commits.
1. Use the Github [Commit Lint][] app to add a check to PRs linting commit
   format.
1. (TBD) Use [`semantic-release`][] to manage all publish tasks, including tags,
   changelogs and npm publishing

#### Commit format

The [ESLint commit format][] is automatically constructed by Commitizen.

#### Commitizen+Husky

*Install dependencies*

```
npm i -D commitizen cz-adapter-eslint husky
```

*Add git hook with Husky*

```
  "husky": {
    "hooks": {
      "prepare-commit-msg": "exec < /dev/tty && git cz --hook"
    }
  }
```


<!-- Links -->
[`husky`]:https://github.com/typicode/husky
[`commitizen`]:https://github.com/commitizen/cz-cli
[`semantic-release`]:https://github.com/semantic-release/semantic-release
[Commit Lint]:https://www.commit-lint.com/
[ESLint commit guidelines]:https://eslint.org/docs/developer-guide/contributing/pull-requests#step-2-make-your-changes
