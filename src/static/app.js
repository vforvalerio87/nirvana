'use strict'

import { Home } from './home'
import { renderToDOM } from './renderer'

const root = document.getElementById('root')

renderToDOM(Home, root)
