// WRAPPER
let wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);

// HEADER:
let header = document.querySelector("header") || document.createElement("header");
header.innerHTML = `
<div class="header__menu-icon">
    <a href="index.html"><i class="fa-solid fa-arrow-left"></i></a>
   
    <h1>MyMovies</h1>
    <div class="darkmode">
        <label class="switch">
            <input type="checkbox" id="switch" />
            <span class="slider round"></span>
        </label>
    </div>
</div>
`;
wrapper.appendChild(header);

let main = document.createElement('main');
wrapper.appendChild(main);

let favoriteContainer = document.createElement("div");
favoriteContainer.id = "favorites-list";
main.appendChild(favoriteContainer);

let favorites = readFromLocalStorage("favorites") || [];
if (favorites.length === 0) {
    favoriteContainer.innerHTML = "<p>No favorite movies added yet.</p>";
} else {
    favorites.forEach(id => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzc3ODhmMjFlYWJiYWNmZTUyM2EzMTNhNDhkNmQ4ZSIsIm5iZiI6MTc0MDk4Njc1My44NjcsInN1YiI6IjY3YzU1OTgxODgxYzAxM2VkZTdhNmZhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DYGFq8X8Ss7StoeBY7Fj8siATwZKhP3V7CeQtJmLfaE'
            }
        })
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
}

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

let footer = document.createElement("footer");
footer.innerHTML = `
    <div class="footer__content">
        <a href="#"><img class="footer__menu-icon1" src="./icons/bookmark1.svg"></a>
        <a href="#"><i class="icon--ticket fa-solid fa-ticket"></i></a>
        <a href="#"><i class="icon--bookmark fa-regular fa-bookmark"></i></a>
    </div>
`;
wrapper.appendChild(footer);
