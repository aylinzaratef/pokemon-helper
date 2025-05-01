var React = window.React;

window.SearchBar = React.createClass({
  handleChange: function(e) {
    this.props.onSearch(e.target.value.toLowerCase());
  },
  
  render: function() {
    return React.createElement('div', {className: 'search-bar'},
      React.createElement('input', {
        type: 'text',
        placeholder: 'Buscar Pokémon...',
        onChange: this.handleChange
      })
    );
  }
});

window.SearchBar = SearchBar;