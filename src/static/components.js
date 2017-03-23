import { boundElements, boundElementsAccessor } from './state'

export const Header = stateHandler => new Promise(resolve => {
  stateHandler.title
    .then(title => { resolve(`<h1>${title}</h1>`) })
})

export const Body = stateHandler => new Promise(resolve => {
  stateHandler.body
    .then(body => { resolve(`<p>${body}</p>`) })
})

// TODO: nirvana-id will be assigned programmatically to each object
// TODO: adding a rendered component to the boundElementsAccessor() will be incapsulated and abstracted from the developer
export const NetworkMessageBar = stateHandler => new Promise(resolve => {
  stateHandler.messageFromAPI
    .then(messageFromAPI => {
      const nirvanaId = 'p4wd'
      resolve (`<p nirvana-id="${nirvanaId}">${messageFromAPI}</p>`)
      boundElementsAccessor().messageFromAPI = { [nirvanaId]: NetworkMessageBar }
      if (boundElements.messageFromAPI && nirvanaId in boundElements.messageFromAPI) { console.log(`boundElement already registered`) }
      else { boundElementsAccessor().messageFromAPI = Object.assign({}, boundElements.messageFromAPI, { [nirvanaId]: NetworkMessageBar }) }
    })
})

export const InputMessageBar = stateHandler => new Promise(resolve => {
  stateHandler.messageFromInput
    .then(messageFromInput => {
      const nirvanaId = 'zkm3'
      resolve (`<p nirvana-id="${nirvanaId}">${messageFromInput}</p>`)
      if (boundElements.messageFromInput && nirvanaId in boundElements.messageFromInput) { console.log(`boundElement already registered`) }
      else { boundElementsAccessor().messageFromInput = Object.assign({}, boundElements.messageFromInput, { [nirvanaId]: InputMessageBar }) }
    })
})

// TODO: Event listener and stateAccessor() to be added programmatically
// TODO: stateAccessor() will accept parameters
export const InputBox = () => Promise.resolve(`<input type="text" oninput="stateAccessor().messageFromInput = this.value" value="">`)
