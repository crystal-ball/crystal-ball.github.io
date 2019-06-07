# Project Standards

_Checklist with standards to ensure that each repo shares_

#### Docs

- Add README.md with docs on why and how, match title for 🔮 Projects, include
  all the rad badges
- Add LICENSE.md
- Add `.npmrc` with `save-exact=true`, and `package-lock=false` for packages
- Add a Contributing.md to the `docs` folder

#### Linting

- Install `eslint-config-eloquence`, ensure that `lint` script uses proper env
  and pretty print: `NODE_ENV=test eslint --format=pretty **/*.js`, and
  `.eslintrc.js`

#### Formatting

- `@crystal-ball/prettier-base` w/ package config + npm script

#### Commit Semantics

- Install `@crystal-ball/commit-semantics` and `husky`
- Add package configs and `.travis.yml`
- Setup Travis with Github and NPM tokens

#### Deps maintenance

- Setup Renovate for managing dependencies with the `renovate.json`

## Github

- Update the project labels using the `./scripts/github-labels.sh` script.
- Uncheck merge commits from allowed merge types in repo settings
- Add a docs dir with PR and issue templates
