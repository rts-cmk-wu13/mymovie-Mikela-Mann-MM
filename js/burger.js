const burger = document.querySelector(".burgermenu");
const menu = document.querySelector(".menu");
const burgerIcon = document.querySelector(".fa-solid.fa-bars");

burger.addEventListener("click", menuToggle);

console.log(burger);

function menuToggle() {
    menu.classList.toggle("show"); // Toggle "show" klassen
    if (menu.classList.contains("show")) {
        // Skift ikon til kryds
        burgerIcon.classList.remove("fa-bars");
        burgerIcon.classList.add("fa-xmark");
    } else {
        // Skift ikon tilbage til bars
        burgerIcon.classList.add("fa-bars");
        burgerIcon.classList.remove("fa-xmark");
    }
}
