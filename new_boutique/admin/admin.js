import { productData } from '../assets/js/products.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addProductForm');
    const messageDiv = document.getElementById('message');
    const productBrandInput = document.getElementById('productBrand');
    const brandSuggestionsDiv = document.getElementById('brandSuggestions');

    const uniqueBrands = [...new Set(productData.map(product => product.brand))];

    productBrandInput.addEventListener('input', () => {
        const query = productBrandInput.value.toLowerCase();
        brandSuggestionsDiv.innerHTML = '';

        if (query.length > 0) {
            const filteredBrands = uniqueBrands.filter(brand => brand.includes(query));
            filteredBrands.forEach(brand => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = brand;
                suggestionItem.addEventListener('click', () => {
                    productBrandInput.value = brand;
                    brandSuggestionsDiv.innerHTML = '';
                });
                brandSuggestionsDiv.appendChild(suggestionItem);
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!productBrandInput.contains(e.target) && !brandSuggestionsDiv.contains(e.target)) {
            brandSuggestionsDiv.innerHTML = '';
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newProduct = {
            id: Date.now(), // Simple unique ID
            name: document.getElementById('productName').value,
            price: parseInt(document.getElementById('productPrice').value),
            formattedPrice: parseInt(document.getElementById('productPrice')).toLocaleString('en-DZ') + ' DZD',
            image: document.getElementById('productImage').value,
            brand: document.getElementById('productBrand').value.toLowerCase(),
            category: document.getElementById('productCategory').value.toLowerCase(),
            specs: {
                ram: document.getElementById('productRam').value,
                processor: document.getElementById('productProcessor').value,
                storage: document.getElementById('productStorage').value,
                display: document.getElementById('productDisplay').value,
                camera: document.getElementById('productCamera').value,
                battery: document.getElementById('productBattery').value,
            },
            rating: parseFloat(document.getElementById('productRating').value),
            reviews: parseInt(document.getElementById('productReviews').value),
            features: [], // You might want to add a field for features
            isNew: document.getElementById('isNew').checked,
            isBestSeller: document.getElementById('isBestSeller').checked,
        };

        try {
            // In a real application, you would send this data to a server.
            // For this example, we'll simulate updating the products.js file.
            // This part requires server-side logic or a build step to actually persist.
            // For a purely client-side solution, you'd store in localStorage, but that's not persistent across users.

            // Simulate updating products.js
            // This is a placeholder. Actual implementation would involve a backend API.
            console.log('Simulating product addition:', newProduct);
            showMessage('Product added successfully (simulated)! Please manually update products.js', 'success');
            form.reset();

        } catch (error) {
            console.error('Error adding product:', error);
            showMessage('Error adding product.', 'error');
        }
    });

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
    }
});