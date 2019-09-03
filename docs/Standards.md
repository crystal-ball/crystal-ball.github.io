# Project Standards

\_Checklist with shared standards that every repo follows

#### Docs

- Add README.md with docs on why and how, match title for 🔮 Projects, include
  all the rad badges
- Add LICENSE.md
- Add `.npmrc` with `save-exact=true`, and `package-lock=false` for packages
- Add a Contributing.md to the `docs` folder
- Keep docs in `/docs` folder (single file for Github and project documentation
  files)

#### Linting

- Install `eslint-config-eloquence`, ensure that `lint` script uses proper env
  and pretty print: `NODE_ENV=test eslint --format=pretty **/*.js`, and
  `.eslintrc.js`

#### Formatting

Format all JS, JSON, SCSS and Markdown files with Prettier and the
`@crystal-ball/prettier-base` configured in the project package.json:

```json
{
  "scripts": {
    "format": "prettier --write '*.{js,json,md,json}' '**/*.{md,js,json,scss}'"
  },
  "prettier": "@crystal-ball/prettier-base"
}
```

The format match pattern will run against all project directories, include a
`.prettierignore` config to skip generated or managed output:

```
# Skip formatting files generated or managed by other tools

# NPM dependencies
node_modules
package.json
package-lock.json

# Jest LCOV output
coverage

# webpack build output
dist
```

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
