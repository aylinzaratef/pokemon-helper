// Carga los componentes
var script1 = document.createElement('script');
script1.src = '../src/components/PokemonCard.js';
document.head.appendChild(script1);

var script2 = document.createElement('script');
script2.src = '../src/components/SearchBar.js';
document.head.appendChild(script2);

// Carga los datos
var dataScript = document.createElement('script');
dataScript.src = '../public/data/pokemon.js';
document.head.appendChild(dataScript);

// Carga la app después de que todo esté listo
var appScript = document.createElement('script');
appScript.src = '../src/app.js';
document.head.appendChild(appScript);