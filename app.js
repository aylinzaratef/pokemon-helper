
  var TestApp = React.createClass({
    getInitialState: function() {
      return { clicks: 0 };
    },
    
    handleClick: function() {
      this.setState({ clicks: this.state.clicks + 1 });
    },
    
    render: function() {
      return React.createElement('div', null,
        React.createElement('h1', null, 'Prueba React ' + React.version),
        React.createElement('p', null, 'Clics: ' + this.state.clicks),
        React.createElement('button', { onClick: this.handleClick }, 'Haz clic')
      );
    }
  });
  
  // Renderizar la aplicación
  ReactDOM.render(
    React.createElement(TestApp),
    document.getElementById('root')
  );