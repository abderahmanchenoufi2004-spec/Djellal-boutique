
const smartphones = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        brand: "Apple",
        price: 200000,
        image: "../../assets/images/products/smartphones/iphone-15.jpg",
        description: "A16 Bionic chip, Pro camera system, 6.1-inch Super Retina XDR display",
        inStock: true,
        category: "premium"
    },
    {
        id: 2,
        name: "Samsung Galaxy S25",
        brand: "Samsung",
        price: 150000,
        image: "assets/images/products/smartphones/Samsung-Galaxy-S24-Ultra-One-UI-7-Android-15-fonctionnalites-date-de-sortie-nouveautes.jpg",
        description: "Snapdragon 8 Gen 3, 200MP camera, 6.8-inch Dynamic AMOLED 2X",
        inStock: true,
        category: "premium"
    },
    {
        id: 3,
        name: "iPhone SE (2024)",
        brand: "Apple",
        price: 75000,
        image: "assets/image-",
        description: "A15 Bionic chip, 12MP camera, 4.7-inch Retina HD display",
        inStock: true,
        category: "mid"
    },
    {
        id: 4,
        name: "Samsung Galaxy A54",
        brand: "Samsung",
        price: 45000,
        image: "assets/images/products/default.jpg",
        description: "Exynos 1380, 50MP camera, 6.4-inch Super AMOLED display",
        inStock: true,
        category: "mid"
    },
    {
        id: 5,
        name: "Realme GT Neo 5",
        brand: "Realme",
        price: 60000,
        image: "assets/images/products/smartphones/realme gt neo 5.jpg",
        description: "Snapdragon 8+ Gen 1, 50MP camera, 6.74-inch AMOLED display",
        inStock: true,
        category: "mid"
    },
    {
        id: 6,
        name: "Xiaomi Redmi Note 13",
        brand: "Xiaomi",
        price: 28000,
        image: "assets/images/products/smartphones/redminote13.jpg",
        description: "MediaTek Dimensity 6080, 108MP camera, 6.67-inch AMOLED display",
        inStock: true,
        category: "budget"
    },
    {
        id: 7,
        name: "Oppo A78",
        brand: "Oppo",
        price: 25000,
        image: "assets/images/products/smartphones/oppoA78.jpg",
        description: "MediaTek Helio G85, 50MP camera, 6.56-inch LCD display",
        inStock: true,
        category: "budget"
    },
    {
        id: 8,
        name: "Realme C55",
        brand: "Realme",
        price: 22000,
        image: "assets/images/products/smartphones/realmeC55.jpg",
        description: "MediaTek Helio G88, 64MP camera, 6.72-inch LCD display",
        inStock: true,
        category: "budget"
    },
    {
        id: 9,
        name: "Samsung Galaxy A14",
        brand: "Samsung",
        price: 24000,
        image: "assets/images/products/smartphones/samsungA14.jpg",
        description: "Exynos 850, 50MP camera, 6.6-inch PLS LCD display",
        inStock: true,
        category: "budget"
    },
    {
        id: 10,
        name: "Xiaomi Poco M6",
        brand: "Xiaomi",
        price: 20000,
        image: "assets/images/products/default.jpg",
        description: "MediaTek Helio G85, 50MP camera, 6.74-inch LCD display",
        inStock: true,
        category: "budget"
    },
    {
        id: 11,
        name: "Google Pixel 8",
        brand: "Google",
        price: 180000,
        image: "assets/images/products/default.jpg",
        description: "Google Tensor G3, 50MP camera, 6.2-inch OLED display",
        inStock: true,
        category: "premium"
    },
    {
        id: 12,
        name: "OnePlus 11",
        brand: "OnePlus",
        price: 120000,
        image: "assets/images/products/smartphones/oneplus11.jpg",
        description: "Snapdragon 8 Gen 2, 50MP camera, 6.7-inch AMOLED display",
        inStock: true,
        category: "premium"
    },
    {
        id: 13,
        name: "Sony Xperia 5 IV",
        brand: "Sony",
        price: 130000,
        image: "assets/images/products/smartphones/xperia5.jpg",
        description: "Snapdragon 8 Gen 1, 12MP camera, 6.1-inch OLED display",
        inStock: true,
        category: "premium"
    },
    {
        id: 14,
        name: "Vivo X90 Pro",
        brand: "Vivo",
        price: 140000,
        image: "assets/images/products/smartphones/vivoX90.jpg",
        description: "MediaTek Dimensity 9200, 50MP camera, 6.78-inch AMOLED display",
        inStock: true,
        category: "premium"
    },
    {
        id: 15,
        name: "Nokia G400",
        brand: "Nokia",
        price: 30000,
        image: "assets/images/products/smartphones/nokiaG400.jpg",
        description: "Snapdragon 480, 48MP camera, 6.58-inch LCD display",
        inStock: true,
        category: "budget"
    }
    ,{
        id: 16,
        name: "Realme 12 Pro",
        brand: "Realme",
        price: 70000,
        image: "assets/images/products/smartphones/realme12pro.jpg",
        description: "MediaTek Dimensity 920, 108MP camera, 6.7-inch AMOLED display",
        inStock: true,
        category: "mid"
    },
    {
        id: 17,
        name: "Realme 12 Pro Plus",
        brand: "Realme",
        price: 80000,
        image: "assets/images/products/smartphones/realme12proplus.jpg",
        description: "MediaTek Dimensity 920, 200MP camera, 6.7-inch AMOLED display",
        inStock: true,
        category: "premium"
    },
    {
        id: 18,
        name: "Oppo A76",
        brand: "Oppo",
        price: 35000,
        image: "assets/images/products/smartphones/oppoA76.jpg",
        description: "Snapdragon 680, 50MP camera, 6.56-inch LCD display",
        inStock: true,
        category: "budget"
    },
    {
        id: 19,
        name: "Samsung Galaxy M14",
        brand: "Samsung",
        price: 40000,
        image: "assets/images/products/smartphones/samsungM14.jpg",
        description: "Exynos 1330, 50MP camera, 6.6-inch PLS LCD display",
        inStock: true,
        category: "mid"
    },
    {
        id: 20,
        name: "Samsung Galaxy M54",
        brand: "Samsung",
        price: 60000,
        image: "assets/images/products/smartphones/samsungM54.jpg",
        description: "Exynos 1380, 108MP camera, 6.7-inch Super AMOLED display",
        inStock: true,
        category: "premium"
    },
    {
        id: 21,
        name: "Samsung Galaxy M55",
        brand: "Samsung",
        price: 65000,
        image: "assets/images/products/default.png",
        description: "Exynos 1380, 64MP camera, 6.7-inch Super AMOLED display",
        inStock: true,
        category: "premium"
    }
];

// Display settings
let currentPage = 1;
const itemsPerPage = 6;
let filteredProducts = [...smartphones];

// Calculate installment price (30% markup over 6 months)
function calculateInstallmentPrice(originalPrice) {
    return Math.round(originalPrice * 1.35);
}

// Format price in Algerian Dinar
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " DA";
}

// Display smartphones on the page
function displaySmartphones(products = filteredProducts) {
    const smartphoneGrid = document.getElementById('smartphoneGrid');
    smartphoneGrid.innerHTML = '';

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedProducts.length === 0) {
        smartphoneGrid.innerHTML = `
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
                <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/images/ui/placeholder.jpg'">
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
                    
                    <button class="btn btn-secondary view-details">Details</button>
                </div>
            </div>
        `;
        smartphoneGrid.appendChild(productDiv);
    });

    // Set up pagination
    updatePagination(products);
    
    // Add event listeners to buttons
    
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
            displaySmartphones();
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
            displaySmartphones();
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
            displaySmartphones();
        }
    });
    paginationElement.appendChild(nextButton);
}

// Filter products based on selected criteria
function applyFilters() {
    const selectedBrand = document.getElementById('brandFilter').value.toLowerCase();
    const selectedPrice = document.getElementById('priceFilter').value;
    const sortOrder = document.getElementById('sortOrder').value;

    filteredProducts = smartphones.filter(product => {
        const matchesBrand = selectedBrand === "" || product.brand.toLowerCase() === selectedBrand;
        let matchesPrice = true;
        
        if (selectedPrice === 'budget') matchesPrice = product.price < 30000;
        else if (selectedPrice === 'mid') matchesPrice = product.price >= 30000 && product.price < 50000;
        else if (selectedPrice === 'premium') matchesPrice = product.price >= 50000;

        return matchesBrand && matchesPrice;
    });

    // Sort the filtered products
    sortProducts(sortOrder);
    
    // Reset to first page when filtering
    currentPage = 1;
    
    // Display the filtered products
    displaySmartphones(filteredProducts);
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
    document.getElementById('sortOrder').value = 'nameAsc';
    
    filteredProducts = [...smartphones];
    currentPage = 1;
    
    displaySmartphones();
}

document.addEventListener('DOMContentLoaded', () => {
    displaySmartphones();

    document.getElementById('brandFilter').addEventListener('change', applyFilters);
    document.getElementById('priceFilter').addEventListener('change', applyFilters);
    document.getElementById('sortOrder').addEventListener('change', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', resetFilters);
});

