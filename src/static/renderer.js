export const renderToDOM = (componentPromise, target) => {
  componentPromise().then(component => {
    target.innerHTML = component
  })
}
