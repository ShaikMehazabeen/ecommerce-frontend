// ── Product Data ──
const products = [
    {
        id: 1,
        title: 'Premium Smart Watch',
        category: 'Electronics',
        price: '8,299/-',
        oldPrice: '12,499/-',
        description: 'Experience the perfect blend of style and technology. This premium smart watch features heart rate monitoring, GPS tracking, sleep tracking, and 7-day battery life. Compatible with both Android and iOS devices.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        badge: 'New',
        reviews: 120
    },
    {
        id: 2,
        title: 'Running Sneakers',
        category: 'Fashion',
        price: '4,999/-',
        oldPrice: '7,499/-',
        description: 'Engineered for performance and comfort, these running sneakers feature advanced cushioning technology, breathable mesh upper, and durable rubber outsole. Perfect for daily runs and gym workouts.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        badge: 'Sale',
        reviews: 85
    },
    {
        id: 3,
        title: 'Wireless Headphones',
        category: 'Electronics',
        price: '6,599/-',
        oldPrice: '10,799/-',
        description: 'Immerse yourself in crystal clear sound with these premium wireless headphones. Features active noise cancellation, 30-hour battery life, and foldable design for easy portability.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        badge: 'Hot',
        reviews: 200
    },
    {
        id: 4,
        title: 'Modern Desk Lamp',
        category: 'Home',
        price: '3,299/-',
        oldPrice: '4,999/-',
        description: 'Illuminate your workspace with this sleek modern desk lamp. Features adjustable brightness levels, USB charging port, touch controls, and 360-degree flexible neck for perfect positioning.',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500',
        badge: 'New',
        reviews: 60
    },
    {
        id: 5,
        title: 'Leather Handbag',
        category: 'Fashion',
        price: '4,199/-',
        oldPrice: '6,599/-',
        description: 'Crafted from genuine leather, this elegant handbag combines style with functionality. Features multiple compartments, sturdy handles, and a detachable shoulder strap for versatile carrying options.',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
        badge: 'Sale',
        reviews: 95
    },
    {
        id: 6,
        title: 'Indoor Plant Set',
        category: 'Home',
        price: '2,499/-',
        oldPrice: '3,749/-',
        description: 'Bring nature indoors with this beautiful set of low-maintenance plants. Includes 3 different varieties with decorative pots. Perfect for home and office decoration.',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500',
        badge: 'New',
        reviews: 45
    }
];

// ── Get Product ID from URL ──
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// ── Cart Count ──
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

// ── Load Product Immediately ──
window.onload = function() {

    const loading = document.getElementById('loading');
    const content = document.getElementById('product-detail-content');

    // Find product
    const product = products.find(p => p.id === productId);

    // If not found
    if (!product) {
        loading.innerHTML = `
            <p style="font-size:18px;color:#e94560;text-align:center">
                Product not found!
                <br><br>
                <a href="index.html" style="color:#1a1a2e;font-weight:bold">
                ← Go Back
                </a>
            </p>
        `;
        return;
    }

    // Update cart badge
    document.querySelector('.cart-badge').textContent = cartCount;

    // Update page title
    document.title = product.title + ' - ShopEasy';

    // Update breadcrumb
    document.getElementById('breadcrumb-title').textContent = product.title;

    // Update all product details
    document.getElementById('main-image').src = product.image;
    document.getElementById('detail-badge').textContent = product.badge;
    document.getElementById('detail-category').textContent = product.category;
    document.getElementById('detail-title').textContent = product.title;
    document.getElementById('detail-price').textContent = product.price;
    document.getElementById('detail-old-price').textContent = product.oldPrice;
    document.getElementById('detail-description').textContent = product.description;
    document.getElementById('detail-reviews').textContent = '(' + product.reviews + ' reviews)';

    // Add thumbnails
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        if (i === 0) img.classList.add('active');
        img.onclick = function() {
            document.getElementById('main-image').src = this.src;
            document.querySelectorAll('.thumbnail-images img')
                .forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        };
        thumbnails.appendChild(img);
    }

    // Load related products
    const relatedGrid = document.getElementById('related-grid');
    const related = products.filter(function(p) {
        return p.category === product.category && p.id !== product.id;
    });

    if (related.length === 0) {
        document.querySelector('.related-products').style.display = 'none';
    } else {
        relatedGrid.innerHTML = related.map(function(p) {
            return `
                <div class="product-card">
                    <div class="product-image">
                        <a href="product.html?id=${p.id}">
                            <img src="${p.image}" alt="${p.title}">
                        </a>
                        <span class="product-badge">${p.badge}</span>
                    </div>
                    <div class="product-info">
                        <span class="product-category">${p.category}</span>
                        <h3><a href="product.html?id=${p.id}">${p.title}</a></h3>
                        <div class="product-price">
                            <span class="current-price">${p.price}</span>
                            <span class="old-price">${p.oldPrice}</span>
                        </div>
                        <button class="add-to-cart" 
                            onclick="addToCartRelated('${p.title}')">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Hide spinner show content
    loading.style.display = 'none';
    content.style.display = 'grid';
};

// ── Quantity Controls ──
function detailIncreaseQty() {
    const qty = document.getElementById('detail-qty');
    qty.textContent = parseInt(qty.textContent) + 1;
}

function detailDecreaseQty() {
    const qty = document.getElementById('detail-qty');
    if (parseInt(qty.textContent) > 1) {
        qty.textContent = parseInt(qty.textContent) - 1;
    }
}

// ── Add to Cart ──
function detailAddToCart() {
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    document.querySelector('.cart-badge').textContent = cartCount;
    const btn = document.querySelector('.detail-add-cart');
    btn.textContent = '✅ Added to Cart!';
    btn.style.background = '#28a745';
    showToast('Added to Cart!', 'Item successfully added to your cart');
    setTimeout(function() {
        btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        btn.style.background = '#e94560';
    }, 2000);
}

function addToCartRelated(title) {
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    document.querySelector('.cart-badge').textContent = cartCount;
    showToast('Added to Cart!', title + ' added to your cart');
}

// ── Toast ──
function showToast(title, message) {
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-text').textContent = message;
    document.getElementById('toast').classList.add('active');
    setTimeout(closeToast, 4000);
}

function closeToast() {
    document.getElementById('toast').classList.remove('active');
}

// ── Hamburger ──
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('navbar').classList.toggle('active');
});

// ── Color Selection ──
document.querySelectorAll('.color-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.color-btn')
            .forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
    });
});

// ── Size Selection ──
document.querySelectorAll('.size-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.size-btn')
            .forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
    });
});

// ── Scroll to Top ──
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scroll-top');
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

document.getElementById('scroll-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});