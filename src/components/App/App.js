import React from 'react'

import PrinciplesScreen from '@/components/PrinciplesScreen/PrinciplesScreen.mdx'
import ProcessScreen from '@/components/ProcessScreen/ProcessScreen.mdx'

export default function App() {
  return (
    <div>
      <h1>The Order of the Crystal Code Wizards</h1>

      <em>
        Resources for developing <bold>wonderful</bold> projects
      </em>

      <PrinciplesScreen />
      <ProcessScreen />

      <h2>Repositories</h2>

      <ul>
        <li>componentry</li>
        <li>componentry-dot-design</li>

        <li>react-application-prototype</li>
        <li>nodejs-service-prototype</li>

        <li>commitizen-base</li>
        <li>prettier-base</li>
        <li>semantic-release-base</li>
        <li>webpack-base</li>
        <li>eslint-config-eloquence</li>
        <li>svg-symbol-sprite-loader</li>
      </ul>
    </div>
  )
}
