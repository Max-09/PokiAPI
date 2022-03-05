async function pokeApi(id){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(data => data.json())
        .then(dataJson => createPokemon(dataJson))
}


function createPokemon(pokemon){
    const $pokeDiv = document.createElement('div');
    const $pokeStats = document.createElement('div');
    const $typeText = document.createElement('div');
    const $typeContainer = document.createElement('div');
    const $pokeContainer = document.querySelector('#container');

    const $pokeName = document.createElement('h1');
    const $pokeImg = document.createElement('img');

    $pokeName.innerHTML = pokemon.name;
    $pokeName.className = "name";
    $pokeImg.src = pokemon.sprites['front_default'];
    $pokeImg.className = "imgPoke";

    
    const $type = pokemon.types.map((type) => type.type.name).join(' ');
    $typeText.textContent = `${$type}`;
    $typeText.className = "typeText";
    $typeContainer.className = "type";
    $typeContainer.append($typeText);
    $pokeStats.append($typeContainer);

    for(let i=0; i <= 5; i++){
        const $statsName = document.createElement('div');
        const $statsNumber = document.createElement('div');
        const $statsContainer = document.createElement('div');
        $statsName.className ="statName";
        $statsNumber.className = "statNumber";
        $statsContainer.className ="statsText";
        $statsName.textContent = `${pokemon.stats[i].stat.name}`
        $statsNumber.textContent = `${pokemon.stats[i].base_stat}`
        $statsContainer.append($statsName, $statsNumber);
        $pokeStats.append($statsContainer);
    }

    $pokeStats.className = "stats";
    $pokeDiv.classList.add("card");
    $pokeDiv.id = pokemon.name;
    $pokeDiv.append($pokeName, $pokeImg,  $typeContainer, $pokeStats);
    $pokeContainer.appendChild($pokeDiv);
    console.log(pokemon.stats[0].stat.name);
}


const generations = {
    "1": [1, 151],
    "2": [152, 251],
    "3": [252, 386],
    "4": [387, 493],
    "5": [494, 649],
    "6": [650, 721],
    "7": [722, 809],
    "8": [810, 905]
}

function buttonsGeneration(num){
    const $generation = document.querySelector('.generation');

    for(let i=1; i<=num; i++){
        const $button = document.createElement('button');
        $button.id = i;
        $button.textContent = `${i}`;
        const setGeneration = generations[i];
        $button.onclick = function(){
            getPokemons(setGeneration);
        }
        $generation.appendChild($button);
    }
}

async function getPokemons(gen){
    const $container = document.querySelector('#container');
    $container.innerHTML = '';
    for(let i=gen[0]; i<=gen[1]; i++){
       pokeApi(i);
    }
}

//SEARCHING
const pokemo = document.getElementById('searchPoke');
pokemo.addEventListener('input', searchPokemon);

async function searchPokemon(){
    const $pokeName = document.querySelector('input').value.toLowerCase();
    const $searchContainer = document.querySelector('#searchResult');
    const $pokemonFound = document.getElementById(`${$pokeName}`);
    const $container = document.querySelector('#container');

    if(document.getElementById(`${$pokeName}`)){
        $searchContainer.appendChild($pokemonFound);
        $container.classList.add("hide");
    }else{
        $searchContainer.innerHTML = '';
        $container.classList.remove("hide");
    }

}


buttonsGeneration(8);
getPokemons(generations["1"]);







