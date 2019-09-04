# Dependencies management

_Dependencies management involves installing exact versions to try and ensure
consistent builds. Renovate should be run weekly against repos to update
dependencies._

### Shared

- Include `.npmrc` for exact versions:

  ```
  exact=true
  ```

- Use [Renovate][] to auto manage dependency updates.
- Pin dependencies, base packs can also lock dependencies because they are
  managing that domain for a project.
- Schedule Renovate to run every Sunday
  ```
  "schedule": ["every weekend"]
  ```
- Always use `npm ci` in CI/CD builds for apps/services to install from the
  package lockfile.
- Include label for Renovate
  ```
  "labels": ["Renovate"]
  ```
- Include a `"masterIssue"` for funesies

```
{
  "extends": [
    "config:base"
  ],
  "commitMessagePrefix": "Upgrade: ",
  "labels": [
    "Renovate"
  ],
  "masterIssue": true,
  "schedule": [
    "every weekend"
  ]
}
```

### Packages

- Include config in `.npmrc` to skip generating a package lockfile, this will
  more closely resemble how the package is consumed
  ```
  package-lock=false
  ```

<!-- Links -->

[renovate]: https://renovatebot.com/