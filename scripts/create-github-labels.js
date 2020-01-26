/* eslint-disable no-console */

'use strict'

const inquirer = require('inquirer')
const fetch = require('node-fetch')

const projectLabels = [
  { name: 'Breaking Changes', color: 'ff3b8c' },
  { name: 'Epic', color: '5f63b7' }, // Zenhub
  { name: 'Released', color: 'e10079' }, // Semantic Release
  { name: 'Renovate', color: '32c3c2' }, // Renovate
  { name: 'Status: Abandoned', color: '000000' },
  { name: 'Status: Help Wanted', color: 'ffc107' },
  { name: 'Status: Icebox', color: 'bae6d9' },
  { name: 'Status: In Progress', color: '93C54B' },
  { name: 'Status: Needs Info', color: 'ffc107' },
  { name: 'Type: Bug', color: 'd9534f' },
  { name: 'Type: Chore', color: '5b6163' },
  { name: 'Type: Documentation', color: '29ABE0' },
  { name: 'Type: Duplicate', color: 'e6e6e6' },
  { name: 'Type: Enhancement', color: '325D88' },
  { name: 'Type: Feature', color: '325D88' },
  { name: 'Type: Fix', color: '5b6163' },
  { name: 'Type: Invalid', color: 'e6e6e6' },
  { name: 'Type: Question', color: '29ABE0' },
  { name: 'Type: Refactor', color: '5b6163' },
  { name: 'Type: RFC', color: '29ABE0' },
  { name: 'Type: Spike', description: 'Timeboxed exploration', color: 'bae6d9' },
  { name: 'Type: Test', color: '325D88' },
  { name: 'Type: Wontfix', color: 'e6e6e6' },
]

const createHeaders = token => ({
  Authorization: `Basic ${Buffer.from(`${token}:x-oauth-basic`).toString('base64')}`,
  Accept: 'application/vnd.github.symmetra-preview+json',
})

const createLabel = (label, { token, owner, repo }) =>
  fetch(`https://api.github.com/repos/${owner}/${repo}/labels`, {
    method: 'POST',
    headers: createHeaders(token),
    body: JSON.stringify(label),
  })

const updateLabel = (label, { token, owner, repo }) =>
  fetch(`https://api.github.com/repos/${owner}/${repo}/labels/${label.name}`, {
    method: 'PATCH',
    headers: createHeaders(token),
    body: JSON.stringify(label),
  })

const deleteLabel = (label, { token, owner, repo }) =>
  fetch(`https://api.github.com/repos/${owner}/${repo}/labels/${label}`, {
    method: 'DELETE',
    headers: createHeaders(token),
  })
    .then(res => {
      if (!res.ok) throw new Error(`Delete for label ${label} failed`)
    })
    .catch(err => console.warn(err))

/**
 * Fetch the current set of labels for a repo
 */
const fetchCurrentLabels = ({ token, owner, repo }) =>
  fetch(`https://api.github.com/repos/${owner}/${repo}/labels`, {
    headers: createHeaders(token),
  }).then(res => res.json())

/**
 * Prompt for each currenlty existing label if it doesn't match the default set
 * to allow for optionally deleting them.
 * @param {Array} existingLabels
 * @param {Object} auth
 */
const optionalLabelsDelete = async (existingLabels, auth) => {
  if (!existingLabels.length) return

  for (const label of existingLabels) {
    // Skip existing labels that are also project default labels
    if (projectLabels.find(({ name }) => name === label.name)) continue

    // Wait for response before moving on to next question
    /* eslint-disable-next-line no-await-in-loop */
    const { shouldDelete } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldDelete',
        message: `Delete label "${label.name}"?`,
        default: () => true,
      },
    ])

    if (shouldDelete) deleteLabel(label.name, auth)
  }
}

/**
 * Compare each of the default project labels with the currently existing repo
 * labels, if a label doesn't exist yet create it, if label exists but is
 * missing info update it
 * @param {Array} existingLabels
 * @param {Object} auth
 */
const createOrgLabels = async (existingLabels, auth) => {
  // Checks if a label exists and matches all properties
  const matches = (a, b) =>
    a.name === b.name && a.color === b.color && a.description === b.description
  // Checks if a label name exists
  const exists = (a, b) => a.name === b.name

  for (const projectLabel of projectLabels) {
    if (existingLabels.find(label => matches(label, projectLabel))) {
      // Project label already exists, do nothing
    } else if (existingLabels.find(label => exists(label, projectLabel))) {
      // Project label exists, but needs to be updated (wait for update before
      // moving on to next label)
      /* eslint-disable-next-line no-await-in-loop */
      await updateLabel(projectLabel, auth)
    } else {
      // Create the project label (wait for update before
      // moving on to next label)
      /* eslint-disable-next-line no-await-in-loop */
      await createLabel(projectLabel, auth)
    }
  }
}

const createGithubLabels = async () => {
  try {
    const auth = await inquirer.prompt([
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

    const currentLabels = await fetchCurrentLabels(auth)

    await optionalLabelsDelete(currentLabels, auth)
    await createOrgLabels(currentLabels, auth)

    console.log('Finished 🎉')
  } catch (err) {
    console.warn('Github labels update failed 😢')
    console.warn(err)
  }
}

// 🚀 Kick it off
createGithubLabels()
