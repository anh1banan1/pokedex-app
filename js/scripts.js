let pokemonRepository = (function () {
let pokemonList = [
    {
        name: 'Chikorita',
        type: 'grass',
        weight: 14.1,
        weakness: ['fire', 'flying', 'ice'],
        evolutions: ['Bayleaf', 'Meganium']
    },
    {
        name: 'Cyndaquil',
        type: 'fire',
        weight: 17.4,
        weakness: ['water', 'ground', 'rock'],
        evolutions: ['Quilava', 'Typhlosion']
    },
    {
        name: 'Totodile',
        type: 'water',
        weight: 20.9,
        weakness: ['grass', 'electric'],
        evolutions: ['Croconaw', 'Feraligatr']
    }
    ]

    return {
        add: function(pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function() {
            return pokemonList;
        }
    };
})();

// FOR LOOP
// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].weight > 20) {
//         document.write(pokemonList[i].name + " (weight: " + pokemonList[i].weight + ") - Wow, that's heavy!<br>")
//     }
//     else {
//         document.write(pokemonList[i].name + " (weight: " + pokemonList[i].weight + ")</br>")
//     }
// }

// forEACH LOOP
pokemonList.forEach(function (pokemon){
    if (pokemon.weight >20) {
        document.write(pokemon.name + "(weight: " + pokemon.weight + ") - Wow, that's heavy!<br>")
    }
    else {
    document.write(pokemon.name + " (weight: " + pokemon.weight + ")<br>")
    }
});