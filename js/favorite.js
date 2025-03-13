function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// WRAPPER
let wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);

let header = document.querySelector("header") || document.createElement("header");
wrapper.appendChild(header);

let main = document.createElement('main');
wrapper.appendChild(main);



document.addEventListener("DOMContentLoaded", function () {
    let favoriteContainer = document.getElementById("favorites-list");

    if (!favoriteContainer) return;

    // Hent favoritter fra Local Storage
    let favorites = readFromLocalStorage("favorites") || [];

    if (favorites.length === 0) {
        favoriteContainer.innerHTML = "<p>No favorite movies added yet.</p>";
        return;
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzc3ODhmMjFlYWJiYWNmZTUyM2EzMTNhNDhkNmQ4ZSIsIm5iZiI6MTc0MDk4Njc1My44NjcsInN1YiI6IjY3YzU1OTgxODgxYzAxM2VkZTdhNmZhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DYGFq8X8Ss7StoeBY7Fj8siATwZKhP3V7CeQtJmLfaE'
        }
    };

    favorites.forEach(id => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(movie => {
                let movieElement = document.createElement("div");
                movieElement.classList.add("favorite-movie");
                movieElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <button class="remove-favorite" data-id="${id}">Remove</button>
                `;
                favoriteContainer.appendChild(movieElement);
            });
    });

    // Håndter fjernelse af favoritter
    favoriteContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-favorite")) {
            let movieId = event.target.getAttribute("data-id");
            favorites = favorites.filter(favId => favId !== movieId);
            saveToLocalStorage("favorites", favorites);
            event.target.parentElement.remove();

            if (favorites.length === 0) {
                favoriteContainer.innerHTML = "<p>No favorite movies added yet.</p>";
            }
        }
    });
});

// FOOTER:
let footer = document.querySelector("footer");
if (footer) {
    footer.innerHTML = `
        <div class="footer__content">
        <a href="#"><img class="footer__menu-icon1" src="./icons/bookmark1.svg"></a>
        <a href="#"><i class="icon--ticket fa-solid fa-ticket"></i></a>
        <a href="#"><i class="icon--bookmark fa-regular fa-bookmark"></i></a>
        </div>
    `;


wrapper.appendChild(footer);
}
