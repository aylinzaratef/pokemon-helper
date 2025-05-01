// Lista de Pokémon de ejemplo
var pokemonData = [
    { id: 1, name: 'Bulbasaur', type: 'Grass/Poison' },
    { id: 2, name: 'Charmander', type: 'Fire' },
    { id: 3, name: 'Squirtle', type: 'Water' }
    { id: 3, name: 'Pikachu', type: 'Electric' }
  ];
  
  // Componente PokemonCard sin JSX
  var PokemonCard = React.createClass({
    render: function() {
      return React.DOM.div(
        { className: 'pokemon-card' },
        React.DOM.h2(null, this.props.pokemon.name),
        React.DOM.p(null, 'Tipo: ' + this.props.pokemon.type),
        React.DOM.p(null, 'ID: ' + this.props.pokemon.id)
      );
    }
  });
  
  // Componente principal App sin JSX
  var App = React.createClass({
    render: function() {
      return React.DOM.div(
        { className: 'app' },
        React.DOM.h1(null, 'Pokédex 3DS'),
        React.DOM.div(
          { className: 'pokemon-list' },
          this.props.pokemons.map(function(pokemon) {
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
    React.createElement(App, { pokemons: pokemonData }),
    document.getElementById('root')
  );