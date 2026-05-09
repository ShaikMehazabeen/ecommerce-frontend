// ── Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}

// ── Close menu when link clicked ──
document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navbar) navbar.classList.remove('active');
    });
});

// ── Cart Count ──
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartBadge = document.querySelector('.cart-badge');
if (cartBadge) cartBadge.textContent = cartCount;

// ── Add to Cart ──
function addToCart(button) {
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    if (cartBadge) cartBadge.textContent = cartCount;
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
    alert('✅ Thank you for subscribing with ' + email + '!');
    input.value = '';
}

// ── Cart Sidebar ──
const cartIconLink = document.querySelector('.cart-icon a');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const continueShoppingBtn = document.getElementById('continue-shopping');

function closeCartSidebar() {
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (cartIconLink) {
    cartIconLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (cartSidebar) cartSidebar.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartSidebar);
if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeCartSidebar);

// ── Quantity Controls ──
function increaseQty(btn) {
    const qtySpan = btn.previousElementSibling;
    qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
    updateCartTotal();
}

function decreaseQty(btn) {
    const qtySpan = btn.nextElementSibling;
    if (parseInt(qtySpan.textContent) > 1) {
        qtySpan.textContent = parseInt(qtySpan.textContent) - 1;
        updateCartTotal();
    }
}

function removeItem(btn) {
    const cartItem = btn.closest('.cart-item');
    cartItem.remove();
    cartCount--;
    localStorage.setItem('cartCount', cartCount);
    if (cartBadge) cartBadge.textContent = cartCount;
    updateCartTotal();
}

function updateCartTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;
    items.forEach(item => {
        const priceText = item.querySelector('.cart-item-price').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        const qty = parseInt(item.querySelector('.cart-item-qty span').textContent);
        total += price * qty;
    });
    const subtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const cartCountEl = document.getElementById('cart-count');
    if (subtotal) subtotal.textContent = total.toFixed(2) + '/-';
    if (cartTotal) cartTotal.textContent = total.toFixed(2) + '/-';
    if (cartCountEl) cartCountEl.textContent = '(' + items.length + ' items)';
}

// ── Quick View Modal ──
const modalOverlay = document.getElementById('modal-overlay');
const quickViewModal = document.getElementById('quick-view-modal');
const modalClose = document.getElementById('modal-close');

const products = [
    {
        title: 'Premium Smart Watch',
        category: 'Electronics',
        price: '8,299/-',
        oldPrice: '12,499/-',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    },
    {
        title: 'Running Sneakers',
        category: 'Fashion',
        price: '4,999/-',
        oldPrice: '7,499/-',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    },
    {
        title: 'Wireless Headphones',
        category: 'Electronics',
        price: '6,599/-',
        oldPrice: '10,799/-',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    },
    {
        title: 'Modern Desk Lamp',
        category: 'Home',
        price: '3,299/-',
        oldPrice: '4,999/-',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500'
    },
    {
        title: 'Leather Handbag',
        category: 'Fashion',
        price: '4,199/-',
        oldPrice: '6,599/-',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'
    },
    {
        title: 'Indoor Plant Set',
        category: 'Home',
        price: '2,499/-',
        oldPrice: '3,749/-',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500'
    }
];

// Open Modal
document.querySelectorAll('.quick-view').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const product = products[index];
        document.getElementById('modal-title').textContent = product.title;
        document.getElementById('modal-category').textContent = product.category;
        document.getElementById('modal-price').textContent = product.price;
        document.getElementById('modal-old-price').textContent = product.oldPrice;
        document.getElementById('modal-img').src = product.image;
        document.getElementById('modal-qty').textContent = '1';
        if (quickViewModal) quickViewModal.classList.add('active');
        if (modalOverlay) modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    if (quickViewModal) quickViewModal.classList.remove('active');
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

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

function modalAddToCart() {
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    if (cartBadge) cartBadge.textContent = cartCount;
    const btn = document.querySelector('.modal-add-cart');
    if (btn) {
        btn.textContent = '✅ Added to Cart!';
        btn.style.background = '#28a745';
        showToast('success', 'Added to Cart!', 'Item added successfully');
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            btn.style.background = '#e94560';
            closeModal();
        }, 1500);
    }
}

// ── Color & Size Selection ──
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

// ── Filter Products ──
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.product-card').forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ── Newsletter Popup ──
const popupOverlay = document.getElementById('popup-overlay');
const newsletterPopup = document.getElementById('newsletter-popup');
const popupClose = document.getElementById('popup-close');
const popupSkip = document.getElementById('popup-skip');

setTimeout(() => {
    if (newsletterPopup) newsletterPopup.classList.add('active');
    if (popupOverlay) popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}, 3000);

function closePopup() {
    if (newsletterPopup) newsletterPopup.classList.remove('active');
    if (popupOverlay) popupOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (popupClose) popupClose.addEventListener('click', closePopup);
if (popupSkip) popupSkip.addEventListener('click', closePopup);
if (popupOverlay) popupOverlay.addEventListener('click', closePopup);

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
    showToast('success', 'Subscribed!', 'Welcome ' + name + '! Your 20% OFF coupon: SAVE20');
}

// ── Toast Notification ──
const toast = document.getElementById('toast');
let toastTimeout;

function showToast(type, title, message) {
    const toastTitle = document.getElementById('toast-title');
    const toastText = document.getElementById('toast-text');
    const toastIcon = document.querySelector('.toast-icon i');
    if (toastTitle) toastTitle.textContent = title;
    if (toastText) toastText.textContent = message;
    if (toastIcon) {
        if (type === 'error') {
            toast.classList.add('error');
            toastIcon.className = 'fas fa-times-circle';
        } else {
            toast.classList.remove('error');
            toastIcon.className = 'fas fa-check-circle';
        }
    }
    if (toast) toast.classList.add('active');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => closeToast(), 4000);
}

function closeToast() {
    if (toast) toast.classList.remove('active');
}

// ── Sticky Header & Scroll to Top ──
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    const headerEl = document.querySelector('.header');
    if (headerEl) {
        if (window.scrollY > 80) {
            headerEl.classList.add('scrolled');
        } else {
            headerEl.classList.remove('scrolled');
        }
    }
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Login State ──
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userName = localStorage.getItem('userName');
const loginBtn = document.querySelector('.login-btn');

if (loginBtn && isLoggedIn === 'true' && userName) {
    loginBtn.innerHTML = '<i class="fas fa-user"></i> ' + userName;
}

// ── Lazy Loading ──
window.addEventListener('load', function() {
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
});

// ── Lazy Style ──
const lazyStyle = document.createElement('style');
lazyStyle.textContent = `
    img { opacity: 0; transition: opacity 0.3s ease; }
    img.loaded { opacity: 1; }
`;
document.head.appendChild(lazyStyle);

// ── Prefetch on Hover ──
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('mouseover', () => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http')) {
            const preload = document.createElement('link');
            preload.rel = 'prefetch';
            preload.href = href;
            document.head.appendChild(preload);
        }
    }, { once: true });
});

console.log("E-Commerce Website Loaded");