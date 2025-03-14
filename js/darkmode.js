function darkMode () {
let rootElm = document.documentElement;
let switchElm = document.querySelector("#switch")
let isDarkMode = readFromLocalStorage("isDarkMode")
let browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches
console.log("Matchmedia", browserDark);
console.log("Localstorage", isDarkMode);

let darkState = null 

let movieIcon = document.querySelector('footer__menu-icon1') 

if( isDarkMode == null ) {
    darkState = browserDark;
} else {
    darkState = isDarkMode;
}

if (darkState) {
    switchElm.checked = true 
    rootElm.setAttribute("data-dark", switchElm.checked)
    /* movieIcon.setAttribute('src', './icons/bookmarkdark.png'); */
} else {
    switchElm.checked = false;
    rootElm.setAttribute("data-dark", switchElm.checked)
    /* movieIcon.setAttribute('src', './icons/bookmarkdark.png'); */
}

switchElm.addEventListener("change", function() {
    saveToLocalStorage("isDarkMode", switchElm.checked)

    if(switchElm.checked){
        rootElm.setAttribute("data-dark", switchElm.checked)
        saveToLocalStorage("isDarkMode", switchElm.checked)
        /* movieIcon.setAttribute('src', './icons/bookmarkdark.png'); */
    } else {
        rootElm.setAttribute("data-dark", switchElm.checked)
        saveToLocalStorage("isDarkMode", switchElm.checked)
        /* movieIcon.setAttribute('src', './icons/bookmarkdark.png'); */
    }
    
})
}
