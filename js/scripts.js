let pokemonRepository = (function () {
    let modalContainer = document.querySelector("#modal-container");
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
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }

    function showModal(pokemon) {
      modalContainer.innerHtml = "";

      let modal = document.createElement("div");
      modal.classList.add("modal");

      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "Close";
      closeButtonElement.addEventListener("click", hideModal);

      let nameElement = document.createElement("h1");
      nameElement.innerText = pokemon.name;

      let heightElement = document.createElement("p");
      heightElement.innerText = "Height: " + pokemon.height;

      let imageElement = document.createElement("img");
      imageElement.src = pokemon.imageUrl;

      modal.appendChild(closeButtonElement);
      modal.appendChild(nameElement);
      modal.appendChild(heightElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add("is-visible");
    }

    function hideModal() {
      modalContainer.classList.remove("is-visible");
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && 
      modalContainer.classList.contains("is-visible")) {
        hideModal();
      }
    });

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
  });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});