
let divElm = document.createElement("div")
divElm.id = "root"
divElm.innerHTML = `
    <header>
    </header>
    <main>
        <div class=wrapper></div>
    </main>
    <footer>
    </footer>
`
document.querySelector("body").append(divElm); 
