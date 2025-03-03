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
}};

// Opret section
const section = document.createElement('section');
section.classList.add('showing');

// Opret overskrift
const heading = document.createElement('h2');
heading.textContent = 'Now Showing';

// Opret knap
const button = document.createElement('button');
button.id = 'seeMore';
button.textContent = 'See More';

// Opret container til film
const moviesContainer = document.createElement('div');
moviesContainer.classList.add('movies-container');

// Tilføj elementerne til section
section.appendChild(heading);
section.appendChild(button);
section.appendChild(moviesContainer);

// Tilføj section til body
document.body.appendChild(section);

// Funktion til at hente film og vise dem
function fetchMovies() {
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            moviesContainer.innerHTML = ''; // Ryd tidligere film
            data.results.forEach(movie => {
                const article = document.createElement('article');

                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = movie.title;

                const title = document.createElement('h3');
                title.textContent = movie.title;

                const rating = document.createElement('p');
                rating.textContent = `Rating: ${movie.vote_average}`;

                article.appendChild(img);
                article.appendChild(title);
                article.appendChild(rating);
                moviesContainer.appendChild(article);
            });
        })
        .catch(err => console.error(err));
} 

// Hent film, når siden loader
fetchMovies();

/*  */

let footer = document.querySelector("footer");
footer.innerHTML = `
        <div class="footer__content">
        <img class="footer__menu-icon1" src="./icons/bookmark.svg">
        <img class="footer__menu-icon2" src="./icons/bookmark2.svg">
        <img class="footer__menu-icon3" src="./icons/bookmark3.svg">
        </div>
    `;



/* 

            // POKELIST:
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