const root = document.getElementById('root')

function renderToDOM (componentPromise, target) {
  componentPromise().then(component => {
    target.innerHTML = component
  })
}

let state = {
  title: `Nirvana`,
  body: `Next-generation browser application framework`
}

const stateAccessor = new Proxy(
  state,
  {
    get: (target, propKey) => {
      console.log(`GET ${propKey}`)
      if (propKey in target) {
        console.log(`propKey "${propKey}" found in target; getting from state`)
        return Promise.resolve(Reflect.get(target, propKey))
      } else {
        console.log(`propKey "${propKey}" not found in target; fetching from network`)
        return fetch('./api/index.json')
          .then(response => response.json())
          .then(json => {
            console.log(`Saving "${propKey}" in target`)
            state[propKey] = json[propKey]
          })
          .then(() => new Promise(resolve => {
            resolve(Reflect.get(target, propKey))
          }))
      }
    },
    set: (target, propKey, propValue) => {
      console.log(`SET ${propKey} to ${propValue}`)
      Reflect.set(target, propKey, propValue)
      renderToDOM(Home, root)
    },
    deleteProperty: (target, propKey) => {
      console.log(`DELETE ${propKey}`)
      if (propKey in target) {
        console.log(`propKey "${propKey}" found in target; deleting`)
        Reflect.deleteProperty(target, propKey)
        renderToDOM(Home, root)
      }
      else console.log(`${propKey} not found in target; doing nothing`)
    }
  }
)

const Header = () => new Promise(resolve => {
  stateAccessor.title
    .then(title => { resolve(`<h1>${title}</h1>`) })
})

const Body = () => new Promise(resolve => {
  stateAccessor.body
    .then(body => { resolve(`<p>${body}</p>`) })
})

const MessageBar = () => new Promise(resolve => {
  stateAccessor.message
    .then(message => { resolve (`<p>${message}</p>`) })
})

const RefreshButton = () => Promise.resolve(`<button onclick="renderToDOM(Home, root)">Refresh</button>`)

const DeleteButton = () => Promise.resolve(`<button onclick="delete stateAccessor.message">Delete</button>`)

const ChangeMessageButton = () => Promise.resolve(`<button onclick="stateAccessor.message='Sono il signore del male'">Change message</button>`)

const Home = () => Promise.all([
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

renderToDOM(Home, root)
