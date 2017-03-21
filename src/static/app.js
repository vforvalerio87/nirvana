const root = document.getElementById('root')

function renderToDOM (componentPromise, target) {
  const promise = componentPromise()
  promise.then(component => {
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
      if (propKey in target) {
        console.log(`propKey "${propKey}" found in target; getting from state`)
        return Promise.resolve(Reflect.get(target, propKey))
      } else {
        console.log(`propKey "${propKey}" not found in target; fetching from network`)
        return fetch('./api/index.json')
          .then(response => response.json())
          .then(json => {
            target[propKey] = json[propKey]
          })
          .then(() => new Promise(resolve => {
            resolve(Reflect.get(target, propKey))
          }))
      }
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

const DeleteButton = () => Promise.resolve(`<button onclick="delete state.message">Delete</button>`)

const Home = () => Promise.all([
  Header(),
  Body(),
  MessageBar(),
  RefreshButton(),
  DeleteButton()
])
  .then(([
    headerElement,
    bodyElement,
    messageBarElement,
    refreshButtonElement,
    deleteButtonElement
  ]) => new Promise(resolve => {
    resolve(
      `${headerElement}
      ${bodyElement}
      ${messageBarElement}
      ${refreshButtonElement}
      ${deleteButtonElement}`
    )})
  )

renderToDOM(Home, root)
