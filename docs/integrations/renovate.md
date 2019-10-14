# Renovate

_Repositories should automate dependencies management with Renovate Bot._

Renovate is configured in order to run automated package updates once per week.
The dependency and devDependency updates are split into separate PRs with
prefixes to trigger a release for the dependency updates only.

A master issue is created for each repo just for funesies and all Renovate PRs
are labeled with the `Renovate` label.

```jsonc
{
  // Require a human to merge PRs
  "automerge": false,
  // Ignore package.json files in node_modules dirs
  "ignorePaths": ["**/node_modules/**"],
  // Only upgrade to unstable versions, eg 2.4.0-rc3, if the _current_ version
  // is unstable
  "ignoreUnstable": true,
  // Github PR label
  "labels": ["Renovate"],
  // Do not update the lockfile unless the package.json is also updating
  "lockFileMaintenance": {
    "enabled": false
  },
  "masterIssue": true,
  "masterIssueTitle": "Renovate Bot - Dependencies Management",
  // Always pin devDependencies, pin dependencies if repo is an application or
  // service. Allows having range dependencies for npm packages
  "rangeStrategy": "auto",
  // Run once per weekend
  "schedule": ["every weekend"],
  // Create the PR immediately after issue is created
  "prCreation": "immediate",
  // Update existing PRs with new versions immediately
  "updateNotScheduled": true,

  // dependency and devDependency updates are split into groups in order to
  // use commitizen prefixes that will trigger a release for dependency changes
  // but not for devDependencies
  "packageRules": [
    {
      "packagePatterns": ["*"],
      "commitMessagePrefix": "Chore: ",
      "commitMessageSuffix": " 🆙",
      "minor": {
        "groupName": "minor devDependencies",
        "groupSlug": "minor-devDependencies"
      }
    },
    {
      "depTypeList": ["dependencies"],
      "commitMessagePrefix": "Update: ",
      "commitMessageSuffix": " 🆙",
      "minor": {
        "groupName": "minor dependencies",
        "groupSlug": "minor-dependencies"
      }
    }
  ]
}
```

[Renovate Docs](https://docs.renovatebot.com/)
