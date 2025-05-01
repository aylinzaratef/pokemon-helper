// Variable global para los datos
var pokemonTypesData = { types: [] };

// Cargar datos JSON
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

// Filtrar tipos por generación
function filterTypesByGeneration(generation) {
  return pokemonTypesData.types.filter(function(type) {
    if (generation === 'gen1') return type.gen === "all";
    if (generation === 'gen2') return type.gen === "all" || type.gen === "2-9";
    return true; // gen3 muestra todos
  });
}

// Componente de Tipo Pokémon
var PokemonType = React.createClass({
  render: function() {
    var type = this.props.type;
    return React.createElement('div', {className: 'pokemon-type'},
      React.createElement('div', {className: 'type-header ' + type.type.toLowerCase()}, 
        type.type
      ),
      React.createElement('div', {className: 'type-details'},
        React.createElement('div', {className: 'detail-section'},
          React.createElement('strong', null, 'Resistencias: '),
          type.resistances.join(', ') || 'Ninguna'
        ),
        React.createElement('div', {className: 'detail-section'},
          React.createElement('strong', null, 'Debilidades: '),
          type.weaknesses.join(', ') || 'Ninguna'
        ),
        React.createElement('div', {className: 'detail-section'},
          React.createElement('strong', null, 'Inmunidades: '),
          type.immunities.join(', ') || 'Ninguna'
        )
      )
    );
  }
});

// Componente de botones iniciales
var StartButton = React.createClass({
  handleClick: function(generation) {
    this.props.onStart(generation);
  },
  render: function() {
    return React.createElement('div', {className: 'start-buttons'},
      React.createElement('button', {
        className: 'start-button',
        onClick: this.handleClick.bind(this, 'gen1')
      }, 'Generación 1'),
      React.createElement('button', {
        className: 'start-button',
        onClick: this.handleClick.bind(this, 'gen2')
      }, 'Generación 2-5'),
      React.createElement('button', {
        className: 'start-button',
        onClick: this.handleClick.bind(this, 'gen3')
      }, 'Generación 6+')
    );
  }
});

// Componente principal de tipos
var PokemonTypesList = React.createClass({
  render: function() {
    var generationTitle = this.props.generation === 'gen1' ? 'Generación 1' :
                         this.props.generation === 'gen2' ? 'Generación 2-5' : 'Generación 6+';
    
    return React.createElement('div', {className: 'types-container'},
      React.createElement('h1', null,  generationTitle),
      React.createElement('div', {className: 'types-grid'},
        this.props.types.map(function(type) {
          return React.createElement(PokemonType, {
            key: type.type,
            type: type
          });
        })
      ),
      React.createElement('button', {
        className: 'back-button',
        onClick: this.props.onBack
      }, 'Volver')
    );
  }
});

// Componente App principal
var App = React.createClass({
  getInitialState: function() {
    return { 
      showTypes: false,
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
      showTypes: true,
      currentGeneration: generation
    });
  },
  handleBack: function() {
    this.setState({ 
      showTypes: false,
      currentGeneration: null
    });
  },
  render: function() {
    if (this.state.isLoading) {
      return React.createElement('div', null, "Cargando datos...");
    }
    
    var content;
    if (this.state.showTypes) {
      var filteredTypes = filterTypesByGeneration(this.state.currentGeneration);
      content = React.createElement(PokemonTypesList, {
        types: filteredTypes,
        generation: this.state.currentGeneration,
        onBack: this.handleBack
      });
    } else {
      content = React.createElement(StartButton, {onStart: this.handleStart});
    }
    
    return React.createElement('div', {className: 'app-container'}, 
      React.createElement('h1', null, "Tabla de Tipos Pokémon"),
      content
    );
  }
});

// Renderizar la app
loadPokemonData(function() {
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('root')
  );
});