'use strict'

import { state, stateAccessor } from './state'
import { renderToDOM } from './renderer'
import { Header, Body, MessageBar, RefreshButton, DeleteButton, ChangeMessageButton, Home } from './components'

const root = document.getElementById('root')

renderToDOM(Home, root)
