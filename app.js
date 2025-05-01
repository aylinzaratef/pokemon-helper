// En lugar de require (que no funciona en el navegador), usa variables globales
var pokemonData = window.pokemonData || [
  // Datos de pokemon de respaldo por si acaso
  {id: 1, name: 'Bulbasaur', type: ['Grass', 'Poison'], sprite: 'bulbasaur.png'}
];


var PokemonCard = window.PokemonCard;
var SearchBar = window.SearchBar;

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
      React.createElement('h1', null, 'Test 3DS'),
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