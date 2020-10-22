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

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
        }
        else {
            console.log("That is not a pokemon.")
        }
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();


pokemonRepository.getAll().forEach(function(pokemon){
    if (pokemon.weight >20) {
        document.write(pokemon.name + "(weight: " + pokemon.weight + ") - Wow, that's heavy!<br>")
    }
    else {
    document.write(pokemon.name + " (weight: " + pokemon.weight + ")<br>")
    }
});