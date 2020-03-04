import React from 'react'
import { render } from 'react-dom'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider as EmotionTheme } from 'emotion-theming'
import svgSymbolSpriteLoader from 'svg-symbol-sprite-loader'

import './utils/require-icons'

import App from './components/App/App'
import { NODE_ENV } from './config/environment'

// Injects SVG symbol sprite into document from local storage if it exists,
// otherwise fetch, cache in local storage and inject.
svgSymbolSpriteLoader({ useCache: NODE_ENV === 'production' })

// Configure components that will be used to render elements parsed out by MDX
const components = {
  pre: props => <div {...props} />,
}

// Start the party 🎉
// Render all of the root application providers then application root component
render(
  <React.StrictMode>
    <EmotionTheme theme={{}}>
      <MDXProvider components={components}>
        <App />
      </MDXProvider>
    </EmotionTheme>
  </React.StrictMode>,
  document.getElementById('root'),
)
