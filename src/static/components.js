import { stateAccessor } from './state'

export const Header = () => new Promise(resolve => {
  stateAccessor.title
    .then(title => { resolve(`<h1>${title}</h1>`) })
})

export const Body = () => new Promise(resolve => {
  stateAccessor.body
    .then(body => { resolve(`<p>${body}</p>`) })
})

export const MessageBar = () => new Promise(resolve => {
  stateAccessor.message
    .then(message => { resolve (`<p>${message}</p>`) })
})

export const RefreshButton = () => Promise.resolve(`<button onclick="renderToDOM(Home, root)">Refresh</button>`)

export const DeleteButton = () => Promise.resolve(`<button onclick="delete stateAccessor.message">Delete</button>`)

export const ChangeMessageButton = () => Promise.resolve(`<button onclick="stateAccessor.message='Sono il signore del male'">Change message</button>`)

export const Home = () => Promise.all([
  Header(),
  Body(),
  MessageBar(),
  RefreshButton(),
  DeleteButton(),
  ChangeMessageButton()
])
  .then(([
    headerElement,
    bodyElement,
    messageBarElement,
    refreshButtonElement,
    deleteButtonElement,
    changeMessageButtonElement
  ]) => new Promise(resolve => {
    resolve(
      `${headerElement}
      ${bodyElement}
      ${messageBarElement}
      ${refreshButtonElement}
      ${deleteButtonElement}
      ${changeMessageButtonElement}`
    )})
  )
