let rootElm = document.documentElement;
let switchElm = document.querySelector("#switch") 
let isDarkMode = readFromLocalStorage("isDarkMode")
let browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches
console.log("Matchmedia", browserDark);
console.log("Localstorage", isDarkMode);

let darkState = null 

if( isDarkMode == null ) {
    darkState = browserDark;
} else {
    darkState = isDarkMode
}

if (darkState) {
    switchElm.checked = true 
    rootElm.setAttribute("data-dark", switchElm.checked)

} else {
    switchElm.checked = false
    rootElm.setAttribute("data-dark", switchElm.checked)
}

switchElm.addEventListener("change", function() {
    saveToLocalStorage("isDarkMode", switchElm.checked)

    if(switchElm.checked){
        rootElm.setAttribute("data-dark", switchElm.checked)
        saveToLocalStorage("isDarkMode", switchElm.checked)
    } else {
        rootElm.setAttribute("data-dark", switchElm.checked)
        saveToLocalStorage("isDarkMode", switchElm.checked)
    }
    
})