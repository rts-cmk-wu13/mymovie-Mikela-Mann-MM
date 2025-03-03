let divElm = document.createElement("div")
divElm.id = "root"
divElm.innerHTML = `
    <header>
    </header>
    <main></main>
    <footer>
    </footer>
`
document.querySelector("body").append(divElm);  

/* document.addEventListener("DOMContentLoaded", () => {
    let mainElm = document.querySelector("main");
    if (!mainElm) {
        mainElm = document.createElement("main");
        document.body.appendChild(mainElm);
    } */