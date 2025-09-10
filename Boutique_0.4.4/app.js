let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('assets/data/products.json');
    const data = await response.json();
    products = data.products;
    populateBrandFilter(products);
    populateCategories(products);
    initializeProducts();
    applyFilters(); // Initial product display
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}




let wishlist = [];

// DOM element cache
const domElements = {
  searchInput: document.getElementById('searchInput'),
  productGrid: document.getElementById('productGrid'),
  noResults: document.getElementById('noResults'),
  brandFilter: document.getElementById('brandFilter'),
  priceFilter: document.getElementById('priceFilter'),
  viewButtons: document.querySelectorAll('.view-btn'),
  loadMoreBtn: document.getElementById('loadMoreBtn'),
  backToTop: document.getElementById('backToTop'),
  categoriesBtn: document.querySelector('.categories-btn'),
  dropdownContent: document.querySelector('.dropdown-content'),
  mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
  navLinks: document.querySelector('.nav-links')
};

// Page state
const pageState = {
  currentProducts: [],
  displayedProducts: 0,
  productsPerPage: 4,
  currentView: 'grid'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Load wishlist from localStorage
  if (localStorage.getItem('wishlist')) {
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
  }

  fetchProducts();
  domElements.searchInput.addEventListener('keyup', debounce(handleSearch, 300));
  
  // Search functionality
  
  // View options (grid/list)
  domElements.viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      setViewMode(button.getAttribute('data-view'));
    });
  });

  // Load more button
  domElements.loadMoreBtn.addEventListener('click', loadMoreProducts);

  // Back to top button
  window.addEventListener('scroll', toggleBackToTopButton);
  domElements.backToTop.addEventListener('click', scrollToTop);

  // Categories dropdown for mobile
  domElements.categoriesBtn.addEventListener('click', toggleCategoriesDropdown);

  // Mobile menu toggle
  domElements.mobileMenuToggle?.addEventListener('click', toggleMobileMenu);

  // Initialize hero slider
  initSlider();

  // Initialize accessibility features
  initAccessibility();
});

// Initialize products
function initializeProducts() {
  applyFilters();

  // Set up filter event listeners after products are loaded
  domElements.brandFilter.addEventListener('change', debounce(applyFilters, 300));
  domElements.priceFilter.addEventListener('change', debounce(applyFilters, 300));
}

// Function to handle search input with debounce
function handleSearch() {
  applyFilters();
}

// Debounce function to improve performance
function debounce(func, delay) {
  let timeoutId;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// Function to apply all filters and search
function applyFilters() {
  const searchTerm = domElements.searchInput.value.toLowerCase().trim();
  const selectedBrand = domElements.brandFilter.value.toLowerCase();
  const selectedPrice = domElements.priceFilter.value;

  let filteredProducts = products;

  // If no filters are active, show featured products
  if (!searchTerm && !selectedBrand && !selectedPrice) {
    filteredProducts = products.filter(p => p.featured);
  } else {
    filteredProducts = products.filter(product => {
      // Search term filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                          product.description.toLowerCase().includes(searchTerm) ||
                          product.category.toLowerCase().includes(searchTerm) ||
                          product.brand.toLowerCase().includes(searchTerm);
      
      // Brand filter
      const matchesBrand = selectedBrand === '' || product.brand.toLowerCase() === selectedBrand;
      
      // Price filter
      let matchesPrice = true;
      if (selectedPrice === 'budget') {
        matchesPrice = product.price < 40000;
      } else if (selectedPrice === 'mid') {
        matchesPrice = product.price >= 40000 && product.price < 80000;
      } else if (selectedPrice === 'premium') {
        matchesPrice = product.price >= 80000;
      }
      
      return matchesSearch && matchesBrand && matchesPrice;
    });
  }
  
  pageState.currentProducts = filteredProducts;
  pageState.displayedProducts = 0;
  
  displayProducts(true);
}

// Function to populate brand filter
function populateBrandFilter(products) {
  const brands = [...new Set(products.map(p => p.brand))];
  domElements.brandFilter.innerHTML = '<option value="">All Brands</option>';
  brands.sort().forEach(brand => {
    const option = document.createElement('option');
    option.value = brand.toLowerCase();
    option.textContent = brand;
    domElements.brandFilter.appendChild(option);
  });
}

// Function to populate categories dropdown
function populateCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];
  const dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.innerHTML = ''; // Clear existing categories
  categories.sort().forEach(category => {
    const categoryLink = document.createElement('a');
    categoryLink.href = `categories/${category.toLowerCase().replace(/\s+/g, '-')}/index.html`;
    categoryLink.textContent = category;
    dropdownContent.appendChild(categoryLink);
  });
}

// Function to display products
function displayProducts(reset = false) {
  if (reset) {
    domElements.productGrid.innerHTML = '';
  }
  
  if (pageState.currentProducts.length === 0) {
    domElements.noResults.classList.remove('hidden');
    domElements.loadMoreBtn.classList.add('hidden');
    return;
  } 
  
  domElements.noResults.classList.add('hidden');
  
  const endIndex = Math.min(
    pageState.displayedProducts + pageState.productsPerPage,
    pageState.currentProducts.length
  );
  
  const productsToRender = pageState.currentProducts.slice(
    pageState.displayedProducts,
    endIndex
  );
  
  productsToRender.forEach(product => {
    const productElement = createProductElement(product);
    domElements.productGrid.appendChild(productElement);
  });
  
  pageState.displayedProducts = endIndex;
  
  // Update load more button visibility
  if (pageState.displayedProducts >= pageState.currentProducts.length) {
    domElements.loadMoreBtn.classList.add('hidden');
  } else {
    domElements.loadMoreBtn.classList.remove('hidden');
  }
}

// Function to load more products
function loadMoreProducts() {
  displayProducts();
}

// Function to create product element
function createProductElement(product) {
  const productDiv = document.createElement('div');
  productDiv.className = 'product';
  productDiv.dataset.id = product.id;
  productDiv.dataset.product = JSON.stringify(product);
  
  // Create product badge if needed (New, Sale)
  let badgeHtml = '';
  if (product.onSale) {
    badgeHtml = '<span class="product-badge sale">Sale</span>';
  } else if (product.isNew) {
    badgeHtml = '<span class="product-badge new">New</span>';
  }
  
  // Create product price HTML
  let priceHtml = '';
  if (product.onSale) {
    priceHtml = `
      <span class="price">
        <span class="original-price">DA${product.price}</span>
        DA${product.salePrice}
      </span>
    `;
  } else {
    priceHtml = `<span class="price">DA${product.price}</span>`;
  }
  
  // Generate stars based on rating
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  let starsHtml = '';
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<i class="fas fa-star"></i>';
    } else if (i === fullStars && hasHalfStar) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    } else {
      starsHtml += '<i class="far fa-star"></i>';
    }
  }
  
  // Check if product is in wishlist
  const isInWishlist = wishlist.includes(product.id);
  const wishlistIcon = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
  
  productDiv.innerHTML = `
    <div class="product-image">
      ${badgeHtml}
      <img src="${product.image || 'assets/images/products/default.jpg'}" alt="${product.name}" loading="lazy">
      <div class="product-actions">
        <button class="action-btn wishlist" aria-label="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
          <i class="${wishlistIcon}"></i>
        </button>
        <button class="action-btn quick-view" aria-label="Quick view">
          <i class="far fa-eye"></i>
        </button>
      </div>
    </div>
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      <h3 class="product-title">${product.name}</h3>
      <div class="product-rating">
        ${starsHtml}
        <span class="rating-count">(${product.reviewCount})</span>
      </div>
      ${priceHtml}
      <p class="product-description">${product.description}</p>
      
    </div>
  `;
  
  
  
  const wishlistBtn = productDiv.querySelector('.wishlist');
  wishlistBtn.addEventListener('click', () => {
    toggleWishlist(product.id);
    const icon = wishlistBtn.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    
    // Update aria-label
    const isNowInWishlist = icon.classList.contains('fas');
    wishlistBtn.setAttribute(
      'aria-label',
      isNowInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
    );
  });
  
  const quickViewBtn = productDiv.querySelector('.quick-view');
  quickViewBtn.addEventListener('click', () => {
    showQuickView(product);
  });
  
  return productDiv;
}



// Function to toggle wishlist status
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  
  if (index > -1) {
    // Remove from wishlist
    wishlist.splice(index, 1);
    showNotification('Product removed from wishlist');
  } else {
    // Add to wishlist
    wishlist.push(productId);
    showNotification('Product added to wishlist!');
  }
  
  // Save wishlist to localStorage
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Function to show quick view modal (placeholder)
function showQuickView(product) {
  // TODO: Implement the quick view modal
  console.log('Quick view for:', product);
  showNotification('Quick view feature coming soon!');
}

// Function to show notification
function showNotification(message) {
  // Check if a notification container exists, create if not
  const notificationContainer = document.querySelector('.notification-container');
  
  // Create and add notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close" aria-label="Close notification">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  notificationContainer.appendChild(notification);
  
  // Add event listener to close button
  notification.querySelector('.notification-close').addEventListener('click', () => {
    hideNotification(notification);
  });
  
  // Automatically remove notification after 3 seconds
  setTimeout(() => {
    hideNotification(notification);
  }, 3000);
  
  // Add animation class after a small delay (for animation to work)
  setTimeout(() => {
    notification.classList.add('notification-show');
  }, 10);
}

// Function to hide notification with animation
function hideNotification(notification) {
    notification.classList.remove('notification-show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Function to toggle back to top button visibility
function toggleBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Function to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to toggle categories dropdown
function toggleCategoriesDropdown() {
    const dropdown = document.querySelector('.dropdown-content');
    const button = document.querySelector('.categories-btn');
    dropdown.classList.toggle('active');
    
    const isExpanded = dropdown.classList.contains('active');
    button.setAttribute('aria-expanded', isExpanded);
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('active');
    
    const isExpanded = navLinks.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
}

// Function to set view mode (grid/list)
function setViewMode(mode) {
    const productGrid = document.getElementById('productGrid');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Update active button
    viewButtons.forEach(btn => {
        const isActive = btn.getAttribute('data-view') === mode;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });
    
    // Update grid class
    productGrid.className = mode === 'list' ? 'product-list' : 'product-grid';
    
    // Update page state
    pageState.currentView = mode;
    
    // Save preference to localStorage
    localStorage.setItem('viewMode', mode);
}

// Function to initialize hero slider
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.setAttribute('aria-current', i === index);
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    // Event listeners for controls
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        resetSlideInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        resetSlideInterval();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlideInterval();
        });
    });
    
    // Function to reset the auto-advance interval
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Function to start the auto-advance interval
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Start the auto-advance
    startSlideInterval();
    
    // Pause auto-advance when user hovers over slider
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startSlideInterval();
    });

    window.addEventListener('beforeunload', () => {
        clearInterval(slideInterval);
    });
}

// Function to initialize accessibility features
function initAccessibility() {
    // Add keyboard navigation for dropdown menus
    const dropdownTriggers = document.querySelectorAll('.categories-btn');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCategoriesDropdown();
            }
        });
    });
    
    // Add keyboard navigation for product cards
    document.querySelectorAll('.product').forEach(product => {
        const quickViewBtn = product.querySelector('.quick-view');
        const wishlistBtn = product.querySelector('.wishlist');
        
        
        if (quickViewBtn && wishlistBtn) {
            // Make product cards keyboard navigable
            product.setAttribute('tabindex', '0');
            
            product.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showQuickView(JSON.parse(product.dataset.product));
                }
            });
        }
    });
    
    // Load saved view mode from localStorage
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode) {
        setViewMode(savedViewMode);
    }
}




