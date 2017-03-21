console.log('Welcome to Nirvana.')

const Component = function(props) {
  return {
    props,
    render() {
      const { value } = this.props
      const div = document.createElement('div')
      div.innerHTML = value
      return div 
    }
  }
}

const Nirvana = function() {
  return {}
}
Nirvana.createElement = function(props) {
  return new Component(props).render()
}

const test = Nirvana.createElement({ value: 'prova' })

document.getElementById('root').appendChild(test)
