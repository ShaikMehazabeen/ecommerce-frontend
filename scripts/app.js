// Select Elements
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.navbar ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

console.log("E-Commerce Website Loaded");