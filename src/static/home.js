import { Header, Body, MessageBar } from './components'
import { stateAccessor } from './state'

const homeStateHandler = stateAccessor(Home)

export function Home() {
  return(
    Promise.all([
      Header(homeStateHandler),
      Body(homeStateHandler),
      MessageBar(homeStateHandler)
    ])
      .then(([
        headerElement,
        bodyElement,
        messageBarElement
      ]) => new Promise(resolve => {
        resolve(
          `${headerElement}
          ${bodyElement}
          ${messageBarElement}`
        )})
      )
  )
}
