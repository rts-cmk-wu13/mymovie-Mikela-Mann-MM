// HEADER:

let header = document.querySelector("header");
header.innerHTML = `
        <img class="header__menu-icon" src="./icons/menu.png">
        <h1>MyMovies</h1>
        <div class="darkmode">
            <label class="switch">
                <input type="checkbox" id="switch" />
                <span class="slider round"></span>
            </label>
        </div>
    `;


const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzc3ODhmMjFlYWJiYWNmZTUyM2EzMTNhNDhkNmQ4ZSIsIm5iZiI6MTc0MDk4Njc1My44NjcsInN1YiI6IjY3YzU1OTgxODgxYzAxM2VkZTdhNmZhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DYGFq8X8Ss7StoeBY7Fj8siATwZKhP3V7CeQtJmLfaE'
    }
};

fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));







/* 

            //! POKELIST:
            let divElms = document.createElement("div");
            divElms.className = "pokelist__div";

            divElms.innerHTML += data.results
                .map(function (pokemon) {
                    let id = pokemon.url.slice(0, -1).split("/").pop();

                    return `
        <article class="pokemon" id="${id}">
            <a href="detail.html?pokemon=${pokemon.name}&id=${id}">
                <p class="caption">#${id.padStart(3, "0")}</p>
                <img loading="lazy" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${pokemon.name}">
                <p class="body3">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                        }</p>
            </a>
        </article>
        `;
                })
                .join("");

            // pokemon being observed:
            let observedPokemon = divElms.querySelector(
                "article:nth-last-of-type(3)"
            );
            observer.observe(observedPokemon);

            // div'er with pokemons added to bigger div
            divElmOuter.appendChild(divElms);
        });

    // pokelist div added to main
    document.querySelector("main").append(divElmOuter);
}

// kalder fetch functionen:
fetchPokemon(currentOffset);

 */