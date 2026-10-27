import 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import './styles/external.global.scss'
import './styles/base.scss'

import { createRoot } from 'react-dom/client'

import { addUiCSS } from '../utils'
import { App } from './App'
import { initLinkInterceptor } from './router'

if (import.meta.env?.RD_THEME__ROOT) {
  addUiCSS(import.meta.env.RD_THEME__ROOT, 'root')
}

initLinkInterceptor()

document.getElementById('main-loader')?.remove()

createRoot(document.getElementById('root')!).render(<App />)
