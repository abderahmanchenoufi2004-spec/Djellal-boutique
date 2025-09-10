// Washing machine products database
const washingMachines = [
    {
        id: 1,
        name: "LG Front Load Washer",
        brand: "LG",
        price: 85000,
        image: "../assets/images/products/default.png",
        description: "A high-efficiency front load washing machine with AI DD technology.",
        inStock: true,
        category: "premium",
        capacity: "9kg",
        rpm: 1400
    },
    {
        id: 2,
        name: "Samsung Top Load Washer",
        brand: "Samsung",
        price: 65000,
        image: "../assets/images/products/washing-machines/samsung-top-load.png",
        description: "A top load washing machine with a large capacity and powerful cleaning.",
        inStock: true,
        category: "mid",
        capacity: "10kg",
        rpm: 1200
    },
    {
        id: 3,
        name: "Beko Front Load Washer",
        brand: "Beko",
        price: 55000,
        image: "../assets/images/products/washing-machines/beko-front-load.jpg",
        description: "An affordable front load washing machine with a variety of programs.",
        inStock: true,
        category: "budget",
        capacity: "8kg",
        rpm: 1200
    }
];

// Display settings
let currentPage = 1;
const itemsPerPage = 6;
let filteredProducts = [...washingMachines];

// Calculate installment price (35% markup over 6 months)
function calculateInstallmentPrice(originalPrice) {
    return Math.round(originalPrice * 1.30);
}

// Format price in Algerian Dinar
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " DA";
}

// Display washing machines on the page
function displayWashingMachines(products = filteredProducts) {
    const washingMachineGrid = document.getElementById('washingMachineGrid');
    washingMachineGrid.innerHTML = '';

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedProducts.length === 0) {
        washingMachineGrid.innerHTML = `
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
                <img src="${product.image}" alt="${product.name}" onerror="this.src='../assets/images/products/default.jpg'">
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
        washingMachineGrid.appendChild(productDiv);
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
            displayWashingMachines();
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
            displayWashingMachines();
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
            displayWashingMachines();
        }
    });
    paginationElement.appendChild(nextButton);
}

// Filter products based on selected criteria
function applyFilters() {
    const selectedBrand = document.getElementById('brandFilter').value.toLowerCase();
    const selectedCapacity = document.getElementById('capacityFilter').value;

    filteredProducts = washingMachines.filter(product => {
        const matchesBrand = selectedBrand === "" || product.brand.toLowerCase() === selectedBrand;
        const matchesCapacity = selectedCapacity === "" || product.capacity === selectedCapacity;

        return matchesBrand && matchesCapacity;
    });
    
    // Reset to first page when filtering
    currentPage = 1;
    
    // Display the filtered products
    displayWashingMachines(filteredProducts);
}

// Reset all filters
function resetFilters() {
    document.getElementById('brandFilter').value = '';
    document.getElementById('capacityFilter').value = '';
    
    filteredProducts = [...washingMachines];
    currentPage = 1;
    
    displayWashingMachines();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners for filters
    document.getElementById('brandFilter').addEventListener('change', applyFilters);
    document.getElementById('capacityFilter').addEventListener('change', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', resetFilters);
    
    // Initial display
    displayWashingMachines();
});
