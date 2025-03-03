// Hent roden af dokumentet
let rootElm = document.documentElement;

// Læs dark mode-status fra Local Storage
let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));

// Hvis dark mode er aktiveret, opdater <html>
if (isDarkMode) {
    rootElm.setAttribute("data-dark", "true");
} else {
    rootElm.setAttribute("data-dark", "false");
}
