import { app } from './app.js';

function initModal() {
    // Quick view buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.quick-view-btn')) {
            e.preventDefault();
            const productId = parseInt(e.target.closest('.quick-view-btn').dataset.productId);
            openQuickView(productId);
        }
    });
    
    // Close modal
    app.elements.quickViewModal.addEventListener('click', (e) => {
        if (e.target === app.elements.quickViewModal || e.target.classList.contains('close-button')) {
            closeQuickView();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && app.elements.quickViewModal.style.display === 'block') {
            closeQuickView();
        }
    });
}

function openQuickView(productId) {
    const { products } = app.store.getState();
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Update modal content
    app.elements.modalElements.image.src = product.image;
    app.elements.modalElements.image.alt = product.name;
    app.elements.modalElements.title.textContent = product.name;
    app.elements.modalElements.price.textContent = product.formattedPrice;
    app.elements.modalElements.ram.textContent = product.specs.ram;
    app.elements.modalElements.processor.textContent = product.specs.processor;
    app.elements.modalElements.storage.textContent = product.specs.storage;
    app.elements.modalElements.display.textContent = product.specs.display;
    
    // Update payment plans
    renderPaymentPlans(product.price);
    
    // Update buttons
    app.elements.modalElements.detailsBtn.href = `details.html?id=${product.id}`;
    
    // Show modal
    app.elements.quickViewModal.style.display = 'block';
    app.elements.quickViewModal.setAttribute('aria-hidden', 'false');
    app.elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    app.previouslyFocusedElement = document.activeElement;
    app.elements.modalElements.title.focus();
    
    app.elements.quickViewModal.addEventListener('keydown', trapFocus);
}

function closeQuickView() {
    app.elements.quickViewModal.style.display = 'none';
    app.elements.quickViewModal.setAttribute('aria-hidden', 'true');
    app.elements.overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    if (app.previouslyFocusedElement) {
        app.previouslyFocusedElement.focus();
    }
    
    app.elements.quickViewModal.removeEventListener('keydown', trapFocus);
}

function trapFocus(e) {
    if (e.key !== 'Tab') return;
    
    const focusableElements = app.elements.quickViewModal.querySelectorAll(
        'a[href], button, textarea, input, select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }
}

function renderPaymentPlans(price) {
    const plans = [
        { months: 12, percentage: 0.45 },
        { months: 8, percentage: 0.35 },
        { months: 6, percentage: 0.25 }
    ];
    
    app.elements.modalElements.plans.innerHTML = plans.map(plan => {
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
}

function showToast(type = 'info', title = '', message = '', duration = 4000) {
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
        removeToast(toastId);
    });
    
    app.elements.toastContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        removeToast(toastId);
    }, duration);
    
    return toastId;
}

function removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

function initMobileNav() {
    app.elements.mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = app.elements.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        app.elements.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        app.elements.navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav')) {
            app.elements.navLinks.classList.remove('active');
            app.elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

function initBackToTop() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset > 300;
        app.elements.backToTop.classList.toggle('show', scrolled);
    });
    
    app.elements.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initLoadMore() {
    if (app.elements.loadMoreBtn) {
        app.elements.loadMoreBtn.addEventListener('click', () => {
            app.store.setState({ currentPage: app.store.getState().currentPage + 1 });
            app.displayProducts();
            
            // Add loading state
            const spinner = app.elements.loadMoreBtn.querySelector('.load-more-spinner');
            const text = app.elements.loadMoreBtn.querySelector('.load-more-text');
            
            spinner.classList.remove('hidden');
            text.textContent = 'Loading...';
            
            setTimeout(() => {
                spinner.classList.add('hidden');
                text.textContent = 'Load More Products';
            }, 1000);
        });
    }
}

function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.newsletter-input').value;
            
            if (validateEmail(email)) {
                showToast('success', 'Subscribed!', 'You have successfully subscribed to our newsletter.');
                newsletterForm.reset();
            } else {
                showToast('error', 'Invalid Email', 'Please enter a valid email address.');
            }
        });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export { initModal, openQuickView, closeQuickView, showToast, removeToast, initMobileNav, initBackToTop, initLoadMore, initNewsletterForm };