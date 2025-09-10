document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productCategoryInput = document.getElementById('productCategory');
    const productBrandInput = document.getElementById('productBrand');
    const productPriceInput = document.getElementById('productPrice');
    const productImageInput = document.getElementById('productImage');
    const productDescriptionInput = document.getElementById('productDescription');
    const cancelEditBtn = document.getElementById('cancelEdit');
    const suggestedCategoriesDatalist = document.getElementById('suggestedCategories');
    const suggestedBrandsDatalist = document.getElementById('suggestedBrands');

    let products = [];

    const suggestedData = {
        "smartphones": ["Apple", "Samsung", "Realme", "Xiaomi", "Oppo", "Google", "OnePlus", "Sony", "Vivo", "Nokia"],
        "laptops": ["Dell", "HP", "Apple", "Lenovo", "Asus", "Acer", "Microsoft"],
        "microwaves": ["Samsung", "LG", "Panasonic", "Sharp", "Bosch"],
        "air conditioners": ["LG", "Samsung", "Daikin", "Carrier", "Gree"],
        "ovens": ["Bosch", "Siemens", "Neff", "AEG", "Whirlpool"],
        "tvs": ["Samsung", "LG", "Sony", "Panasonic", "TCL", "Hisense"],
        "machine a laver": ["LG", "Samsung", "Bosch", "Siemens", "Whirlpool"]
    };

    // Populate suggested categories
    Object.keys(suggestedData).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        suggestedCategoriesDatalist.appendChild(option);
    });

    // Update brand suggestions based on category
    productCategoryInput.addEventListener('input', () => {
        const selectedCategory = productCategoryInput.value.toLowerCase();
        suggestedBrandsDatalist.innerHTML = '';
        if (suggestedData[selectedCategory]) {
            suggestedData[selectedCategory].forEach(brand => {
                const option = document.createElement('option');
                option.value = brand;
                suggestedBrandsDatalist.appendChild(option);
            });
        }
    });

    let products = [];

    // Fetch products from JSON file
    async function fetchProducts() {
        try {
            const response = await fetch('../assets/data/products.json');
            const data = await response.json();
            products = data.products;
            displayProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Display products in the list
    function displayProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <div>
                    <strong>${product.name}</strong> (${product.category})
                </div>
                <div class="product-item-actions">
                    <button onclick="editProduct('${product.id}')">Edit</button>
                    <button onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    // Initial fetch
    fetchProducts();

    // Edit product
    window.editProduct = (id) => {
        const product = products.find(p => p.id === id);
        if (product) {
            productIdInput.value = product.id;
            productNameInput.value = product.name;
            productCategoryInput.value = product.category;
            productBrandInput.value = product.brand;
            productPriceInput.value = product.price;
            productImageInput.value = product.image;
            productDescriptionInput.value = product.description;
            cancelEditBtn.style.display = 'inline-block';
        }
    };

    // Delete product
    window.deleteProduct = (id) => {
        products = products.filter(p => p.id !== id);
        console.log('Simulating delete: In a real app, a request would be sent to the server to delete the product.');
        console.log('Updated products array:', products);
        displayProducts();
    };

    // Cancel edit
    cancelEditBtn.addEventListener('click', () => {
        productForm.reset();
        productIdInput.value = '';
        cancelEditBtn.style.display = 'none';
    });

    // Form submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = productIdInput.value;
        const productData = {
            id: id || `product_${Date.now()}`,
            name: productNameInput.value,
            category: productCategoryInput.value,
            brand: productBrandInput.value,
            price: parseFloat(productPriceInput.value),
            image: productImageInput.value,
            description: productDescriptionInput.value
        };

        if (id) {
            // Update existing product
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products[index] = productData;
            }
        } else {
            // Add new product
            products.push(productData);
        }

        console.log('Simulating save: In a real app, this data would be sent to the server.');
        console.log('Updated products array:', products);

        displayProducts();
        productForm.reset();
        productIdInput.value = '';
        cancelEditBtn.style.display = 'none';
    });
});