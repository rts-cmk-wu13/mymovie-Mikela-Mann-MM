    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("movieId");
    console.log("Movie ID:", id);
    
    function formatRuntime(minutes) {
        if (!minutes || isNaN(minutes)) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    }
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzc3ODhmMjFlYWJiYWNmZTUyM2EzMTNhNDhkNmQ4ZSIsIm5iZiI6MTc0MDk4Njc1My44NjcsInN1YiI6IjY3YzU1OTgxODgxYzAxM2VkZTdhNmZhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DYGFq8X8Ss7StoeBY7Fj8siATwZKhP3V7CeQtJmLfaE'
        }
    };
    
    // DOM-elementer
    let headerElm = document.querySelector("header");
    let mainElm = document.querySelector("main");
    
    // Opret sektioner
    let detailHeader = document.createElement("section");
    detailHeader.className = "detailheader";
    
    let movieDetail = document.createElement("section");
    movieDetail.classList.add("movie-detail");
    
    let movieDescription = document.createElement("section");
    movieDescription.classList.add("movie-description");
    
    let movieCast = document.createElement("section");
    movieCast.classList.add("cast");
    
    // Tilføj sektionerne til DOM
    headerElm.appendChild(detailHeader);
    mainElm.appendChild(movieDetail);
    mainElm.appendChild(movieDescription);
    mainElm.appendChild(movieCast);
    
    detailHeader.innerHTML = `
        <a href="index.html"><i class="fa-solid fa-arrow-left-long"></i></a>
        <div class="darkmodedetails">
            <label class="switchdetails">
                <input type="checkbox" id="switch" />
                <span class="slider round"></span>
            </label>
        </div>
    `;
    
    const img = document.createElement('img');
    img.classList.add("hero");
    img.loading = 'lazy';
    img.onerror = function () {
        this.onerror = null;
        this.src = 'img/placeholder.jpg';
    };
    detailHeader.prepend(img);

// Trailer-video (initialt skjult)
const video = document.createElement("iframe");
video.classList.add("hero-trailer");
video.frameBorder = "0";
video.allow = "autoplay; encrypted-media";
video.style.display = "none"; // Skjult indtil hover
detailHeader.appendChild(video);

// Hover events til at skifte mellem billede og video
img.addEventListener("mouseover", () => {
    img.style.display = "none";
    video.style.display = "block";
});

video.addEventListener("mouseout", () => {
    video.style.display = "none";
    img.style.display = "block";
});

// Hent filmdata og trailer
fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=translations`, options)
    .then(response => response.json())
    .then(movie => {
        img.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
        img.alt = movie.title;
        return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
    })
    .then(response => response.json())
    .then(data => {
        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
            video.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&rel=0`;
            video.style.display = "block";
        } else {
            // Hvis der ikke er en trailer, forbliver billedet synligt, og video skjules
            video.style.display = "none";
            img.style.display = "block";
        }
    })
    .catch(err => console.error("Fejl ved hentning af film eller trailer:", err));

    
    const sectionDetails = document.createElement('section');
    sectionDetails.classList.add('details__section');
    const headingDetails = document.createElement('h1');
    const detailsList = document.createElement('ul');
    detailsList.classList.add('details-list');
    sectionDetails.appendChild(headingDetails);
    sectionDetails.appendChild(detailsList);
    movieDescription.appendChild(sectionDetails);
    
    const sectionDescription = document.createElement('section');
    sectionDescription.classList.add('description__section');
    const headingDescription = document.createElement('h2');
    headingDescription.textContent = 'Description';
    const paragraphDescription = document.createElement('p');
    paragraphDescription.classList.add('description');
    sectionDescription.appendChild(headingDescription);
    sectionDescription.appendChild(paragraphDescription);
    movieDescription.appendChild(sectionDescription);
    
    darkMode();
    
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=translations`, options)
        .then(response => response.json())
        .then(movie => {
            img.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
            img.alt = movie.title;
            paragraphDescription.textContent = movie.overview;
            
            detailsList.innerHTML = `
                <div class="bookmark">
                <h1>${movie.title}</h1>
                <button class="myfavorite"><i class="favorite fa-regular fa-bookmark"></i></button>
                </div>
                <p class="rating_p"><i class="fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</p>
                <div class="genre">${movie.genres.map(genre => `<p class="genre__name caption_type">${genre.name}</p>`).join("")}</div>
                <table>
                    <tr>
                        <td class="table__heading">Length</td>
                        <td class="table__heading">Language</td>
                        <td class="table__heading">Rating</td>
                    </tr>
                    <tr>
                        <td class="table__data">${formatRuntime(movie.runtime)}</td>
                        <td class="table__data">${movie.original_language.toUpperCase()}</td>
                        <td id="certification" class="table__data">N/A</td>
                    </tr>
                </table>
            `;
    
            return fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, options);
        })
        .then(response => response.json())
        .then(data => {
            const usRelease = data.results.find(release => release.iso_3166_1 === "US");
            let certification = usRelease?.release_dates[0]?.certification || "N/A";
            document.getElementById("certification").textContent = certification;
        })
        .catch(err => console.error("Fejl ved hentning af film eller rating:", err));
    
    // Cast sektion
    const sectionCast = document.createElement('section');
    sectionCast.classList.add('cast__section');
    const divCast = document.createElement('div');
    divCast.classList.add('cast__info');
    const headingCast = document.createElement('h2');
    headingCast.textContent = 'Cast';
    const buttonCast = document.createElement('button');
    buttonCast.id = 'seeMoreCast';
    buttonCast.textContent = 'See More';
    const containerCast = document.createElement('div');
    containerCast.classList.add('container-cast');
    divCast.appendChild(headingCast);
    divCast.appendChild(buttonCast);
    sectionCast.appendChild(divCast);
    sectionCast.appendChild(containerCast);
    movieCast.appendChild(sectionCast);
    
    let currentCastIndex = 0;
    let allCast = [];
    let expanded = false; // Holder styr på om listen er udvidet
    
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
        .then(response => response.json())
        .then(data => {
            allCast = data.cast;
            loadMoreCast();
        })
        .catch(err => console.error("Fejl ved hentning af cast:", err));
    
    function loadMoreCast() {
        containerCast.innerHTML = ""; 


    if (expanded) {
        // Vis hele cast-listen
        allCast.forEach(cast => appendCastMember(cast));
        buttonCast.textContent = "See Less";
    } else {
        // Vis kun de første 4 medlemmer
        allCast.slice(0, 4).forEach(cast => appendCastMember(cast));
        buttonCast.textContent = "See More";
    }
}

function appendCastMember(cast) {
    let castHTML = `
        <div class="cast">
            <figure class="cast__img">
                <img src="${cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : 'img/placeholder.jpg'}" alt="${cast.name}">
            </figure>
            <h4 class="cast__name">${cast.name}</h4>
        </div>
    `;
    containerCast.innerHTML += castHTML;
}

// Toggle funktion til "See More" / "See Less"
buttonCast.addEventListener("click", () => {
    expanded = !expanded; // Skift tilstand
    loadMoreCast();
});

document.addEventListener("DOMContentLoaded", function () {
    let favoriteButton = document.querySelector(".myfavorite i");
    if (!favoriteButton) return;

    // Hent favoritter fra Local Storage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Hent film ID fra URL
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("movieId");

    // Tjek om filmen allerede er favorit og opdater ikonets farve
    updateFavoriteIcon(favoriteButton, favorites.includes(id));

    // Håndter klik på favorit-knappen
    favoriteButton.addEventListener("click", function () {
        toggleFavorite(id, favoriteButton);
    });
});

function toggleFavorite(movieId, button) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(movieId)) {
        // Fjern fra favoritter
        favorites = favorites.filter(favId => favId !== movieId);
    } else {
        // Tilføj til favoritter
        favorites.push(movieId);
    }

    // Gem opdateret liste i Local Storage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Opdater favorit-ikonets farve
    updateFavoriteIcon(button, favorites.includes(movieId));
}

function updateFavoriteIcon(button, isFavorite) {
    if (isFavorite) {
        button.classList.remove("fa-regular");
        button.classList.add("fa-solid");
    } else {
        button.classList.remove("fa-solid");
        button.classList.add("fa-regular");
    }
}
