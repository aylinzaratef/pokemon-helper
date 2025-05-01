// Lista de Pokémon de ejemplo
var pokemonData = [
    { id: 1, name: 'Bulbasaur', type: 'Grass/Poison' },
    { id: 2, name: 'Charmander', type: 'Fire' },
    { id: 3, name: 'Squirtle', type: 'Water' }
    
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