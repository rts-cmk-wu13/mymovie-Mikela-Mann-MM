let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("id");

// MOVIE DETAIL
fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then((response) => response.json())
  .then((data) => {
    let headerElm = document.querySelector("header");

    let detailHeader = document.createElement("section");
    detailHeader.className = "detailheader";

    let mainElm = document.querySelector("main");

    let pokemonDetail = document.createElement("section");
    pokemonDetail.classList.add("pokemondetail");

    let pokemonDescription = document.createElement("div");
    pokemonDescription.classList.add("pokemondescription");

    let pokemonStats = document.createElement("section");
    pokemonStats.classList.add("pokemonstats");

    let nextId = Number(id)+1;
    let prevId = Number(id)-1;

    detailHeader.innerHTML = `
    <section class="detailheader__section">
      <a href="./index.html#${id}"><i class="fa-solid fa-arrow-left"></i>
      <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1></a>
      <h3>#${id.padStart(4, "0")}</h3>
    </section>
    <div class="detailheader__div">
      <a href="detail.html?id=${prevId}&pokemon=${data.name}"><i class="fa-solid fa-chevron-left"></i></a>
      <a href="detail.html?id=${nextId}&pokemon=${data.name}"><i class="fa-solid fa-chevron-right"></i></a>
    </div>
    `;


    pokemonDetail.innerHTML = `  
    <figure class="pokemondetail__figure">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${data.name}">
    </figure>
        
    <ul class="pokemondetail__types">
    ${
      data.types[0]
        ? `<li class="pokemondetail__type"><h4>${
            data.types[0].type.name.charAt(0).toUpperCase() +
            data.types[0].type.name.slice(1)
          }</h4></li>`
        : ""
    }
        ${
          data.types[1]
            ? `<li class="pokemondetail__type"><h4>${
                data.types[1].type.name.charAt(0).toUpperCase() +
                data.types[1].type.name.slice(1)
              }</h4></li>`
            : ""
        }
        ${
          data.types[2]
            ? `<li class="pokemondetail__type"><h4>${
                data.types[2].type.name.charAt(0).toUpperCase() +
                data.types[2].type.name.slice(1)
              }</h4></li>`
            : ""
        }
        <!-- ? tjekker om dataen eksisterer, hvis den gør, oprettes <li> hvis ikke, så returneres en tom streng -->
    </ul>
    <h2 class="pokemondetail__about">About</h2>
    <table class="pokemondetail__table">
        <tr class="pokemondetail__tr">
            <td class="pokemondetail__td body3">
              <i class="fa-solid fa-weight-hanging"></i> ${
                  data.weight / 10
                } kg
            </td>
            <td class="pokemondetail__td body3">
              <i class="fa-solid fa-ruler-vertical"></i> ${
                  data.height / 10
                } m
            </td>
            ${
              data.abilities[0] || data.abilities[1]
                ? `
              <td class="pokemondetail__td body3">
              ${data.abilities[0] ? `${data.abilities[0].ability.name.charAt(0).toUpperCase() + data.abilities[0].ability.name.slice(1)}<br>` : ""}
              ${data.abilities[1] ? data.abilities[1].ability.name.charAt(0).toUpperCase()+data.abilities[1].ability.name.slice(1) : ""}
              </td>`
                : ""
            }
            

        </tr>
        <tr class="pokemondetail__tr">
            <td class="pokemondetail__td caption">
                Weight               
            </td>
            <td class="pokemondetail__td caption">
                Height
            </td>
            <td class="pokemondetail__td caption">
                Moves
            </td>
        </tr>
    </table>
    `;

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then((response) => response.json())
      .then((text) => {
        pokemonDescription.innerHTML = `
    <p class="pokemondescription__text body3">${text.flavor_text_entries[9].flavor_text}</p>
    `;
      });

    pokemonStats.innerHTML = `
    <h2 class="pokemonstats__header">Base Stats</h2>
    <table class="pokemonstats__table">
        <tr class="pokemonstats__tr">
            <td class="pokemonstats__td"><h4>hp</h4></td>
            <td class="pokemonstats__td body3">${String(
              data.stats[0].base_stat
            ).padStart(3, "0")}</td>
            <td class="pokemonstats__td"><meter id="stat" min="0" max="300" value="${String(
              data.stats[0].base_stat
            )}"></meter></td>
        </tr>
        <tr class="pokemonstats__tr">
            <td class="pokemonstats__td"><h4>atk</h4></td>
            <td class="pokemonstats__td body3">${String(
              data.stats[1].base_stat
            ).padStart(3, "0")}</td>
            <td class="pokemonstats__td"><meter id="stat" min="0" max="300" value="${String(
              data.stats[1].base_stat
            )}"></meter></td>
        </tr>
        <tr class="pokemonstats__tr">
            <td class="pokemonstats__td"><h4>def</h4></td>
            <td class="pokemonstats__td body3">${String(
              data.stats[2].base_stat
            ).padStart(3, "0")}</td>
            <td class="pokemonstats__td"><meter id="stat" min="0" max="300" value="${String(
              data.stats[2].base_stat
            )}"></meter></td>
        </tr>
        <tr class="pokemonstats__tr">
            <td class="pokemonstats__td"><h4>satk</h4></td>
            <td class="pokemonstats__td body3">${String(
              data.stats[3].base_stat
            ).padStart(3, "0")}</td>
            <td class="pokemonstats__td"><meter id="stat" min="0" max="300" value="${String(
              data.stats[3].base_stat
            )}"></meter></td>
        </tr>
        <tr class="pokemonstats__tr">
            <td class="pokemonstats__td"><h4>sdef</h4></td>
            <td class="pokemonstats__td body3">${String(
              data.stats[4].base_stat
            ).padStart(3, "0")}</td>
            <td class="pokemonstats__td"><meter id="stat" min="0" max="300" value="${String(
              data.stats[4].base_stat
            )}"></meter></td>
        </tr>
        <tr class="pokemonstats__tr">
            <td class="pokemonstats__td"><h4>spd</h4></td>
            <td class="pokemonstats__td body3">${String(
              data.stats[5].base_stat
            ).padStart(3, "0")}</td>
            <td class="pokemonstats__td"><meter id="stat" min="0" max="300" value="${String(
              data.stats[5].base_stat
            )}"></meter></td>
        </tr>
        
    </table>
    `;

    let rootElm = document.querySelector("#root");

    headerElm.appendChild(detailHeader);
    mainElm.append(pokemonDetail, pokemonDescription, pokemonStats);

    //! SLIDER ARROWS
    const arrowLeft = document.querySelector(".fa-chevron-left");
    const arrowRight = document.querySelector(".fa-chevron-right");

    if (id === "1") {
      arrowLeft.style.display = "none";
    } else if (id === "1304") {
      arrowRight.style.display = "none";
    } 

    
  })