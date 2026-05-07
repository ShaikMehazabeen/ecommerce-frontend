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
// ── Newsletter Subscribe ──
function subscribeNewsletter() {
    const input = document.querySelector('.newsletter-form input');
    const email = input.value.trim();

    if (email === '') {
        alert('Please enter your email!');
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email!');
        return;
    }

    alert(`✅ Thank you for subscribing with ${email}!`);
    input.value = '';
}
// ── Cart Sidebar ──
const cartIcon = document.querySelector('.cart-icon a');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const continueShopping = document.getElementById('continue-shopping');

// Open Cart
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close Cart
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);
continueShopping.addEventListener('click', closeCartSidebar);

// ── Increase Quantity ──
function increaseQty(btn) {
    const qtySpan = btn.previousElementSibling;
    qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
    updateCartTotal();
}

// ── Decrease Quantity ──
function decreaseQty(btn) {
    const qtySpan = btn.nextElementSibling;
    if (parseInt(qtySpan.textContent) > 1) {
        qtySpan.textContent = parseInt(qtySpan.textContent) - 1;
        updateCartTotal();
    }
}

// ── Remove Item ──
function removeItem(btn) {
    const cartItem = btn.closest('.cart-item');
    cartItem.remove();
    cartCount--;
    document.querySelector('.cart-badge').textContent = cartCount;
    updateCartTotal();
}

// ── Update Cart Total ──
function updateCartTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;

    items.forEach(item => {
        const price = parseFloat(item.querySelector('.cart-item-price')
            .textContent.replace('$', ''));
        const qty = parseInt(item.querySelector('.cart-item-qty span')
            .textContent);
        total += price * qty;
    });

    document.getElementById('cart-subtotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('cart-count').textContent = `(${items.length} items)`;
}