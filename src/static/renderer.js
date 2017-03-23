// TODO: this will behave as 'render or update'
// TODO: add renderToString function for server-side rendering (static)
// TODO: add renderToNirvanaElement for server-side rendering with boundElementsAccessor() initializing and reactive capability
export const renderToDOM = (componentPromise, target) => {
  componentPromise().then(component => {
    target.innerHTML = component
  })
}
