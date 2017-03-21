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

document.getElementById('root').appendChild(new Component({value: 'prova'}).render())
