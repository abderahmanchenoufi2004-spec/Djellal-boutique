// Laptop products database
const laptops = [
    {
        id: 1,
        name: "MacBook Air M3",
        brand: "Apple",
        price: 119999,
        image: "../assets/images/products/laptops/macbook-air-m3.jpg",
        description: "Ultra-lightweight laptop with incredible performance and battery life.",
        inStock: true,
        category: "premium",
        processor: "Apple M3 chip",
        ram: "8GB",
        storage: "256GB SSD"
    },
    {
        id: 2,
        name: "Dell XPS 15",
        brand: "Dell",
        price: 73000,
        image: "../assets/images/products/laptops/dell xps15_.jpg",
        description: "Premium Windows laptop with stunning display and powerful specs.",
        inStock: true,
        category: "premium",
        processor: "Intel Core i7",
        ram: "16GB",
        storage: "512GB SSD"
    },
    {
        id: 3,
        name: "HP Spectre x360",
        brand: "HP",
        price: 85000,
        image: "../assets/images/products/laptops/hp-spectre.jpg",
        description: "Convertible laptop with powerful performance and stunning design.",
        inStock: true,
        category: "premium",
        processor: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD"
    },
    {
        id: 4,
        name: "Lenovo ThinkPad X1 Carbon",
        brand: "Lenovo",
        price: 92000,
        image: "../assets/images/products/laptops/thinkpad-x1.jpg",
        description: "Business laptop with legendary durability and security features.",
        inStock: true,
        category: "business",
        processor: "Intel Core i7",
        ram: "16GB",
        storage: "512GB SSD"
    },
    {
        id: 5,
        name: "ASUS ZenBook 14",
        brand: "ASUS",
        price: 65000,
        image: "../assets/images/products/laptops/zenbook-14.jpg",
        description: "Compact laptop with great performance and long battery life.",
        inStock: true,
        category: "mid",
        processor: "AMD Ryzen 7",
        ram: "16GB",
        storage: "512GB SSD"
    },
    {
        id: 6,
        name: "Acer Swift 3",
        brand: "Acer",
        price: 48000,
        image: "../assets/images/products/laptops/acer-swift3.jpg",
        description: "Affordable laptop with solid performance for everyday tasks.",
        inStock: true,
        category: "budget",
        processor: "AMD Ryzen 5",
        ram: "8GB",
        storage: "256GB SSD"
    },
    {
        id: 7,
        name: "Microsoft Surface Laptop 5",
        brand: "Microsoft",
        price: 105000,
        image: "../assets/images/products/laptops/surface-laptop5.jpg",
        description: "Premium laptop with touchscreen and excellent build quality.",
        inStock: true,
        category: "premium",
        processor: "Intel Core i7",
        ram: "16GB",
        storage: "512GB SSD"
    },
    {
        id: 8,
        name: "LG Gram 16",
        brand: "LG",
        price: 98000,
        image: "../assets/images/products/laptops/lg-gram16.jpg",
        description: "Ultra-lightweight laptop with large display and all-day battery.",
        inStock: true,
        category: "premium",
        processor: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD"
    }
];

// Display settings
let currentPage = 1;
const itemsPerPage = 6;
let filteredProducts = [...laptops];

// Calculate installment price (35% markup over 6 months)
function calculateInstallmentPrice(originalPrice) {
    return Math.round(originalPrice * 1.35);
}

// Format price in Algerian Dinar
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " DA";
}

// Display laptops on the page
function displayLaptops(products = filteredProducts) {
    const laptopGrid = document.getElementById('laptopGrid');
    laptopGrid.innerHTML = '';

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedProducts.length === 0) {
        laptopGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No products found matching your criteria.</p>
                <button id="resetFiltersBtn" class="btn">Show All Products</button>
            </div>
        `;
        
        document.getElementById('resetFiltersBtn').addEventListener('click', () => {
            resetFilters();
        });
        
        return;
    }

    paginatedProducts.forEach(product => {
        const installmentPrice = calculateInstallmentPrice(product.price);
        
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='../assets/images/ui/placeholder.jpg'">
                ${product.inStock ? '<span class="badge in-stock">In Stock</span>' : '<span class="badge out-of-stock">Out of Stock</span>'}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="brand">${product.brand}</span>
                <p class="product-description">${product.description}</p>
                <div class="price-container">
                    <div class="price-option">
                        <span class="price-label">Cash Price:</span>
                        <span class="price">${formatPrice(product.price)}</span>
                    </div>
                    <div class="price-option installment">
                        <span class="price-label">6 Month Installment:</span>
                        <span class="price">${formatPrice(installmentPrice)}</span>
                        <span class="installment-details">(${formatPrice(Math.round(installmentPrice/6))}/month)</span>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn view-details" data-id="${product.id}">Details</button>
                    <button class="btn btn-secondary compare-btn" data-id="${product.id}">Compare</button>
                </div>
            </div>
        `;
        laptopGrid.appendChild(productDiv);
    });

    // Set up pagination
    updatePagination(products);
    
    // Add event listeners to buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            // In a real implementation, this would navigate to the product detail page
            alert(`Viewing details for product ID: ${productId}`);
        });
    });
    
    // Add event listeners to compare buttons
    document.querySelectorAll('.compare-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToComparison(productId);
        });
    });
}

// Create pagination controls
function updatePagination(products) {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';
    
    const pageCount = Math.ceil(products.length / itemsPerPage);
    
    if (pageCount <= 1) {
        return;
    }
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-button prev';
    prevButton.innerHTML = '&laquo;';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayLaptops();
        }
    });
    paginationElement.appendChild(prevButton);
    
    // Page numbers
    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = i === currentPage ? 'pagination-button active' : 'pagination-button';
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayLaptops();
        });
        paginationElement.appendChild(pageButton);
    }
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-button next';
    nextButton.innerHTML = '&raquo;';
    nextButton.disabled = currentPage === pageCount;
    nextButton.addEventListener('click', () => {
        if (currentPage < pageCount) {
            currentPage++;
            displayLaptops();
        }
    });
    paginationElement.appendChild(nextButton);
}

// Filter products based on selected criteria
function applyFilters() {
    const selectedBrand = document.getElementById('brandFilter').value.toLowerCase();
    const selectedPrice = document.getElementById('priceFilter').value;
    const selectedProcessor = document.getElementById('processorFilter').value;
    const sortOrder = document.getElementById('sortOrder').value;

    filteredProducts = laptops.filter(product => {
        const matchesBrand = selectedBrand === "" || product.brand.toLowerCase() === selectedBrand;
        
        let matchesPrice = true;
        if (selectedPrice === 'budget') matchesPrice = product.price < 50000;
        else if (selectedPrice === 'mid') matchesPrice = product.price >= 50000 && product.price < 80000;
        else if (selectedPrice === 'premium') matchesPrice = product.price >= 80000;

        let matchesProcessor = true;
        if (selectedProcessor === 'intel') matchesProcessor = product.processor.includes('Intel');
        else if (selectedProcessor === 'amd') matchesProcessor = product.processor.includes('AMD');
        else if (selectedProcessor === 'apple') matchesProcessor = product.processor.includes('Apple');

        return matchesBrand && matchesPrice && matchesProcessor;
    });

    // Sort the filtered products
    sortProducts(sortOrder);
    
    // Reset to first page when filtering
    currentPage = 1;
    
    // Display the filtered products
    displayLaptops(filteredProducts);
}

// Sort products based on selected order
function sortProducts(sortOrder) {
    switch(sortOrder) {
        case 'nameAsc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'nameDesc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'priceLow':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'priceHigh':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }
}

// Reset all filters
function resetFilters() {
    document.getElementById('brandFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('processorFilter').value = '';
    document.getElementById('sortOrder').value = 'nameAsc';
    
    filteredProducts = [...laptops];
    currentPage = 1;
    
    displayLaptops();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners for filters
    document.getElementById('brandFilter').addEventListener('change', applyFilters);
    document.getElementById('priceFilter').addEventListener('change', applyFilters);
    document.getElementById('processorFilter').addEventListener('change', applyFilters);
    document.getElementById('sortOrder').addEventListener('change', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', resetFilters);
    
    // Initial display
    displayLaptops();
});

// Product comparison functionality
let comparisonList = [];

// Add product to comparison
function addToComparison(productId) {
    // Check if product is already in comparison list
    if (comparisonList.includes(productId)) {
        alert('This product is already in the comparison list!');
        return;
    }
    
    // Limit to 4 products for comparison
    if (comparisonList.length >= 4) {
        alert('You can only compare up to 4 products. Please remove some products from the comparison.');
        return;
    }
    
    // Add product to comparison list
    comparisonList.push(productId);
    updateComparisonUI();
    alert('Product added to comparison!');
}

// Remove product from comparison
function removeFromComparison(productId) {
    comparisonList = comparisonList.filter(id => id !== productId);
    updateComparisonUI();
}

// Update comparison UI
function updateComparisonUI() {
    const compareBar = document.getElementById('compareBar');
    const compareList = document.getElementById('compareList');
    
    if (!compareBar || !compareList) return;
    
    if (comparisonList.length > 0) {
        compareBar.classList.remove('hidden');
        compareList.innerHTML = '';
        
        comparisonList.forEach(productId => {
            const product = laptops.find(p => p.id === productId);
            if (product) {
                const productElement = document.createElement('div');
                productElement.className = 'compare-item';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='../assets/images/ui/placeholder.jpg'">
                    <div class="compare-item-info">
                        <h4>${product.name}</h4>
                        <p>${formatPrice(product.price)}</p>
                    </div>
                    <button class="remove-compare" data-id="${productId}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                compareList.appendChild(productElement);
                
                // Add event listener to remove button
                productElement.querySelector('.remove-compare').addEventListener('click', function() {
                    removeFromComparison(productId);
                });
            }
        });
        
        // Add compare button if we have at least 2 products
        if (comparisonList.length >= 2) {
            const compareButton = document.createElement('button');
            compareButton.className = 'btn compare-action-btn';
            compareButton.textContent = 'Compare Products';
            compareButton.addEventListener('click', showComparison);
            compareList.appendChild(compareButton);
        }
    } else {
        compareBar.classList.add('hidden');
    }
}

// Show comparison modal
function showComparison() {
    // In a real implementation, this would show a detailed comparison of the selected products
    alert(`Comparing ${comparisonList.length} products! In a full implementation, this would show a detailed comparison table.`);
}
