console.log('Welcome to Nirvana.')

const Nirvana = function() {
  return {}
}
Nirvana.createElement = function(element, props, children) {
  return new Component(element, props, children).render()
}

const Component = function(element, props, children) {
  return {
    props,
    render() {
      const div = document.createElement(element)
      div.innerHTML = children
      return div 
    }
  }
}

const prova = <p>{'We we'}</p>

document.getElementById('root').appendChild(prova)
