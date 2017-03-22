import { Header, Body, NetworkMessageBar, InputMessageBar, InputBox } from './components'
import { stateAccessor } from './state'

export function Home() {
  return(
    Promise.all([
      Header(stateAccessor()),
      Body(stateAccessor()),
      NetworkMessageBar(stateAccessor()),
      InputMessageBar(stateAccessor()),
      InputBox(stateAccessor())
    ])
      .then(([
        headerElement,
        bodyElement,
        networkMessageBarElement,
        inputMessageBarElement,
        inputBoxElement
      ]) => new Promise(resolve => {
        resolve(
          `${headerElement}
          ${bodyElement}
          ${networkMessageBarElement}
          ${inputMessageBarElement}
          ${inputBoxElement}`
        )})
      )
  )
}
