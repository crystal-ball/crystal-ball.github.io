# Dependencies management

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
-

<!-- Links -->
[Renovate]:https://renovatebot.com/