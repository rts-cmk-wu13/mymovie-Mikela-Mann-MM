let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("movieId");
console.log("Movie ID:", id);

const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzc3ODhmMjFlYWJiYWNmZTUyM2EzMTNhNDhkNmQ4ZSIsIm5iZiI6MTc0MDk4Njc1My44NjcsInN1YiI6IjY3YzU1OTgxODgxYzAxM2VkZTdhNmZhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DYGFq8X8Ss7StoeBY7Fj8siATwZKhP3V7CeQtJmLfaE'
  }
};

let headerElm = document.querySelector("header");

let detailHeader = document.createElement("section");
detailHeader.className = "detailheader";

let mainElm = document.querySelector("main");

let movieDetail = document.createElement("section");
movieDetail.classList.add("moviedetail");

let movieDescription = document.createElement("article");
movieDescription.classList.add("moviedescription");

let movieCast = document.createElement("section");
movieCast.classList.add("cast");

detailHeader.innerHTML = `
    <i class="fa-solid fa-arrow-left"></i>
    <div class="darkmode">
        <label class="switch">
            <input type="checkbox" id="switch" />
            <span class="slider round"></span>
        </label>
    </div>
`;

const img = document.createElement('img');
img.classList.add("hero");
img.loading = 'lazy';

// FETCH MOVIE DETAILS
fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
.then((response) => response.json())
  .then((movie) => {
img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
img.alt = movie.title;
detailHeader.prepend(img);
  })
  .catch(err => console.error("Fejl ved hentning af film:", err));


// nyt fetch til description movies cast

// Fetch cast information
fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
    .then(response => response.json())
    .then(data => {
        movieCast.innerHTML = ''; // Ryd tidligere cast

        data.cast.slice(0, 5).forEach(cast => { // Hent de første 5 skuespillere
            let castHTML = `
                <figure class="cast__img">
                    <img src="https://image.tmdb.org/t/p/w185${cast.profile_path}" alt="${cast.name}">
                </figure>
                <p class="cast__name">${cast.name}</p>
            `;
            movieCast.innerHTML += castHTML;
        });
    })
    .catch(err => console.error("Fejl ved hentning af cast:", err));