// Navigation Toggle
const navIcon = document.getElementById('nav_icon')
const navDropDown = document.getElementById('nav_dropdown')
navIcon.addEventListener('click', () => {
    if (navIcon.className == 'fa-solid fa-bars fa-2x'){
        navIcon.className = 'fa-solid fa-x fa-2x'
        navDropDown.style.display = "flex"
    } else {
        navIcon.className = 'fa-solid fa-bars fa-2x'
        navDropDown.style.display = 'none'
    }
})






