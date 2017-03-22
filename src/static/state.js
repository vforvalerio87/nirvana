import { renderToDOM } from './renderer'
import { root } from './app'

let state = {
  title: `Nirvana`,
  body: `Next-generation browser application framework`
}

export function stateAccessor(component) {
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
        // renderToDOM(component, root)
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
