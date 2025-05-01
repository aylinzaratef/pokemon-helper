var React = window.React; // Accedemos a React desde el global

window.PokemonCard = React.createClass({
  render: function() {
    var types = this.props.pokemon.type.join(' / ');
    //var spritePath = './img/' + this.props.pokemon.sprite;
    
    return React.createElement('div', {className: 'pokemon-card'},
      
      React.createElement('h1', null, 'Content'),
      React.createElement('div', {className: 'pokemon-sprite'},
     /*    React.createElement('img', {
          src: spritePath,
          alt: this.props.pokemon.name,
          style: {width: '64px', height: '64px'}
        }) */
      ),
      React.createElement('div', {className: 'pokemon-info'},
        React.createElement('h2', null, this.props.pokemon.name),
        React.createElement('p', null, 'ID: ', this.props.pokemon.id),
        React.createElement('p', null, 'Tipo: ', types)
      )
    );
  }
});

window.PokemonCard = PokemonCard;