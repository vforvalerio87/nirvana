const root = document.getElementById('root')

function renderToDOM (componentPromise, target) {
  componentPromise.then(component => {
    target.innerHTML = component
  })
}

const state = {
  title: `Nirvana`,
  body: `Next-generation browser application framework`,
  //message: `Sono il signore del male`
}

const stateAccessor = new Proxy(
  state,
  {
    get: (target, propKey) => {
      if (propKey in target) {
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

const Header = new Promise(resolve => {
  stateAccessor.title
    .then(title => { resolve(`<h1>${title}</h1>`) })
})

const Body = new Promise(resolve => {
  stateAccessor.body
    .then(body => { resolve(`<p>${body}</p>`) })
})

const MessageBar = new Promise(resolve => {
  stateAccessor.message
    .then(message => { resolve (`<p>${message}</p>`) })
})

const Home = Promise.all([Header, Body, MessageBar])
  .then(([headerElement, bodyElement, messageBarElement]) => new Promise(resolve => {
    resolve(
      `${headerElement}
      ${bodyElement}
      ${messageBarElement}`
    )
  }))

renderToDOM(Home, root)
