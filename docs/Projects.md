# Crystal Ball Projects

_This guide contains best practices and checklists for setting up and
maintaining Crystal Ball Projects._

## Github

- Create a `.github` directory with contributing, pull request and issue
  templates.
- Update the project labels using the `./scripts/github-labels.sh` script.
- In the repo settings disable wikis and merge commits

## Docs

- Keep the project Readme focused on providing an overview of the project and
  workflows, details can be documented in a guide.
- Project guides or detailed code documentation should be kept in guides in the
  `docs` dir.

## Dependencies management

- Projects should use exact versions for better control over dependency updates.
  For packages lockfiles should be disabled to more closely mirror how the
  package will be installed.
