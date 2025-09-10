import Store from './store.js';
import { productData } from './products.js';
import { initModal, showToast, initMobileNav, initBackToTop, initLoadMore, initNewsletterForm } from './ui.js';

class BoutiqueApp {
    constructor() {
        this.store = new Store({
            products: [],
            filteredProducts: [],
            searchHistory: JSON.parse(localStorage.getItem('djellal_search_history')) || [],
            searchQuery: '',
            sortBy: 'name-asc',
            filters: {
                priceRange: [0, 1000000],
                brands: [],
                ram: [],
                storage: []
            },
            compareProducts: [], // New state for comparison
            isLoading: false,
            currentPage: 1,
            itemsPerPage: 8,
            isOffline: !navigator.onLine
        });

        this.elements = {};

        this.store.subscribe(this.updateUI.bind(this));
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.loadProducts();
        this.bindEvents();
        this.initSearch();
        this.initFilters();
        // Manually call displayProducts after a short delay for debugging
        setTimeout(() => {
            this.displayProducts();
        }, 100);
        // this.initializeComponents(); // Temporarily disable for debugging
    }

    cacheElements() {
        this.elements = {
            searchInput: document.getElementById('searchInput'),
            searchAutocomplete: document.getElementById('searchAutocomplete'),
            productGrid: document.querySelector('.product-grid'),
            sortOptions: document.getElementById('sortOptions'),
            loadMoreBtn: document.getElementById('loadMore'),
            filterToggle: document.querySelector('.filter-toggle'),
            filterPanel: document.getElementById('filter-panel'),
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
            mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
            navLinks: document.querySelector('.nav-links'),
            overlay: document.getElementById('overlay'),
            toastContainer: document.getElementById('toastContainer'),
            backToTop: document.getElementById('backToTop'),
            loadingScreen: document.getElementById('loading-screen'),
            compareModal: document.getElementById('compareModal'),
            compareProductsContainer: document.getElementById('compareProductsContainer'),
            compareCount: document.getElementById('compareCount'),
            startComparisonBtn: document.getElementById('startComparisonBtn'),
            clearComparisonBtn: document.getElementById('clearComparisonBtn'),
        };
    }

    loadProducts() {
        this.store.setState({ products: productData, filteredProducts: [...productData] });
        this.displayProducts();
    }

    displayProducts(products = this.store.getState().filteredProducts) {
        console.log('Displaying products:', products);
        const loadingProducts = this.elements.productGrid.querySelector('.loading-products');
        if (loadingProducts) {
            loadingProducts.style.display = 'none';
        }

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

        const { currentPage, itemsPerPage } = this.store.getState();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentProducts = products.slice(0, endIndex);

        currentProducts.forEach((product, index) => {
            const productCard = this.createProductCard(product);
            this.elements.productGrid.appendChild(productCard);
            
            setTimeout(() => {
                productCard.classList.add('fade-in');
            }, index * 50);
        });

        if (this.elements.loadMoreBtn) {
            this.elements.loadMoreBtn.style.display = 
                products.length > endIndex ? 'block' : 'none';
        }
    }

    createProductCard(product) {
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
                    <a href="details.html?id=${product.id}" class="btn btn-secondary">
                        <i class="fas fa-info-circle" aria-hidden="true"></i> Details
                    </a>
                    <button class="btn btn-ghost compare-btn" data-product-id="${product.id}">
                        <i class="fas fa-exchange-alt" aria-hidden="true"></i> Compare
                    </button>
                </div>
            </div>
        `;
        
        return cardElement;
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star" aria-hidden="true"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt" aria-hidden="true"></i>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star" aria-hidden="true"></i>';
        }
        
        return `<div class="product-rating-stars" role="img" aria-label="${rating} out of 5 stars">${stars}</div>`;
    }

    initSearch() {
        let searchTimeout;

        this.elements.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();

            searchTimeout = setTimeout(() => {
                this.performSearch(query);
                this.showAutocomplete(query);
            }, 300);
        });

        this.elements.searchInput.addEventListener('focus', (e) => {
            const query = e.target.value.trim();
            if (!query) {
                this.showAutocomplete(query);
            }
        });

        this.elements.searchInput.addEventListener('keydown', (e) => {
            this.handleSearchKeyNavigation(e);
        });

        this.elements.searchAutocomplete.addEventListener('click', (e) => {
            const item = e.target.closest('.autocomplete-item');
            if (item) {
                const text = item.querySelector('span').textContent;
                this.elements.searchInput.value = text;
                this.performSearch(text);
                this.hideAutocomplete();
                this.elements.searchInput.blur();
            }
        });
    }

    performSearch(query) {
        this.store.setState({ searchQuery: query.toLowerCase() });

        const { searchHistory } = this.store.getState();
        if (query.trim() && (!searchHistory.length || searchHistory[0] !== query)) {
            this.addToSearchHistory(query);
        }

        this.applyFiltersAndSort();
        this.displayProducts();
    }

    addToSearchHistory(query) {
        let { searchHistory } = this.store.getState();
        searchHistory = searchHistory.filter(item => item !== query);
        searchHistory.unshift(query);
        if (searchHistory.length > 10) {
            searchHistory = searchHistory.slice(0, 10);
        }
        this.store.setState({ searchHistory });
        localStorage.setItem('djellal_search_history', JSON.stringify(searchHistory));
    }

    showAutocomplete(query) {
        let suggestions = [];
        const { searchHistory } = this.store.getState();

        if (query && query.length >= 2) {
            suggestions = this.generateSearchSuggestions(query);
        } else if (!query && searchHistory.length > 0) {
            suggestions = searchHistory.slice(0, 5).map(search => ({
                type: 'recent',
                text: search
            }));
        }

        if (suggestions.length === 0) {
            this.hideAutocomplete();
            return;
        }

        this.elements.searchAutocomplete.innerHTML = suggestions.map((suggestion, index) => {
            const isRecent = suggestion.type === 'recent';
            return `<div class="autocomplete-item ${isRecent ? 'recent-search' : ''}" data-index="${index}" role="option" aria-selected="false">
                <i class="fas ${this.getSuggestionIcon(suggestion.type)}" aria-hidden="true"></i>
                <span>${isRecent ? suggestion.text : this.highlightMatch(suggestion.text, query)}</span>
                <small>${isRecent ? 'Recent' : suggestion.type}</small>
             </div>`;
        }).join('');

        this.elements.searchAutocomplete.classList.add('show');
    }

    generateSearchSuggestions(query) {
        const suggestions = new Set();
        const queryLower = query.toLowerCase();
        const { products } = this.store.getState();
        
        products.forEach(product => {
            if (product.name.toLowerCase().includes(queryLower)) {
                suggestions.add({ type: 'product', text: product.name });
            }
            
            if (product.brand.toLowerCase().includes(queryLower)) {
                suggestions.add({ type: 'brand', text: product.brand.charAt(0).toUpperCase() + product.brand.slice(1) });
            }
            
            product.features.forEach(feature => {
                if (feature.toLowerCase().includes(queryLower)) {
                    suggestions.add({ type: 'feature', text: feature });
                }
            });
        });
        
        return Array.from(suggestions).slice(0, 6);
    }

    getSuggestionIcon(type) {
        const icons = {
            product: 'fa-mobile-alt',
            brand: 'fa-building',
            feature: 'fa-star',
            category: 'fa-list',
            recent: 'fa-history'
        };
        return icons[type] || 'fa-search';
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    initFilters() {
        if (this.elements.filterToggle) {
            this.elements.filterToggle.addEventListener('click', () => {
                this.elements.filterPanel.classList.toggle('hidden');
                const isExpanded = !this.elements.filterPanel.classList.contains('hidden');
                this.elements.filterToggle.setAttribute('aria-expanded', isExpanded);
            });
        }

        const filterToggleBtns = document.querySelectorAll('.filter-toggle-btn');
        filterToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                const targetId = btn.getAttribute('aria-controls');
                const targetContent = document.getElementById(targetId);

                btn.setAttribute('aria-expanded', !isExpanded);
                targetContent.classList.toggle('collapsed', isExpanded);

                const icon = btn.querySelector('i');
                if (icon) {
                    icon.className = isExpanded ? 'fas fa-chevron-right' : 'fas fa-chevron-down';
                }
            });
        });

        const clearFiltersBtn = document.querySelector('.clear-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }
        
        this.elements.sortOptions.addEventListener('change', (e) => {
            this.store.setState({ sortBy: e.target.value });
            this.applyFiltersAndSort();
            this.displayProducts();
        });
        
        const minPriceSlider = document.getElementById('minPrice');
        const maxPriceSlider = document.getElementById('maxPrice');
        const minPriceDisplay = document.getElementById('minPriceDisplay');
        const maxPriceDisplay = document.getElementById('maxPriceDisplay');
        
        if (minPriceSlider && maxPriceSlider) {
            [minPriceSlider, maxPriceSlider].forEach(slider => {
                slider.addEventListener('input', () => {
                    const minPrice = parseInt(minPriceSlider.value);
                    const maxPrice = parseInt(maxPriceSlider.value);
                    
                    if (minPrice > maxPrice) {
                        if (slider === minPriceSlider) {
                            maxPriceSlider.value = minPrice;
                        } else {
                            minPriceSlider.value = maxPrice;
                        }
                    }
                    
                    this.store.setState({
                        filters: {
                            ...this.store.getState().filters,
                            priceRange: [
                                parseInt(minPriceSlider.value),
                                parseInt(maxPriceSlider.value)
                            ]
                        }
                    });
                    
                    minPriceDisplay.textContent = parseInt(minPriceSlider.value).toLocaleString('en-DZ') + ' DZD';
                    maxPriceDisplay.textContent = parseInt(maxPriceSlider.value).toLocaleString('en-DZ') + ' DZD';
                    
                    this.applyFiltersAndSort();
                    this.displayProducts();
                });
            });
        }
        
        const brandCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const brands = Array.from(brandCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                this.store.setState({
                    filters: {
                        ...this.store.getState().filters,
                        brands
                    }
                });
                
                this.applyFiltersAndSort();
                this.displayProducts();
            });
        });

        const ramCheckboxes = document.querySelectorAll('#ram-filter input[type="checkbox"]');
        ramCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const ram = Array.from(ramCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                this.store.setState({
                    filters: {
                        ...this.store.getState().filters,
                        ram
                    }
                });
                this.applyFiltersAndSort();
                this.displayProducts();
            });
        });

        const storageCheckboxes = document.querySelectorAll('#storage-filter input[type="checkbox"]');
        storageCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const storage = Array.from(storageCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                this.store.setState({
                    filters: {
                        ...this.store.getState().filters,
                        storage
                    }
                });
                this.applyFiltersAndSort();
                this.displayProducts();
            });
        });
    }

    applyFiltersAndSort() {
        let filtered = [...this.store.getState().products];
        const { searchQuery, filters, sortBy } = this.store.getState();
        
        if (searchQuery) {
            filtered = filtered.filter(product => {
                return product.name.toLowerCase().includes(searchQuery) ||
                       product.brand.toLowerCase().includes(searchQuery) ||
                       product.specs.processor.toLowerCase().includes(searchQuery);
            });
        }
        
        const [minPrice, maxPrice] = filters.priceRange;
        filtered = filtered.filter(product =>
            product.price >= minPrice && product.price <= maxPrice
        );
        
        if (filters.brands.length > 0) {
            filtered = filtered.filter(product =>
                filters.brands.includes(product.brand)
            );
        }

        if (filters.ram.length > 0) {
            filtered = filtered.filter(product =>
                filters.ram.includes(product.specs.ram)
            );
        }

        if (filters.storage.length > 0) {
            filtered = filtered.filter(product =>
                filters.storage.includes(product.specs.storage)
            );
        }
        
        filtered.sort((a, b) => {
            switch (sortBy) {
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
        
        this.store.setState({ filteredProducts: filtered, currentPage: 1 });
    }

    clearFilters() {
        this.store.setState({
            filters: {
                priceRange: [0, 1000000],
                brands: [],
                ram: [],
                storage: []
            },
            searchQuery: ''
        });
        this.elements.searchInput.value = '';

        const minPriceSlider = document.getElementById('minPrice');
        const maxPriceSlider = document.getElementById('maxPrice');
        if (minPriceSlider) minPriceSlider.value = 0;
        if (maxPriceSlider) maxPriceSlider.value = 1000000;

        document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });

        document.querySelectorAll('#ram-filter input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });

        document.querySelectorAll('#storage-filter input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });

        document.querySelectorAll('.filter-toggle-btn').forEach(btn => {
            btn.setAttribute('aria-expanded', 'true');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-chevron-down';
            }
        });

        document.querySelectorAll('.filter-content').forEach(content => {
            content.classList.remove('collapsed');
        });

        this.applyFiltersAndSort();
        this.displayProducts();
        showToast('info', 'Filters Cleared', 'All filters have been reset.');
    }

    initializeComponents() {
        initModal();
        this.initFilters();
        initMobileNav();
        initBackToTop();
        initLoadMore();
        initNewsletterForm();
        this.initComparison();
    }

    bindEvents() {
        this.elements.overlay.addEventListener('click', () => {
            closeQuickView();
            this.closeComparisonModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeQuickView();
                this.closeComparisonModal();
                this.hideAutocomplete();
            }
        });
        
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
    }

    initComparison() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.compare-btn')) {
                const productId = parseInt(e.target.closest('.compare-btn').dataset.productId);
                this.toggleCompareProduct(productId);
            }
        });

        this.elements.clearComparisonBtn.addEventListener('click', () => {
            this.store.setState({ compareProducts: [] });
            this.updateComparisonUI();
            showToast('info', 'Comparison Cleared', 'All products removed from comparison.');
        });

        this.elements.startComparisonBtn.addEventListener('click', () => {
            this.openComparisonModal();
        });

        // Close modal
        this.elements.compareModal.addEventListener('click', (e) => {
            if (e.target === this.elements.compareModal || e.target.classList.contains('close-button')) {
                this.closeComparisonModal();
            }
        });

        this.updateComparisonUI();
    }

    toggleCompareProduct(productId) {
        let { compareProducts, products } = this.store.getState();
        const product = products.find(p => p.id === productId);

        if (!product) return;

        const index = compareProducts.findIndex(p => p.id === productId);

        if (index > -1) {
            compareProducts = compareProducts.filter(p => p.id !== productId);
            showToast('info', 'Removed from Comparison', `${product.name} removed from comparison.`);
        } else {
            if (compareProducts.length < 3) { // Limit to 3 products for comparison
                compareProducts = [...compareProducts, product];
                showToast('success', 'Added to Comparison', `${product.name} added to comparison.`);
            } else {
                showToast('warning', 'Comparison Limit', 'You can compare up to 3 products only.');
            }
        }
        this.store.setState({ compareProducts });
        this.updateComparisonUI();
    }

    updateComparisonUI() {
        const { compareProducts } = this.store.getState();
        this.elements.compareCount.textContent = compareProducts.length;
        this.elements.startComparisonBtn.disabled = compareProducts.length < 2;

        this.elements.compareProductsContainer.innerHTML = compareProducts.map(product => `
            <div class="compare-product-item" data-product-id="${product.id}">
                <button class="remove-compare-item" data-product-id="${product.id}">&times;</button>
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
            </div>
        `).join('');

        // Add event listeners for remove buttons in the modal
        this.elements.compareProductsContainer.querySelectorAll('.remove-compare-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.toggleCompareProduct(productId);
            });
        });
    }

    openComparisonModal() {
        const { compareProducts } = this.store.getState();
        if (compareProducts.length < 2) {
            showToast('warning', 'Not Enough Products', 'Please select at least 2 products to compare.');
            return;
        }

        this.elements.compareModal.style.display = 'block';
        this.elements.compareModal.setAttribute('aria-hidden', 'false');
        this.elements.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Populate comparison details (this would be more complex for a full comparison table)
        // For now, just display the selected products in the modal
        this.elements.compareProductsContainer.innerHTML = compareProducts.map(product => `
            <div class="compare-product-item" data-product-id="${product.id}">
                <button class="remove-compare-item" data-product-id="${product.id}">&times;</button>
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.formattedPrice}</p>
                <p>RAM: ${product.specs.ram}</p>
                <p>Processor: ${product.specs.processor}</p>
                <p>Storage: ${product.specs.storage}</p>
                <p>Display: ${product.specs.display}</p>
            </div>
        `).join('');

        this.elements.compareModal.querySelector('.close-button').focus();
    }

    closeComparisonModal() {
        this.elements.compareModal.style.display = 'none';
        this.elements.compareModal.setAttribute('aria-hidden', 'true');
        this.elements.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

const app = new BoutiqueApp();

export { app };