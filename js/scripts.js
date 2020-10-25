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
        if (
            typeof pokemon === "object" && "name" in pokemon &&
            "type" in pokemon &&
            "weight" in pokemon &&
            "weakness" in pokemon &&
            "evolutions" in pokemon
        ) {
            pokemonList.push(pokemon);
        }
        else {
            console.log("That is not a pokemon.");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonListing = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonListing.appendChild(listItem);
        button.addEventListener("click", function (event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});