// Datos de los Pokémon por generación
var pokemonsData = {
    gen1: [
      { id: 1, name: 'Bulbasaur', type: 'Planta/Veneno' },
      { id: 4, name: 'Charmander', type: 'Fuego' },
      { id: 7, name: 'Squirtle', type: 'Agua' }
    ],
    gen2: [
      { id: 1, name: 'Chikorita', type: 'Planta' },
      { id: 4, name: 'Cyndaquil', type: 'Fuego' },
      { id: 7, name: 'Totodile', type: 'Agua' }
    ],
    gen3: [
      { id: 1, name: 'Treecko', type: 'Planta' },
      { id: 4, name: 'Torchic', type: 'Fuego' },
      { id: 7, name: 'Mudkip', type: 'Agua' }
    ]
  };
  
  // Componente botones iniciales
  var StartButton = React.createClass({
    handleClick: function(generation) {
      this.props.onStart(generation);
    },
    render: function() {
      return React.createElement('div', null,
        React.createElement('button', 
          {
            className: 'start-button',
            onClick: this.handleClick.bind(this, 'gen1')
          },
          'Generación 1'
        ),
        React.createElement('button', 
          {
            className: 'start-button',
            onClick: this.handleClick.bind(this, 'gen2')
          },
          'Generación 2-5'
        ),
        React.createElement('button', 
          {
            className: 'start-button',
            onClick: this.handleClick.bind(this, 'gen3')
          },
          'Generación 6+'
        )
      );
    }
  });
  
  // Componente de la tabla de Pokémon
  var PokemonTable = React.createClass({
    render: function() {
      var generationTitle = 
        this.props.generation === 'gen1' ? 'Generación 1' :
        this.props.generation === 'gen2' ? 'Generación 2-5' :
        'Generación 6+';
      
      return React.createElement('div', {className: 'app'},
        React.createElement('h1', null, 'Pokémon Iniciales ' + generationTitle),
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
        ),
        React.createElement('button', 
          {
            className: 'back-button',
            onClick: this.props.onBack
          },
          'Volver'
        )
      );
    }
  });
  
  // Componente principal de la aplicación
  var App = React.createClass({
    getInitialState: function() {
      return { 
        showTable: false,
        currentGeneration: null
      };
    },
    handleStart: function(generation) {
      this.setState({ 
        showTable: true,
        currentGeneration: generation
      });
    },
    handleBack: function() {
      this.setState({ 
        showTable: false,
        currentGeneration: null
      });
    },
    render: function() {
      var content;
      if (this.state.showTable) {
        content = React.createElement(PokemonTable, {
          pokemons: pokemonsData[this.state.currentGeneration],
          generation: this.state.currentGeneration,
          onBack: this.handleBack
        });
      } else {
        content = React.createElement(StartButton, {onStart: this.handleStart});
      }
      
      return React.createElement('div', {className: 'container'}, 
        React.createElement('div', {className: 'title'}, "Tabla de Pokémon Iniciales"),
        content
      );
    }
  });
  
  // Renderizar la aplicación
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('root')
  );