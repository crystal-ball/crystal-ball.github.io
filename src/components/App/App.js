import React from 'react'

import PrinciplesScreen from '@/components/PrinciplesScreen/PrinciplesScreen.mdx'
import ProcessScreen from '@/components/ProcessScreen/ProcessScreen.mdx'
import NodePrototypeScreen from '@/components/NodePrototypeScreen/NodePrototypeScreen.mdx'
import ReactPrototypeScreen from '@/components/ReactPrototypeScreen/ReactPrototypeScreen.mdx'
import PackagesScreen from '@/components/PackagesScreen/PackagesScreen.mdx'

export default function App() {
  return (
    <div>
      <h1>The Order of the Crystal Code Wizards</h1>

      <em>
        Resources for developing <bold>wonderful</bold> projects.
      </em>

      <p>
        These guides provide reference for common problems and questions. They are a
        resource for increasing velocity by automating solving problems that have already
        been solved.
      </p>

      <PrinciplesScreen />
      <ProcessScreen />

      <h1>Prototypes</h1>
      <NodePrototypeScreen />
      <ReactPrototypeScreen />

      <h1>Packages</h1>
      <PackagesScreen />

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
