/* eslint-disable no-console */
const inquirer = require('inquirer')
const fetch = require('node-fetch')

const orgLabels = [
  { name: 'Satus: In Progress', color: '93C54B' },
  { name: 'Status: Abandoned', color: '000000' },
  { name: 'Status: Help Wanted', color: 'ffc107' },
  { name: 'Status: Needs Info', color: 'ffc107' },
  { name: 'Type: Bug', color: 'd9534f' },
  { name: 'Type: Chore', color: '5b6163' },
  { name: 'Type: Documentation', color: '29ABE0' },
  { name: 'Type: Duplicate', color: 'e6e6e6' },
  { name: 'Type: Enhancement', color: '325D88' },
  { name: 'Type: Feature', color: '325D88' },
  { name: 'Type: Invalid', color: 'e6e6e6' },
  { name: 'Type: Question', color: '29ABE0' },
  { name: 'Type: RFC', color: '29ABE0' },
  { name: 'Type: Refactor', color: '5b6163' },
  { name: 'Type: Test', color: '325D88' },
  { name: 'Type: Wontfix', color: 'e6e6e6' },
]

const createHeaders = token => ({
  Authorization: `Basic ${Buffer.from(`${token}:x-oauth-basic`).toString('base64')}`,
  Accept: 'application/vnd.github.symmetra-preview+json',
})

const fetchCurrentLabels = ({ token, owner, repo }) =>
  fetch(`https://api.github.com/repos/${owner}/${repo}/labels`, {
    headers: createHeaders(token),
  }).then(res => res.json())

const createLabel = (label, { token, owner, repo }) => {
  fetch(`https://api.github.com/repos/${owner}/${repo}/labels`, {
    method: 'POST',
    headers: createHeaders(token),
    body: JSON.stringify(label),
  })
}

const updateLabel = (label, { token, owner, repo }) => {
  fetch(`https://api.github.com/repos/${owner}/${repo}/labels/${label.name}`, {
    method: 'PATCH',
    headers: createHeaders(token),
    body: JSON.stringify(label),
  })
}

const deleteLabel = (label, { token, owner, repo }) => {
  fetch(`https://api.github.com/repos/${owner}/${repo}/labels/${label}`, {
    method: 'DELETE',
    headers: createHeaders(token),
  })
    .then(res => {
      if (!res.ok) throw new Error(`Delete for label ${label} failed`)
    })
    .catch(err => console.warn(err))
}

/**
 * Validate the existing repo labels, this allows deleting unwanted labels and
 * keeping custom repository labels
 * @param {Array} existingLabels
 * @param {Object} auth
 */
const validateCurrentLabels = (existingLabels, auth) =>
  new Promise(resolve => {
    const validateLabels = () => {
      if (!existingLabels.length) {
        // When there are no more labels left, resolve
        resolve()
      } else {
        const existingLabel = existingLabels.shift()

        if (orgLabels.find(orgLabel => orgLabel.name === existingLabel.name)) {
          validateLabels()
        } else {
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'shouldDelete',
                message: `Delete label "${existingLabel.name}"?`,
                default: () => true,
              },
            ])
            .then(({ shouldDelete }) => {
              if (shouldDelete) deleteLabel(existingLabel.name, auth)
              validateLabels()
            })
        }
      }
    }

    validateLabels()
  })

/**
 * Compare each org label with existing repo labels, if label doesn't exist create
 * it, if label exists but is missing info update it
 * @param {Array} existingLabels
 * @param {Object} auth
 */
const createOrgLabels = (existingLabels, auth) =>
  new Promise(resolve => {
    const labelExists = a => b => a.name === b.name
    const labelMatches = a => b =>
      a.name === b.name && a.color === b.color && a.description === b.description

    const createLabels = () => {
      if (!orgLabels.length) {
        resolve()
      } else {
        const orgLabel = orgLabels.shift()

        if (existingLabels.find(labelMatches(orgLabel))) {
          // Label already exists, do nothing
        } else if (existingLabels.find(labelExists(orgLabel))) {
          updateLabel(orgLabel, auth)
        } else {
          createLabel(orgLabel, auth)
        }

        createLabels()
      }
    }

    createLabels()
  })

inquirer
  .prompt([
    {
      type: 'password',
      message: 'GitHub Personal Access Token 🔑: ',
      name: 'token',
      mask: '*',
    },
    {
      type: 'input',
      name: 'owner',
      message: 'Repository owner (eg owner of owner/repo): ',
    },
    {
      type: 'input',
      name: 'repo',
      message: 'Repository name (eg repo of owner/repo): ',
    },
  ])
  .then(async auth => {
    try {
      const currentLabels = await fetchCurrentLabels(auth)

      await validateCurrentLabels([...currentLabels], auth)
      await createOrgLabels([...currentLabels], auth)
    } catch (err) {
      console.warn('Github labels update failed')
      console.warn(err)
    }

    console.log('Finished 🎉')
  })
