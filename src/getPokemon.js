async function pokeApi(id){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(data => data.json())
        .then(dataJson => createPokemon(dataJson))
}


function createPokemon(pokemon){
    const $pokeDiv = document.createElement('div');
    const $pokeContainer = document.querySelector('#container');

    const $pokeName = document.createElement('h1');
    const $pokeimg = document.createElement('img');
    const $poketype = document.createElement('p');

    $pokeName.innerHTML = pokemon.name;
    $pokeimg.src = pokemon.sprites['front_default'];

    $pokeDiv.classList.add("rojo");
    $pokeDiv.appendChild($pokeName);
    $pokeDiv.appendChild($pokeimg);
    $pokeContainer.appendChild($pokeDiv);

}

const generations = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 905]
}

function buttonsGeneration(num){
    const $generation = document.querySelector('#generation');

    for(let i=1; i<=num; i++){
        const $button = document.createElement('button');
        $button.value = i;
        $button.textContent = `GENERATION ${i}`;
        $generation.appendChild($button);
    }
}

async function getPokemons(id){
    for(let i=1; i<=id; i++){
        getPokemon(i);
    }
    
}

buttonsGeneration(8);



