let state = {
  title: `Nirvana`,
  body: `Next-generation browser application framework`
}

let boundElements = {}

export function boundElementsAccessor() {
  return new Proxy(
    boundElements,
    {}
  )
}

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
        // FAI UNA FUNZIONE PER RILEVARE TUTTI I COMPONENTI CON LO STATE LEGATO A QUESTA KEY, RECUPERALI E RIMPIAZZA IL LORO NODO DI DOM CON QUELLO NUOVO
        console.log('settata una key, devo updatare')
        Object.entries(boundElements[propKey]).forEach(([key, value]) => {
          console.log(key, value)
          value(stateAccessor()).then(component => {
            const elementToReplace = document.querySelector(`[nirvana-id=${key}]`)
            const parser = new DOMParser()
            const newHTML = parser.parseFromString(component, `text/html`).firstChild
            console.log(newHTML)
            console.log(`devo rimpiazzare l'elemento con 'nirvana-id=${key}' con '${component}'`)
            // elementToReplace.innerHTML = newHTML
          })
        })
      },
      deleteProperty: (target, propKey) => {
        console.log(`DELETE ${propKey}`)
        if (propKey in target) {
          console.log(`propKey "${propKey}" found in target; deleting`)
          Reflect.deleteProperty(target, propKey)
          // FAI UNA FUNZIONE PER RILEVARE TUTTI I COMPONENTI CON LO STATE LEGATO A QUESTA KEY, RECUPERALI E RIMPIAZZA IL LORO NODO DI DOM CON QUELLO NUOVO
          console.log('deletata una key, devo updatare')
          // renderToDOM(component, root)
        }
        else console.log(`${propKey} not found in target; doing nothing`)
      }
    }
  )
}
