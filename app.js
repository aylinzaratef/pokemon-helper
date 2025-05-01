// Componente Tarjeta de Pokémon
var PokemonCard = React.createClass({
    render: function() {
      var types = this.props.pokemon.type.join(' / ');
      
      return React.createElement('div', {className: 'pokemon-card'},
        React.createElement('div', {className: 'pokemon-sprite'},
          React.createElement('img', {
            src: this.props.pokemon.sprite,
            alt: this.props.pokemon.name,
            style: {width: '64px', height: '64px'}
          })
        ),
        React.createElement('div', {className: 'pokemon-info'},
          React.createElement('h2', null, this.props.pokemon.name),
          React.createElement('p', null, 'ID: ', this.props.pokemon.id),
          React.createElement('p', null, 'Tipo: ', types)
        )
      );
    }
  });
  
  // Componente Buscador
  var SearchBar = React.createClass({
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
  
  // Componente Principal
  var PokemonApp = React.createClass({
    getInitialState: function() {
      return {
        filteredPokemon: pokemonData,
        searchText: ''
      };
    },
    
    handleSearch: function(text) {
      var filtered = pokemonData.filter(function(pokemon) {
        return pokemon.name.toLowerCase().includes(text) || 
               pokemon.id.toString().includes(text);
      });
      
      this.setState({
        filteredPokemon: filtered,
        searchText: text
      });
    },
    
    render: function() {
      return React.createElement('div', {className: 'pokemon-app'},
        React.createElement('h1', null, 'Pokédex 3DS'),
        React.createElement(SearchBar, {onSearch: this.handleSearch}),
        
        React.createElement('div', {className: 'pokemon-list'},
          this.state.filteredPokemon.map(function(pokemon) {
            return React.createElement(PokemonCard, {
              key: pokemon.id,
              pokemon: pokemon
            });
          })
        )
      );
    }
  });
  
  // Renderizar la aplicación
  ReactDOM.render(
    React.createElement(PokemonApp),
    document.getElementById('root')
  );