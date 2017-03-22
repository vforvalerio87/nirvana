import { Header, Body, MessageBar } from './components'
import { stateAccessor } from './state'

export function Home() {
  return(
    Promise.all([
      Header(stateAccessor()),
      Body(stateAccessor()),
      MessageBar(stateAccessor())
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
