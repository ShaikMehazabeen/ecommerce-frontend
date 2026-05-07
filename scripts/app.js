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
// ── Filter Products ──
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        // Remove active from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ── Add to Cart ──
let cartCount = 3;

function addToCart(button) {
    cartCount++;
    document.querySelector('.cart-badge').textContent = cartCount;
    button.textContent = '✅ Added!';
    button.style.background = '#28a745';

    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        button.style.background = '#1a1a2e';
    }, 2000);
}