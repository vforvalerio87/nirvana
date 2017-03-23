// TODO: state props will accept Objects as values
// TODO: state prop values will accept a 'defaultValue' key and a 'dataSource' key (for network call URLs)
let state = {
  title: `Nirvana`,
  body: `Next-generation browser application framework`,
  messageFromInput: `Please type a message`
}

let boundElements = {}

export function boundElementsAccessor() {
  return new Proxy(
    boundElements,
    {}
  )
}

// TODO: 'console.log's to be disabled outside of debug mode
// TODO: optimize DOM access and element rendering
// TODO: move, abstract and encapsulate API calls using 'dataSource' value from state[propKey] object
export function stateAccessor() {
  return new Proxy(
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
        Object.entries(boundElements[propKey]).forEach(([key, value]) => {
          value(stateAccessor()).then(component => {
            const elementToReplace = document.querySelector(`[nirvana-id=${key}]`)
            const parser = new DOMParser()
            const newHTML = parser.parseFromString(component, `text/html`).body.firstChild.innerHTML
            elementToReplace.innerHTML = newHTML
          })
        })
      },
      deleteProperty: (target, propKey) => {
        console.log(`DELETE ${propKey}`)
        if (propKey in target) {
          console.log(`propKey "${propKey}" found in target; deleting`)
          Reflect.deleteProperty(target, propKey)
          Object.entries(boundElements[propKey]).forEach(([key, value]) => {
            value(stateAccessor()).then(component => {
              const elementToReplace = document.querySelector(`[nirvana-id=${key}]`)
              const parser = new DOMParser()
              const newHTML = parser.parseFromString(component, `text/html`).body.firstChild.innerHTML
              elementToReplace.innerHTML = newHTML
            })
          })
        }
        else console.log(`${propKey} not found in target; doing nothing`)
      }
    }
  )
}
