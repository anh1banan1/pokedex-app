let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
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
        let list = $(".pokemon-list");
        let listItem = $("<li></li>");
        let button = $("<button>" + pokemon.name + "</button>");
        button.addClass("btn-primary");
        button.attr("data-toggle", "modal");
        button.attr("data-target", "#pokemonModal");
        listItem.append(button);
        list.append(listItem);

        button.on("click", function(event) {
          showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
          });
        }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);

          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.types = [];
          for (let i = 0; i < details.types.length; i++) {
            item.types.push(' ' + details.types[i].type.name);
          }
        }).catch(function (e) {
          console.error(e);
        });
      }

    // show modal content
    function showModal(pokemon) {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      
      // clear existing content of the modal
      modalTitle.empty();
      modalBody.empty();

      // creating element for name in modal content
      let nameElement = $("<h1>" + pokemon.name + "</h1>");
      // creating img in modal content
      let imageElement = $("<img class='modal-img' style='width:40%'>");
      imageElement.attr("src", pokemon.imageUrl);
      // creating element for height in modal content
      let heightElement = $("<p>" + "Height : " + pokemon.height + "</p>");
      // creating element for weight in modal content
      let weightElement = $("<p>" + "Weight : " + pokemon.weight +"</p>");
      // creating element for type in modal content
      let typesElement = $("<p>" + "Types : " + pokemon.types + "</p>");

      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});