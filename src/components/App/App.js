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
    </div>
  )
}
