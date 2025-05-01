// Datos de los Pokémon
var pokemons = [
    { id: 1, name: 'Bulbasaur', type: 'Planta/Veneno' },
    { id: 4, name: 'Charmander', type: 'Fuego' },
    { id: 7, name: 'Squirtle', type: 'Agua' }
  ];
  
  // Componente de la tabla de Pokémon
  var PokemonTable = React.createClass({
    render: function() {
      return React.createElement('div', {className: 'app'},
        React.createElement('h1', null, 'Pokémon Iniciales Gen 1'),
        React.createElement('table', null,
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, 'ID'),
              React.createElement('th', null, 'Nombre'),
              React.createElement('th', null, 'Tipo')
            )
          ),
          React.createElement('tbody', null,
            this.props.pokemons.map(function(pokemon) {
              return React.createElement('tr', {key: pokemon.id},
                React.createElement('td', null, pokemon.id),
                React.createElement('td', null, pokemon.name),
                React.createElement('td', null, pokemon.type)
              );
            })
          )
        )
      );
    }
  });
  
  // Renderizar la aplicación
  ReactDOM.render(
    React.createElement(PokemonTable, {pokemons: pokemons}),
    document.getElementById('root')
  );