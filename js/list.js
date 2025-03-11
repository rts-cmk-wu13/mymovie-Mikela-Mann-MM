// HEADER:
let header = document.querySelector("header");
if (header) {
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
}

// Til Observer / Infinity scroll
let currentPageMovie = 1; 
let isFetchingMovies = false; 
let lastElement; 


// NOW SHOWING
const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPageMovie}`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzc3ODhmMjFlYWJiYWNmZTUyM2EzMTNhNDhkNmQ4ZSIsIm5iZiI6MTc0MDk4Njc1My44NjcsInN1YiI6IjY3YzU1OTgxODgxYzAxM2VkZTdhNmZhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DYGFq8X8Ss7StoeBY7Fj8siATwZKhP3V7CeQtJmLfaE'
    }
};
darkMode();

// Opret section til "Now Showing"
const sectionShowing = document.createElement('section');
sectionShowing.classList.add('showing');

// Opret div til overskrift og knap
const divShowing = document.createElement('div');
divShowing.classList.add('showing_title');


// Opret overskrift
const headingShowing = document.createElement('h2');
headingShowing.textContent = 'Now Showing';

// Opret knap
const buttonShowing = document.createElement('button');
buttonShowing.id = 'seeMoreShowing';
buttonShowing.textContent = 'See More';

// Opret container til film
const moviesContainerShowing = document.createElement('div');
moviesContainerShowing.classList.add('movies-container');

// Tilføj elementerne til section
divShowing.appendChild(headingShowing);
divShowing.appendChild(buttonShowing);
sectionShowing.appendChild(divShowing);
sectionShowing.appendChild(moviesContainerShowing);

// Tilføj section til body
document.body.appendChild(sectionShowing);

currentPageMovie++;
isFetchingMovies = false;

// Funktion til at hente "Now Showing" film

function fetchMovies() {
    if (isFetchingMovies) return;
    isFetchingMovies = true;

    const updatedUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPageMovie}`;

    fetch(updatedUrl, options)
        .then(res => res.json())
        .then(data => {
            data.results.forEach(movie => {
                const article = document.createElement('article');

                const link = document.createElement('a');
                link.href = `details.html?movieId=${movie.id}`; // Link til detaljesiden
                link.classList.add('movie-link');

                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = movie.title;
                img.loading = 'lazy';

                const title = document.createElement('h3');
                title.textContent = movie.title;
                title.classList.add('showing__headline')

                const rating = document.createElement('p');
                rating.innerHTML = `<i class="fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb`;

                article.appendChild(img);
                article.appendChild(title);
                article.appendChild(rating);
                moviesContainerShowing.appendChild(article);

                link.appendChild(article);
                moviesContainerShowing.appendChild(link);
            });
            
            currentPageMovie++; 
            observeLastMovie();

        })
        .catch(err => console.error(err))
        .finally(() => {
            isFetchingMovies = false;
        });
}

// Observer det sidste viste film-element
function observeLastMovie() {
    const lastMovieElement = moviesContainerShowing.querySelector('.movie-link:nth-last-child(10)');
    observer.observe(lastMovieElement);
}

// Opret en observer til at loade flere film automatisk
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Fetching more movies...");
            observer.unobserve(entry.target);
            if(!isFetchingMovies) fetchMovies();
        }
    });
}, { rootMargin: "100px", threshold: 1 });

fetchMovies();

/* // POPULAR MOVIES
const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const popularOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzc3ODhmMjFlYWJiYWNmZTUyM2EzMTNhNDhkNmQ4ZSIsIm5iZiI6MTc0MDk4Njc1My44NjcsInN1YiI6IjY3YzU1OTgxODgxYzAxM2VkZTdhNmZhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DYGFq8X8Ss7StoeBY7Fj8siATwZKhP3V7CeQtJmLfaE'
    }
};

// Opret section til "Popular"
const sectionPopular = document.createElement('section');
sectionPopular.classList.add('popular');

// Opret div til overskrift og knap
const divPopular = document.createElement('div');
divPopular.classList.add('popular_title');

// Opret overskrift
const headingPopular = document.createElement('h2');
headingPopular.textContent = 'Popular';

// Opret knap
const buttonPopular = document.createElement('button');
buttonPopular.id = 'seeMorePopular';
buttonPopular.textContent = 'See More';

// Opret container til film
const moviesContainerPopular = document.createElement('div');
moviesContainerPopular.classList.add('movies-container__popular');

// Tilføj elementerne til section
divPopular.appendChild(headingPopular);
divPopular.appendChild(buttonPopular);
sectionPopular.appendChild(divPopular);
sectionPopular.appendChild(moviesContainerPopular);

// Tilføj section til body
document.body.appendChild(sectionPopular);

// Funktion til at hente detaljer om film
function fetchMovieDetails(movieId) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then(res => res.json())
        .catch(err => console.error('Error fetching movie details:', err));
}

// Funktion til at hente populære film
function fetchPopularMovies() {
    fetch(popularUrl, popularOptions)
        .then(res => res.json())
        .then(data => {
            let movieDetailsFetches = data.results.map(movie => fetchMovieDetails(movie.id));

            return Promise.all(movieDetailsFetches).then(moviesDetails => {
                let combinedMovies = data.results.map((movie, index) => ({
                    ...movie,
                    genres: moviesDetails[index]?.genres || [],
                    runtime: moviesDetails[index]?.runtime || 'N/A'
                }));

                displayMovies(combinedMovies);
                currentPage++;
                isFetching = false;
            });
        })
        .catch(err => console.error('Error fetching popular movies:', err));
        isFetching = false;
}

function formatRuntime(minutes) {
    if (!minutes || isNaN(minutes)) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

function displayMovies(movies) {
    moviesContainerPopular.innerHTML = ''; // Ryd tidligere film
    movies.forEach(movie => {
        const article = document.createElement('article');
        article.classList.add('popular-movie__article');

        const link = document.createElement('a');
        link.href = `details.html?movieId=${movie.id}`; // Link til detaljesiden
        link.classList.add('movie-link');

        const div = document.createElement('div');
        article.classList.add('popular-movie__content');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;
        img.loading = 'lazy';

        const title = document.createElement('h3');
        title.textContent = movie.title;

        const rating = document.createElement('p');
        rating.innerHTML = `<i class="fa-solid fa-star"></i>${movie.vote_average} IMDb`;

        
        const genres = document.createElement('div');
        genres.classList.add('genre');
        genres.innerHTML = movie.genres.map(genre => `<span class="genre__name caption_type">${genre.name}</span>`).join("");


        const runtime = document.createElement('p');
        runtime.classList.add('runtime');
        runtime.innerHTML = `<i class="fa-regular fa-clock"></i> ${formatRuntime(movie.runtime)}`;

        article.appendChild(img);
        article.appendChild(div);
        div.appendChild(title);
        div.appendChild(rating);
        div.appendChild(genres);
        div.appendChild(runtime);
        article.appendChild(div);

        link.appendChild(article);
        moviesContainerPopular.appendChild(link);
    });
}

fetchPopularMovies();

// Infinity Scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchPopularMovies();
    }
});


// FOOTER:
let footer = document.querySelector("footer");
if (footer) {
    footer.innerHTML = `
        <div class="footer__content">
            <img class="footer__menu-icon1" src="./icons/bookmark1.svg">
            <img class="footer__menu-icon2" src="./icons/shape.svg">
            <img class="footer__menu-icon3" src="./icons/bookmark3.svg">
        </div>
    `;
}

// Tilføj section til body
document.body.appendChild(footer); */