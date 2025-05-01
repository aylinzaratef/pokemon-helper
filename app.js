
var pokemonTypesData = { types: [] };

function loadPokemonData(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'pokemon-types.json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      pokemonTypesData = JSON.parse(xhr.responseText);
      callback();
    }
  };
  xhr.send(null);
}

// Filter
function filterTypesByGeneration(generation) {
  return pokemonTypesData.types.filter(function(type) {
    return (
      type.gen === "all" ||
      (generation === "gen2" && type.gen === "2-9") ||
      (generation === "gen3" && (type.gen === "2-9" || type.gen === "6-9"))
    );
  });
}

// Buttons
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

//list
var TypeList = React.createClass({
  render: function() {
    return React.createElement('span', null,
      this.props.types.join(', ')
    );
  }
});

// table
var PokemonTypesTable = React.createClass({
  render: function() {
    var generationTitle = 
      this.props.generation === 'gen1' ? 'Generación 1' :
      this.props.generation === 'gen2' ? 'Generación 2-5' :
      'Generación 6+';
    
    return React.createElement('div', {className: 'app'},
      React.createElement('button', 
        {
          className: 'back-button',
          onClick: this.props.onBack
        },
        'Volver'
      ),
      React.createElement('h1', null, 'Tipos Pokémon - ' + generationTitle),
      React.createElement('table', null,
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Tipo'),
            React.createElement('th', null, 'Resistencias'),
            React.createElement('th', null, 'Debilidades'),
            React.createElement('th', null, 'Inmunidades')
          )
        ),
        React.createElement('tbody', null,
          this.props.types.map(function(typeObj) {
            return React.createElement('tr', {key: typeObj.type},
              React.createElement('td', {className: 'type-cell ' + typeObj.type.toLowerCase()}, typeObj.type),
              React.createElement('td', null, 
                React.createElement(TypeList, {types: typeObj.resistances})
              ),
              React.createElement('td', null, 
                React.createElement(TypeList, {types: typeObj.weaknesses})
              ),
              React.createElement('td', null, 
                React.createElement(TypeList, {types: typeObj.immunities})
              )
            );
          })
        )
      ),
     
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return { 
      showTable: false,
      currentGeneration: null,
      isLoading: true
    };
  },
  componentDidMount: function() {
    var self = this;
    loadPokemonData(function() {
      self.setState({ isLoading: false });
    });
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
    if (this.state.isLoading) {
      return React.createElement('div', null, "Cargando datos...");
    }
    
    var content;
    if (this.state.showTable) {
      var filteredTypes = filterTypesByGeneration(this.state.currentGeneration);
      content = React.createElement(PokemonTypesTable, {
        types: filteredTypes,
        generation: this.state.currentGeneration,
        onBack: this.handleBack
      });
    } else {
      content = React.createElement(StartButton, {onStart: this.handleStart});
    }
    
    return React.createElement('div', {className: 'container'}, 
      React.createElement('div', {className: 'title'}, "Tabla de Tipos Pokémon"),
      content
    );
  }
});

// Render
loadPokemonData(function() {
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('root')
  );
});