# Releases

!Make it automated

Docs on setting up automated releases with semantic

In CI run: `npx semantic-release`

Include semantic-release-base config in `package.json`

```
{
  "release": {
    "extends": ["@crystal-ball/semantic-release-base"]
  }
}
```

Travis:

1. Add tokens `GH_TOKEN` and `NPM_TOKEN`

?Commiter

- GIT_AUTHOR_NAME
- GIT_AUTHOR_EMAIL
