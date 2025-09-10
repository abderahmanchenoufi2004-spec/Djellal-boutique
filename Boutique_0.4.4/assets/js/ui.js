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

// Function to create product element
function createProductElement(product) {
  const productDiv = document.createElement('div');
  productDiv.className = 'product';
  productDiv.dataset.id = product.id;
  
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
        <span class="original-price">DA${product.price.toFixed(2)}</span>
        DA${product.salePrice.toFixed(2)}
      </span>
    `;
  } else {
    priceHtml = `<span class="price">DA${product.price.toFixed(2)}</span>`;
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
      <img src="${product.image}" alt="${product.name}" loading="lazy">
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
  
  // Add event listeners
  
  
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

// Function to show quick view modal (placeholder)
function showQuickView(product) {
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
            if (e..key === 'Enter' || e.key === ' ') {
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
    
    // Load saved view mode preference
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode) {
        setViewMode(savedViewMode);
    }
}
