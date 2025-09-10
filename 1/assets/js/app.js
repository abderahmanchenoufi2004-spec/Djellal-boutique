/**
 * Djellal Boutique - Enhanced Interactive Features
 * Comprehensive UI improvements with modern JavaScript functionality
 */

// ============================================================================
// APPLICATION STATE MANAGEMENT
// ============================================================================

class BoutiqueApp {
    constructor() {
        this.state = {
            products: [],
            filteredProducts: [],
            cart: JSON.parse(localStorage.getItem('djellal_cart')) || [],
            wishlist: JSON.parse(localStorage.getItem('djellal_wishlist')) || [],
            searchQuery: '',
            sortBy: 'name-asc',
            filters: {
                priceRange: [0, 1000000],
                brands: [],
                categories: []
            },
            isLoading: false,
            currentPage: 1,
            itemsPerPage: 8
        };
        
        this.elements = {};
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.loadProducts();
        this.bindEvents();
        this.initializeComponents();
        this.updateUI();
    }
    
    cacheElements() {
        // Cache frequently used DOM elements
        this.elements = {
            // Search elements
            searchInput: document.getElementById('searchInput'),
            searchAutocomplete: document.getElementById('searchAutocomplete'),
            
            // Product elements
            productGrid: document.querySelector('.product-grid'),
            sortOptions: document.getElementById('sortOptions'),
            loadMoreBtn: document.getElementById('loadMore'),
            filterToggle: document.querySelector('.filter-toggle'),
            filterPanel: document.getElementById('filter-panel'),
            
            // Cart elements
            cartToggle: document.querySelector('.cart-toggle'),
            cartSidebar: document.getElementById('cartSidebar'),
            cartItems: document.getElementById('cartItems'),
            cartCount: document.querySelector('.cart-count'),
            cartTotal: document.getElementById('cartTotal'),
            cartClose: document.querySelector('.cart-close'),
            
            // Wishlist elements
            wishlistToggle: document.querySelector('.wishlist-toggle'),
            wishlistSidebar: document.getElementById('wishlistSidebar'),
            wishlistItems: document.getElementById('wishlistItems'),
            wishlistCount: document.querySelector('.wishlist-count'),
            wishlistClose: document.querySelector('.wishlist-close'),
            
            // Modal elements
            quickViewModal: document.getElementById('quickViewModal'),
            modalElements: {
                image: document.getElementById('modalProductImage'),
                title: document.getElementById('modal-title'),
                price: document.getElementById('modalProductPrice'),
                ram: document.getElementById('modalProductRam'),
                processor: document.getElementById('modalProductProcessor'),
                storage: document.getElementById('modalProductStorage'),
                display: document.getElementById('modalProductDisplay'),
                plans: document.getElementById('modalPlans'),
                detailsBtn: document.getElementById('modalDetailsButton'),
                addToCartBtn: document.querySelector('.add-to-cart-modal')
            },
            
            // Navigation elements
            mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
            navLinks: document.querySelector('.nav-links'),
            categoriesBtn: document.querySelector('.categories-btn'),
            dropdownContent: document.querySelector('.dropdown-content'),
            
            // UI elements
            overlay: document.getElementById('overlay'),
            toastContainer: document.getElementById('toastContainer'),
            backToTop: document.getElementById('backToTop'),
            loadingScreen: document.getElementById('loading-screen')
        };
    }
}

// ============================================================================
// PRODUCT DATA AND MANAGEMENT
// ============================================================================

const productData = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        price: 450000,
        formattedPrice: '450,000 DZD',
        image: 'https://www.apple.com/v/iphone-15-pro/c/images/overview/design/design_hero_1__gq4suyls8c2u_large.jpg',
        brand: 'apple',
        category: 'smartphones',
        specs: {
            ram: '8GB',
            processor: 'A17 Pro',
            storage: '256GB',
            display: '6.1" Super Retina XDR',
            camera: '48MP Triple Camera',
            battery: '3274 mAh'
        },
        rating: 4.8,
        reviews: 1247,
        features: ['5G Ready', 'Wireless Charging', 'Face ID', 'Water Resistant'],
        isNew: true,
        isBestSeller: true
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        price: 420000,
        formattedPrice: '420,000 DZD',
        image: 'https://www.91-cdn.com/hub/wp-content/uploads/2023/09/Samsung-Galaxy-S24-Ultra-render-2.jpg',
        brand: 'samsung',
        category: 'smartphones',
        specs: {
            ram: '12GB',
            processor: 'Snapdragon 8 Gen 3',
            storage: '512GB',
            display: '6.8" Dynamic AMOLED 2X',
            camera: '200MP Quad Camera',
            battery: '5000 mAh'
        },
        rating: 4.7,
        reviews: 892,
        features: ['5G Ready', 'S Pen Included', 'Wireless Charging', 'Water Resistant'],
        isNew: true,
        isBestSeller: true
    },
    {
        id: 3,
        name: 'Google Pixel 8 Pro',
        price: 390000,
        formattedPrice: '390,000 DZD',
        image: 'https://i.brecorder.com/primary/2024/05/6645935a35be4.jpg',
        brand: 'google',
        category: 'smartphones',
        specs: {
            ram: '12GB',
            processor: 'Google Tensor G3',
            storage: '256GB',
            display: '6.7" LTPO OLED',
            camera: '50MP Triple Camera',
            battery: '5050 mAh'
        },
        rating: 4.6,
        reviews: 654,
        features: ['Pure Android', 'AI Photography', 'Wireless Charging', 'Magic Eraser'],
        isNew: false,
        isBestSeller: false
    },
    {
        id: 4,
        name: 'Xiaomi 14 Ultra',
        price: 350000,
        formattedPrice: '350,000 DZD',
        image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-2.jpg',
        brand: 'xiaomi',
        category: 'smartphones',
        specs: {
            ram: '16GB',
            processor: 'Snapdragon 8 Gen 3',
            storage: '512GB',
            display: '6.73" LTPO AMOLED',
            camera: '50MP Quad Camera',
            battery: '5300 mAh'
        },
        rating: 4.5,
        reviews: 423,
        features: ['Leica Camera', 'Ultra Fast Charging', '5G Ready', 'MIUI 15'],
        isNew: true,
        isBestSeller: false
    },
    {
        id: 5,
        name: 'iPhone 14 Pro Max',
        price: 380000,
        formattedPrice: '380,000 DZD',
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-max-deep-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1663792344260',
        brand: 'apple',
        category: 'smartphones',
        specs: {
            ram: '6GB',
            processor: 'A16 Bionic',
            storage: '256GB',
            display: '6.7" Super Retina XDR',
            camera: '48MP Triple Camera',
            battery: '4323 mAh'
        },
        rating: 4.7,
        reviews: 2156,
        features: ['Dynamic Island', 'Always-On Display', 'Face ID', 'Ceramic Shield'],
        isNew: false,
        isBestSeller: true
    },
    {
        id: 6,
        name: 'OnePlus 12',
        price: 320000,
        formattedPrice: '320,000 DZD',
        image: 'https://onemobile.s3.amazonaws.com/2024/01/OnePlus-12-02.jpg',
        brand: 'oneplus',
        category: 'smartphones',
        specs: {
            ram: '12GB',
            processor: 'Snapdragon 8 Gen 3',
            storage: '256GB',
            display: '6.82" LTPO AMOLED',
            camera: '50MP Triple Camera',
            battery: '5400 mAh'
        },
        rating: 4.4,
        reviews: 287,
        features: ['100W SuperVOOC', 'Hasselblad Camera', 'OxygenOS 14', '5G Ready'],
        isNew: true,
        isBestSeller: false
    }
];

// ============================================================================
// ENHANCED APP FUNCTIONALITY
// ============================================================================

BoutiqueApp.prototype.loadProducts = function() {
    this.state.products = productData;
    this.state.filteredProducts = [...productData];
    this.displayProducts();
};

BoutiqueApp.prototype.displayProducts = function(products = this.state.filteredProducts) {
    const loadingProducts = this.elements.productGrid.querySelector('.loading-products');
    if (loadingProducts) {
        loadingProducts.style.display = 'none';
    }

    // Clear existing products
    this.elements.productGrid.innerHTML = '';

    if (products.length === 0) {
        this.elements.productGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search" aria-hidden="true"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
                <button class="btn btn-primary" onclick="app.clearFilters()">Clear Filters</button>
            </div>
        `;
        return;
    }

    // Show products with pagination
    const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const endIndex = startIndex + this.state.itemsPerPage;
    const currentProducts = products.slice(0, endIndex);

    currentProducts.forEach((product, index) => {
        const productCard = this.createProductCard(product);
        this.elements.productGrid.appendChild(productCard);
        
        // Add animation delay for stagger effect
        setTimeout(() => {
            productCard.classList.add('fade-in');
        }, index * 100);
    });

    // Show/hide load more button
    if (this.elements.loadMoreBtn) {
        this.elements.loadMoreBtn.style.display = 
            products.length > endIndex ? 'block' : 'none';
    }
};

BoutiqueApp.prototype.createProductCard = function(product) {
    const isInWishlist = this.state.wishlist.some(item => item.id === product.id);
    
    const cardElement = document.createElement('div');
    cardElement.className = 'product-card';
    cardElement.setAttribute('data-product-id', product.id);
    
    cardElement.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" 
                 alt="${product.name}" 
                 loading="lazy"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjVGNkZBIi8+CjxwYXRoIGQ9Ik0xNDAgMTAwQzE1NS4xODggMTAwIDE2Ny41IDExMi4zMTIgMTY3LjUgMTI3LjVDMTY3LjUgMTQyLjY4OCAxNTUuMTg4IDE1NSAxNDAgMTU1QzEyNC44MTIgMTU1IDExMi41IDE0Mi42ODggMTEyLjUgMTI3LjVDMTEyLjUgMTEyLjMxMiAxMjQuODEyIDEwMCAxNDAgMTAwWiIgZmlsbD0iI0RGRTZFOSIvPgo8cGF0aCBkPSJNMTQwIDEwNUMxNTIuNDI2IDEwNSAxNjIuNSAxMTUuMDc0IDE2Mi41IDEyNy41QzE2Mi41IDEzOS45MjYgMTUyLjQyNiAxNTAgMTQwIDE1MEM1Mi41MTIgNzMuNDg4IDEwNSAxNDAuNSAxNDAuNSAxMjcuNUMxMjcuNTc0IDEwNSAxNDAiLz4KPC9zdmc+'">
            ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
            ${product.isBestSeller ? '<span class="product-badge bestseller">Best Seller</span>' : ''}
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                    aria-label="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}"
                    data-product-id="${product.id}">
                <i class="fas fa-heart" aria-hidden="true"></i>
            </button>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-rating">
                ${this.generateStarRating(product.rating)}
                <span class="rating-text">(${product.reviews} reviews)</span>
            </div>
            <p class="price">${product.formattedPrice}</p>
            <div class="product-features">
                ${product.features.slice(0, 2).map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
            </div>
            <div class="product-actions">
                <button class="btn btn-primary quick-view-btn" 
                        data-product-id="${product.id}"
                        aria-label="Quick view ${product.name}">
                    <i class="fas fa-eye" aria-hidden="true"></i> Quick View
                </button>
                <button class="btn add-to-cart-btn" 
                        data-product-id="${product.id}"
                        aria-label="Add ${product.name} to cart">
                    <i class="fas fa-shopping-cart" aria-hidden="true"></i> Add to Cart
                </button>
                <a href="details.html?id=${product.id}" class="btn btn-secondary">
                    <i class="fas fa-info-circle" aria-hidden="true"></i> Details
                </a>
            </div>
        </div>
    `;
    
    return cardElement;
};

BoutiqueApp.prototype.generateStarRating = function(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star" aria-hidden="true"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt" aria-hidden="true"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star" aria-hidden="true"></i>';
    }
    
    return `<div class="product-rating-stars" role="img" aria-label="${rating} out of 5 stars">${stars}</div>`;
};

// ============================================================================
// SEARCH FUNCTIONALITY WITH AUTOCOMPLETE
// ============================================================================

BoutiqueApp.prototype.initSearch = function() {
    let searchTimeout;
    
    this.elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        searchTimeout = setTimeout(() => {
            this.performSearch(query);
            this.showAutocomplete(query);
        }, 300);
    });
    
    this.elements.searchInput.addEventListener('keydown', (e) => {
        this.handleSearchKeyNavigation(e);
    });
    
    // Close autocomplete when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            this.hideAutocomplete();
        }
    });
};

BoutiqueApp.prototype.performSearch = function(query) {
    this.state.searchQuery = query.toLowerCase();
    
    if (!query) {
        this.state.filteredProducts = [...this.state.products];
    } else {
        this.state.filteredProducts = this.state.products.filter(product => {
            return product.name.toLowerCase().includes(this.state.searchQuery) ||
                   product.brand.toLowerCase().includes(this.state.searchQuery) ||
                   product.specs.processor.toLowerCase().includes(this.state.searchQuery) ||
                   product.features.some(feature => 
                       feature.toLowerCase().includes(this.state.searchQuery)
                   );
        });
    }
    
    this.applyFiltersAndSort();
    this.displayProducts();
};

BoutiqueApp.prototype.showAutocomplete = function(query) {
    if (!query || query.length < 2) {
        this.hideAutocomplete();
        return;
    }
    
    const suggestions = this.generateSearchSuggestions(query);
    
    if (suggestions.length === 0) {
        this.hideAutocomplete();
        return;
    }
    
    this.elements.searchAutocomplete.innerHTML = suggestions.map((suggestion, index) => 
        `<div class="autocomplete-item" data-index="${index}" role="option" aria-selected="false">
            <i class="fas ${this.getSuggestionIcon(suggestion.type)}" aria-hidden="true"></i>
            <span>${this.highlightMatch(suggestion.text, query)}</span>
            <small>${suggestion.type}</small>
         </div>`
    ).join('');
    
    this.elements.searchAutocomplete.classList.add('show');
};

BoutiqueApp.prototype.generateSearchSuggestions = function(query) {
    const suggestions = new Set();
    const queryLower = query.toLowerCase();
    
    this.state.products.forEach(product => {
        // Product names
        if (product.name.toLowerCase().includes(queryLower)) {
            suggestions.add({ type: 'product', text: product.name });
        }
        
        // Brands
        if (product.brand.toLowerCase().includes(queryLower)) {
            suggestions.add({ type: 'brand', text: product.brand.charAt(0).toUpperCase() + product.brand.slice(1) });
        }
        
        // Features
        product.features.forEach(feature => {
            if (feature.toLowerCase().includes(queryLower)) {
                suggestions.add({ type: 'feature', text: feature });
            }
        });
    });
    
    return Array.from(suggestions).slice(0, 6);
};

BoutiqueApp.prototype.getSuggestionIcon = function(type) {
    const icons = {
        product: 'fa-mobile-alt',
        brand: 'fa-building',
        feature: 'fa-star',
        category: 'fa-list'
    };
    return icons[type] || 'fa-search';
};

BoutiqueApp.prototype.highlightMatch = function(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
};

// ============================================================================
// CART FUNCTIONALITY
// ============================================================================

BoutiqueApp.prototype.initCart = function() {
    // Cart toggle
    this.elements.cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCart();
    });
    
    // Close cart
    this.elements.cartClose.addEventListener('click', () => {
        this.closeCart();
    });
    
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) {
            e.preventDefault();
            const productId = parseInt(e.target.closest('.add-to-cart-btn').dataset.productId);
            this.addToCart(productId);
        }
    });
    
    this.updateCartUI();
};

BoutiqueApp.prototype.addToCart = function(productId) {
    const product = this.state.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = this.state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        this.state.cart.push({
            ...product,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    this.saveCart();
    this.updateCartUI();
    this.showToast('success', 'Added to Cart', `${product.name} has been added to your cart.`);
    
    // Add visual feedback
    this.animateCartAdd();
};

BoutiqueApp.prototype.removeFromCart = function(productId) {
    this.state.cart = this.state.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
    this.showToast('info', 'Removed from Cart', 'Item has been removed from your cart.');
};

BoutiqueApp.prototype.updateCartQuantity = function(productId, quantity) {
    const item = this.state.cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartUI();
        }
    }
};

BoutiqueApp.prototype.updateCartUI = function() {
    // Update cart count
    const totalItems = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.elements.cartCount.textContent = totalItems;
    this.elements.cartCount.classList.toggle('hidden', totalItems === 0);
    
    // Update cart total
    const total = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.elements.cartTotal.textContent = total.toLocaleString('en-DZ') + ' DZD';
    
    // Render cart items
    this.renderCartItems();
};

BoutiqueApp.prototype.renderCartItems = function() {
    if (this.state.cart.length === 0) {
        this.elements.cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                <p>Your cart is empty</p>
                <a href="#products" class="btn btn-primary" onclick="app.closeCart()">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    this.elements.cartItems.innerHTML = this.state.cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">${item.formattedPrice}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-product-id="${item.id}" aria-label="Decrease quantity">
                        <i class="fas fa-minus" aria-hidden="true"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-product-id="${item.id}" aria-label="Increase quantity">
                        <i class="fas fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <button class="remove-item" data-product-id="${item.id}" aria-label="Remove from cart">
                <i class="fas fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    `).join('');
    
    // Bind quantity control events
    this.elements.cartItems.addEventListener('click', (e) => {
        const productId = parseInt(e.target.closest('[data-product-id]')?.dataset.productId);
        if (!productId) return;
        
        if (e.target.closest('.quantity-btn.plus')) {
            const currentItem = this.state.cart.find(item => item.id === productId);
            this.updateCartQuantity(productId, currentItem.quantity + 1);
        } else if (e.target.closest('.quantity-btn.minus')) {
            const currentItem = this.state.cart.find(item => item.id === productId);
            this.updateCartQuantity(productId, currentItem.quantity - 1);
        } else if (e.target.closest('.remove-item')) {
            this.removeFromCart(productId);
        }
    });
};

BoutiqueApp.prototype.toggleCart = function() {
    const isOpen = this.elements.cartSidebar.classList.contains('open');
    if (isOpen) {
        this.closeCart();
    } else {
        this.openCart();
    }
};

BoutiqueApp.prototype.openCart = function() {
    this.elements.cartSidebar.classList.add('open');
    this.elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

BoutiqueApp.prototype.closeCart = function() {
    this.elements.cartSidebar.classList.remove('open');
    this.elements.overlay.classList.remove('active');
    document.body.style.overflow = '';
};

// ============================================================================
// WISHLIST FUNCTIONALITY
// ============================================================================

BoutiqueApp.prototype.initWishlist = function() {
    // Wishlist toggle
    this.elements.wishlistToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleWishlist();
    });
    
    // Close wishlist
    this.elements.wishlistClose.addEventListener('click', () => {
        this.closeWishlist();
    });
    
    // Wishlist heart buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(e.target.closest('.wishlist-btn').dataset.productId);
            this.toggleWishlistItem(productId);
        }
    });
    
    this.updateWishlistUI();
};

BoutiqueApp.prototype.toggleWishlistItem = function(productId) {
    const product = this.state.products.find(p => p.id === productId);
    if (!product) return;
    
    const isInWishlist = this.state.wishlist.some(item => item.id === productId);
    
    if (isInWishlist) {
        this.state.wishlist = this.state.wishlist.filter(item => item.id !== productId);
        this.showToast('info', 'Removed from Wishlist', `${product.name} has been removed from your wishlist.`);
    } else {
        this.state.wishlist.push({
            ...product,
            addedAt: new Date().toISOString()
        });
        this.showToast('success', 'Added to Wishlist', `${product.name} has been added to your wishlist.`);
    }
    
    this.saveWishlist();
    this.updateWishlistUI();
    this.updateWishlistButtons();
};

BoutiqueApp.prototype.updateWishlistUI = function() {
    // Update wishlist count
    this.elements.wishlistCount.textContent = this.state.wishlist.length;
    this.elements.wishlistCount.classList.toggle('hidden', this.state.wishlist.length === 0);
    
    // Render wishlist items
    this.renderWishlistItems();
};

// ============================================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================================

BoutiqueApp.prototype.showToast = function(type = 'info', title = '', message = '', duration = 4000) {
    const toastId = 'toast_' + Date.now();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.id = toastId;
    
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close" aria-label="Close notification">
            <i class="fas fa-times" aria-hidden="true"></i>
        </button>
    `;
    
    // Add event listener for close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        this.removeToast(toastId);
    });
    
    this.elements.toastContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        this.removeToast(toastId);
    }, duration);
    
    return toastId;
};

BoutiqueApp.prototype.removeToast = function(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
};

// ============================================================================
// MODAL FUNCTIONALITY - Enhanced Quick View
// ============================================================================

BoutiqueApp.prototype.initModal = function() {
    // Quick view buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.quick-view-btn')) {
            e.preventDefault();
            const productId = parseInt(e.target.closest('.quick-view-btn').dataset.productId);
            this.openQuickView(productId);
        }
    });
    
    // Close modal
    this.elements.quickViewModal.addEventListener('click', (e) => {
        if (e.target === this.elements.quickViewModal || e.target.classList.contains('close-button')) {
            this.closeQuickView();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.elements.quickViewModal.style.display === 'block') {
            this.closeQuickView();
        }
    });
};

BoutiqueApp.prototype.openQuickView = function(productId) {
    const product = this.state.products.find(p => p.id === productId);
    if (!product) return;
    
    // Update modal content
    this.elements.modalElements.image.src = product.image;
    this.elements.modalElements.image.alt = product.name;
    this.elements.modalElements.title.textContent = product.name;
    this.elements.modalElements.price.textContent = product.formattedPrice;
    this.elements.modalElements.ram.textContent = product.specs.ram;
    this.elements.modalElements.processor.textContent = product.specs.processor;
    this.elements.modalElements.storage.textContent = product.specs.storage;
    this.elements.modalElements.display.textContent = product.specs.display;
    
    // Update payment plans
    this.renderPaymentPlans(product.price);
    
    // Update buttons
    this.elements.modalElements.detailsBtn.href = `details.html?id=${product.id}`;
    this.elements.modalElements.addToCartBtn.dataset.productId = product.id;
    
    // Show modal
    this.elements.quickViewModal.style.display = 'block';
    this.elements.quickViewModal.setAttribute('aria-hidden', 'false');
    this.elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    this.elements.modalElements.title.focus();
};

BoutiqueApp.prototype.closeQuickView = function() {
    this.elements.quickViewModal.style.display = 'none';
    this.elements.quickViewModal.setAttribute('aria-hidden', 'true');
    this.elements.overlay.classList.remove('active');
    document.body.style.overflow = '';
};

BoutiqueApp.prototype.renderPaymentPlans = function(price) {
    const plans = [
        { months: 12, percentage: 0.45 },
        { months: 8, percentage: 0.35 },
        { months: 6, percentage: 0.25 }
    ];
    
    this.elements.modalElements.plans.innerHTML = plans.map(plan => {
        const totalAmount = price * (1 + plan.percentage);
        const monthlyPayment = totalAmount / plan.months;
        
        return `
            <div class="plan">
                <h3>${plan.months}-Month Plan</h3>
                <p><strong>Total:</strong> ${totalAmount.toLocaleString('en-DZ')} DZD</p>
                <p><strong>Monthly:</strong> ${monthlyPayment.toLocaleString('en-DZ')} DZD</p>
            </div>
        `;
    }).join('');
};

// ============================================================================
// FILTERING AND SORTING
// ============================================================================

BoutiqueApp.prototype.initFilters = function() {
    // Filter toggle
    if (this.elements.filterToggle) {
        this.elements.filterToggle.addEventListener('click', () => {
            this.elements.filterPanel.classList.toggle('hidden');
            const isExpanded = !this.elements.filterPanel.classList.contains('hidden');
            this.elements.filterToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Sort dropdown
    this.elements.sortOptions.addEventListener('change', (e) => {
        this.state.sortBy = e.target.value;
        this.applyFiltersAndSort();
        this.displayProducts();
    });
    
    // Price range filters
    const minPriceSlider = document.getElementById('minPrice');
    const maxPriceSlider = document.getElementById('maxPrice');
    const minPriceDisplay = document.getElementById('minPriceDisplay');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    
    if (minPriceSlider && maxPriceSlider) {
        [minPriceSlider, maxPriceSlider].forEach(slider => {
            slider.addEventListener('input', () => {
                const minPrice = parseInt(minPriceSlider.value);
                const maxPrice = parseInt(maxPriceSlider.value);
                
                // Ensure min is not greater than max
                if (minPrice > maxPrice) {
                    if (slider === minPriceSlider) {
                        maxPriceSlider.value = minPrice;
                    } else {
                        minPriceSlider.value = maxPrice;
                    }
                }
                
                this.state.filters.priceRange = [
                    parseInt(minPriceSlider.value),
                    parseInt(maxPriceSlider.value)
                ];
                
                minPriceDisplay.textContent = parseInt(minPriceSlider.value).toLocaleString('en-DZ') + ' DZD';
                maxPriceDisplay.textContent = parseInt(maxPriceSlider.value).toLocaleString('en-DZ') + ' DZD';
                
                this.applyFiltersAndSort();
                this.displayProducts();
            });
        });
    }
    
    // Brand filters
    const brandCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            this.state.filters.brands = Array.from(brandCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            this.applyFiltersAndSort();
            this.displayProducts();
        });
    });
};

BoutiqueApp.prototype.applyFiltersAndSort = function() {
    let filtered = [...this.state.products];
    
    // Apply search filter
    if (this.state.searchQuery) {
        filtered = filtered.filter(product => {
            return product.name.toLowerCase().includes(this.state.searchQuery) ||
                   product.brand.toLowerCase().includes(this.state.searchQuery) ||
                   product.specs.processor.toLowerCase().includes(this.state.searchQuery);
        });
    }
    
    // Apply price range filter
    const [minPrice, maxPrice] = this.state.filters.priceRange;
    filtered = filtered.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
    );
    
    // Apply brand filter
    if (this.state.filters.brands.length > 0) {
        filtered = filtered.filter(product =>
            this.state.filters.brands.includes(product.brand)
        );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
        switch (this.state.sortBy) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'rating-desc':
                return b.rating - a.rating;
            case 'newest':
                return b.isNew ? 1 : -1;
            default:
                return 0;
        }
    });
    
    this.state.filteredProducts = filtered;
    this.state.currentPage = 1; // Reset pagination
};

BoutiqueApp.prototype.clearFilters = function() {
    this.state.filters = {
        priceRange: [0, 1000000],
        brands: [],
        categories: []
    };
    this.state.searchQuery = '';
    this.elements.searchInput.value = '';
    
    // Reset UI controls
    const minPriceSlider = document.getElementById('minPrice');
    const maxPriceSlider = document.getElementById('maxPrice');
    if (minPriceSlider) minPriceSlider.value = 0;
    if (maxPriceSlider) maxPriceSlider.value = 1000000;
    
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    this.applyFiltersAndSort();
    this.displayProducts();
};

// ============================================================================
// MOBILE NAVIGATION
// ============================================================================

BoutiqueApp.prototype.initMobileNav = function() {
    this.elements.mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = this.elements.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        this.elements.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        this.elements.navLinks.classList.toggle('active');
    });
    
    // Categories dropdown
    this.elements.categoriesBtn.addEventListener('click', () => {
        const isExpanded = this.elements.categoriesBtn.getAttribute('aria-expanded') === 'true';
        this.elements.categoriesBtn.setAttribute('aria-expanded', !isExpanded);
        this.elements.dropdownContent.classList.toggle('show');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav')) {
            this.elements.navLinks.classList.remove('active');
            this.elements.dropdownContent.classList.remove('show');
            this.elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
            this.elements.categoriesBtn.setAttribute('aria-expanded', 'false');
        }
    });
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

BoutiqueApp.prototype.initializeComponents = function() {
    this.initSearch();
    this.initCart();
    this.initWishlist();
    this.initModal();
    this.initFilters();
    this.initMobileNav();
    this.initBackToTop();
    this.initLoadMore();
    this.initNewsletterForm();
};

BoutiqueApp.prototype.initBackToTop = function() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset > 300;
        this.elements.backToTop.classList.toggle('show', scrolled);
    });
    
    this.elements.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

BoutiqueApp.prototype.initLoadMore = function() {
    if (this.elements.loadMoreBtn) {
        this.elements.loadMoreBtn.addEventListener('click', () => {
            this.state.currentPage++;
            this.displayProducts();
            
            // Add loading state
            const spinner = this.elements.loadMoreBtn.querySelector('.load-more-spinner');
            const text = this.elements.loadMoreBtn.querySelector('.load-more-text');
            
            spinner.classList.remove('hidden');
            text.textContent = 'Loading...';
            
            setTimeout(() => {
                spinner.classList.add('hidden');
                text.textContent = 'Load More Products';
            }, 1000);
        });
    }
};

BoutiqueApp.prototype.initNewsletterForm = function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.newsletter-input').value;
            
            if (this.validateEmail(email)) {
                this.showToast('success', 'Subscribed!', 'You have successfully subscribed to our newsletter.');
                newsletterForm.reset();
            } else {
                this.showToast('error', 'Invalid Email', 'Please enter a valid email address.');
            }
        });
    }
};

BoutiqueApp.prototype.validateEmail = function(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

BoutiqueApp.prototype.animateCartAdd = function() {
    // Add visual feedback when item is added to cart
    this.elements.cartToggle.classList.add('cart-bounce');
    setTimeout(() => {
        this.elements.cartToggle.classList.remove('cart-bounce');
    }, 600);
};

BoutiqueApp.prototype.hideAutocomplete = function() {
    this.elements.searchAutocomplete.classList.remove('show');
};

BoutiqueApp.prototype.handleSearchKeyNavigation = function(e) {
    const items = this.elements.searchAutocomplete.querySelectorAll('.autocomplete-item');
    let current = this.elements.searchAutocomplete.querySelector('.highlighted');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (current) {
            current.classList.remove('highlighted');
            current.setAttribute('aria-selected', 'false');
            const next = current.nextElementSibling || items[0];
            next.classList.add('highlighted');
            next.setAttribute('aria-selected', 'true');
        } else if (items.length > 0) {
            items[0].classList.add('highlighted');
            items[0].setAttribute('aria-selected', 'true');
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (current) {
            current.classList.remove('highlighted');
            current.setAttribute('aria-selected', 'false');
            const prev = current.previousElementSibling || items[items.length - 1];
            prev.classList.add('highlighted');
            prev.setAttribute('aria-selected', 'true');
        } else if (items.length > 0) {
            items[items.length - 1].classList.add('highlighted');
            items[items.length - 1].setAttribute('aria-selected', 'true');
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (current) {
            const text = current.querySelector('span').textContent;
            this.elements.searchInput.value = text;
            this.performSearch(text);
            this.hideAutocomplete();
        }
    } else if (e.key === 'Escape') {
        this.hideAutocomplete();
    }
};

BoutiqueApp.prototype.toggleWishlist = function() {
    const isOpen = this.elements.wishlistSidebar.classList.contains('open');
    if (isOpen) {
        this.closeWishlist();
    } else {
        this.openWishlist();
    }
};

BoutiqueApp.prototype.openWishlist = function() {
    this.elements.wishlistSidebar.classList.add('open');
    this.elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

BoutiqueApp.prototype.closeWishlist = function() {
    this.elements.wishlistSidebar.classList.remove('open');
    this.elements.overlay.classList.remove('active');
    document.body.style.overflow = '';
};

BoutiqueApp.prototype.renderWishlistItems = function() {
    if (this.state.wishlist.length === 0) {
        this.elements.wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart" aria-hidden="true"></i>
                <p>Your wishlist is empty</p>
                <a href="#products" class="btn btn-primary" onclick="app.closeWishlist()">Browse Products</a>
            </div>
        `;
        return;
    }
    
    this.elements.wishlistItems.innerHTML = this.state.wishlist.map(item => `
        <div class="wishlist-item" data-product-id="${item.id}">
            <div class="wishlist-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="wishlist-item-details">
                <h4>${item.name}</h4>
                <p class="wishlist-item-price">${item.formattedPrice}</p>
                <div class="wishlist-item-actions">
                    <button class="btn btn-sm add-to-cart-btn" data-product-id="${item.id}">
                        <i class="fas fa-shopping-cart" aria-hidden="true"></i> Add to Cart
                    </button>
                    <button class="btn btn-sm btn-secondary quick-view-btn" data-product-id="${item.id}">
                        <i class="fas fa-eye" aria-hidden="true"></i> Quick View
                    </button>
                </div>
            </div>
            <button class="remove-wishlist-item" data-product-id="${item.id}" aria-label="Remove from wishlist">
                <i class="fas fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    `).join('');
    
    // Bind remove wishlist item events
    this.elements.wishlistItems.addEventListener('click', (e) => {
        if (e.target.closest('.remove-wishlist-item')) {
            const productId = parseInt(e.target.closest('[data-product-id]').dataset.productId);
            this.toggleWishlistItem(productId);
        }
    });
};

BoutiqueApp.prototype.updateWishlistButtons = function() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        const isInWishlist = this.state.wishlist.some(item => item.id === productId);
        
        btn.classList.toggle('active', isInWishlist);
        btn.setAttribute('aria-label', isInWishlist ? 'Remove from wishlist' : 'Add to wishlist');
    });
};

BoutiqueApp.prototype.updateUI = function() {
    this.updateCartUI();
    this.updateWishlistUI();
};

BoutiqueApp.prototype.saveCart = function() {
    localStorage.setItem('djellal_cart', JSON.stringify(this.state.cart));
};

BoutiqueApp.prototype.saveWishlist = function() {
    localStorage.setItem('djellal_wishlist', JSON.stringify(this.state.wishlist));
};

BoutiqueApp.prototype.bindEvents = function() {
    // Close overlay when clicked
    this.elements.overlay.addEventListener('click', () => {
        this.closeCart();
        this.closeWishlist();
        this.closeQuickView();
    });
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            this.closeCart();
            this.closeWishlist();
            this.closeQuickView();
            this.hideAutocomplete();
        }
    });
    
    // Smooth scroll for anchor links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            const href = link.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
};

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

// Initialize the application when DOM is loaded
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new BoutiqueApp();
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page loaded in ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        });
    }
    
    // Service Worker registration for PWA features (future enhancement)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});

// Export for use in other scripts or debugging
window.BoutiqueApp = BoutiqueApp;
