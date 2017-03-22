export const Header = (stateHandler) => new Promise(resolve => {
  stateHandler.title
    .then(title => { resolve(`<h1>${title}</h1>`) })
})

export const Body = (stateHandler) => new Promise(resolve => {
  stateHandler.body
    .then(body => { resolve(`<p>${body}</p>`) })
})

export const MessageBar = (stateHandler) => new Promise(resolve => {
  stateHandler.message
    .then(message => { resolve (`<p>${message}</p>`) })
})

export const RefreshButton = (component) => Promise.resolve(`<button onclick="renderToDOM(Home, root)">Refresh</button>`)

export const DeleteButton = (stateHandler) => Promise.resolve(`<button onclick="delete stateAccessor(Home).message">Delete</button>`)

export const ChangeMessageButton = (stateHandler) => Promise.resolve(`<button onclick="stateAccessor(Home).message='Sono il signore del male'">Change message</button>`)