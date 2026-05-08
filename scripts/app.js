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
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
document.querySelector('.cart-badge').textContent = cartCount;

function addToCart(button) {
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    document.querySelector('.cart-badge').textContent = cartCount;
    button.textContent = '✅ Added!';
    button.style.background = '#28a745';
    showToast('success', 'Added to Cart!', 'Item successfully added to your cart');
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
// ── Quick View Modal ──
const modalOverlay = document.getElementById('modal-overlay');
const quickViewModal = document.getElementById('quick-view-modal');
const modalClose = document.getElementById('modal-close');

// Product Data
const products = [
    {
        title: 'Premium Smart Watch',
        category: 'Electronics',
        price: '9999/-',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    },
    {
        title: 'Running Sneakers',
        category: 'Fashion',
        price: '5999/-',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    },
    {
        title: 'Wireless Headphones',
        category: 'Electronics',
        price: '7999/-',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    },
    {
        title: 'Modern Desk Lamp',
        category: 'Home',
        price: '3999/-',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500'
    },
    {
        title: 'Leather Handbag',
        category: 'Fashion',
        price: '4999/-',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'
    },
    {
        title: 'Indoor Plant Set',
        category: 'Home',
        price: '2999/-',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500'
    }
];

// Open Modal
const quickViewBtns = document.querySelectorAll('.quick-view');
quickViewBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const product = products[index];
        document.getElementById('modal-title').textContent = product.title;
        document.getElementById('modal-category').textContent = product.category;
        document.getElementById('modal-price').textContent = product.price;
        document.getElementById('modal-img').src = product.image;
        document.getElementById('modal-qty').textContent = '1';
        quickViewModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
function closeModal() {
    quickViewModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Modal Quantity
function modalIncreaseQty() {
    const qty = document.getElementById('modal-qty');
    qty.textContent = parseInt(qty.textContent) + 1;
}

function modalDecreaseQty() {
    const qty = document.getElementById('modal-qty');
    if (parseInt(qty.textContent) > 1) {
        qty.textContent = parseInt(qty.textContent) - 1;
    }
}

// Modal Add to Cart
function modalAddToCart() {
    cartCount++;
    document.querySelector('.cart-badge').textContent = cartCount;
    const btn = document.querySelector('.modal-add-cart');
    btn.textContent = '✅ Added to Cart!';
    btn.style.background = '#28a745';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        btn.style.background = '#e94560';
        closeModal();
    }, 1500);
}

// Color & Size Selection
document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
// ── Sticky Header on Scroll ──
const header = document.querySelector('.header');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {

    // Sticky Header Shadow
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/Hide Scroll to Top Button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// ── Scroll to Top ──
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// ── Newsletter Popup ──
const popupOverlay = document.getElementById('popup-overlay');
const newsletterPopup = document.getElementById('newsletter-popup');
const popupClose = document.getElementById('popup-close');
const popupSkip = document.getElementById('popup-skip');

// Show popup after 3 seconds
setTimeout(() => {
    newsletterPopup.classList.add('active');
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}, 3000);

// Close Popup
function closePopup() {
    newsletterPopup.classList.remove('active');
    popupOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

popupClose.addEventListener('click', closePopup);
popupSkip.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);

// Subscribe Popup
function subscribePopup() {
    const name = document.getElementById('popup-name').value.trim();
    const email = document.getElementById('popup-email').value.trim();

    if (name === '') {
        showToast('error', 'Oops!', 'Please enter your name');
        return;
    }

    if (email === '' || !email.includes('@')) {
        showToast('error', 'Oops!', 'Please enter a valid email');
        return;
    }

    closePopup();
    showToast('success', 'Subscribed!', `Welcome ${name}! Your 20% OFF coupon: SAVE20`);
}

// ── Toast Notification ──
const toast = document.getElementById('toast');
let toastTimeout;

function showToast(type, title, message) {
    const toastTitle = document.getElementById('toast-title');
    const toastText = document.getElementById('toast-text');
    const toastIcon = document.querySelector('.toast-icon i');

    toastTitle.textContent = title;
    toastText.textContent = message;

    if (type === 'error') {
        toast.classList.add('error');
        toastIcon.className = 'fas fa-times-circle';
    } else {
        toast.classList.remove('error');
        toastIcon.className = 'fas fa-check-circle';
    }

    toast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        closeToast();
    }, 4000);
}

function closeToast() {
    toast.classList.remove('active');
}

// ── Update addToCart to use Toast ──
function addToCart(button) {
    cartCount++;
    document.querySelector('.cart-badge').textContent = cartCount;
    button.textContent = '✅ Added!';
    button.style.background = '#28a745';
    showToast('success', 'Added to Cart!', 'Item successfully added to your cart');

    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        button.style.background = '#1a1a2e';
    }, 2000);
}
// ── Update Header Based on Login State ──
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userName = localStorage.getItem('userName');
const loginBtn = document.querySelector('.login-btn');

if (loginBtn) {
    if (isLoggedIn === 'true' && userName) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${userName}`;
        loginBtn.href = '#';
        loginBtn.onclick = function() {
            if (confirm('Do you want to logout?')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userName');
                localStorage.removeItem('userEmail');
                window.location.href = 'auth.html';
            }
        };
    }
}