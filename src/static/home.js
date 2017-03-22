import { Header, Body, MessageBar, RefreshButton, DeleteButton, ChangeMessageButton } from './components'
import { stateAccessor } from './state'

const homeStateHandler = stateAccessor(Home)

export function Home() {
  return(
    Promise.all([
      Header(homeStateHandler),
      Body(homeStateHandler),
      MessageBar(homeStateHandler),
      RefreshButton(homeStateHandler),
      DeleteButton(homeStateHandler),
      ChangeMessageButton(homeStateHandler)
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
  )
}