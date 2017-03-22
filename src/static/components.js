export const Header = stateHandler => new Promise(resolve => {
  stateHandler.title
    .then(title => { resolve(`<h1>${title}</h1>`) })
})

export const Body = stateHandler => new Promise(resolve => {
  stateHandler.body
    .then(body => { resolve(`<p>${body}</p>`) })
})

export const MessageBar = stateHandler => new Promise(resolve => {
  stateHandler.message
    .then(message => { resolve (`<p>${message}</p>`) })
})
