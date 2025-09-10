// Sample product data - in a real implementation, this would come from a database or API
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Smartphones",
    brand: "Apple",
    price: 210000,
    image: "assets/images/products/smartphones/iphone-15.jpg",
    description: "The latest iPhone with powerful A16 chip and amazing camera system.",
    isNew: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 157,
    onSale: false,
    salePrice: 0
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    category: "Smartphones",
    brand: "Samsung",
    price: 250000,
    image: "assets/images/products/smartphones/Samsung-Galaxy-S24-Ultra-One-UI-7-Android-15-fonctionnalites-date-de-sortie-nouveautes.jpg",
    description: "Experience the cutting-edge technology with Samsung's flagship phone.",
    isNew: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 142,
    onSale: false,
    salePrice: 0
  },
  {
    id: 3,
    name: "MacBook Air M3",
    category: "Laptops",
    brand: "Apple",
    price: 150000,
    image: "assets/images/products/laptops/laptop-murjp1nk4lp1idlt.jpg",
    description: "Ultra-lightweight laptop with incredible performance and battery life.",
    isNew: false,
    inStock: true,
    rating: 4.9,
    reviewCount: 98,
    onSale: true,
    salePrice: 140000
  },
  {
    id: 4,
    name: "Dell XPS 15",
    category: "Laptops",
    brand: "Dell",
    price: 180000,
    image: "assets/images/products/laptops/dell xps15_.jpg",
    description: "Premium Windows laptop with stunning display and powerful specs.",
    isNew: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 84,
    onSale: false,
    salePrice: 0
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    category: "Audio",
    brand: "Sony",
    price: 50000,
    image: "assets/images/products/smartphones/galaxy-s25-ultrajpg.jpg",
    description: "Industry-leading noise cancellation headphones with superior sound quality.",
    isNew: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 213,
    onSale: true,
    salePrice: 45000
  },
  {
    id: 6,
    name: "Samsung QLED 4K TV",
    category: "TVs",
    brand: "Samsung",
    price: 120000,
    image: "assets/images/products/tvs/samrt-tv.jpg",
    description: "Experience stunning colors and contrast with this premium 4K TV.",
    isNew: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 76,
    onSale: false,
    salePrice: 0
  },
  {
    id: 7,
    name: "iPad Pro",
    category: "Tablets",
    brand: "Apple",
    price: 100000,
    image: "assets/images/products/smartphones/realme gt neo 5.jpg",
    description: "The most powerful iPad yet, perfect for creatives and professionals.",
    isNew: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 128,
    onSale: false,
    salePrice: 0
  },
  {
    id: 8,
    name: "Sony A7 IV",
    category: "Cameras",
    brand: "Sony",
    price: 300000,
    image: "assets/images/products/smartphones/iphone-15.jpg",
    description: "Professional mirrorless camera with exceptional image quality.",
    isNew: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 56,
    onSale: false,
    salePrice: 0
  }
];

// Cart and wishlist state

let wishlist = [];

// Function to add a product to cart
function addToCart(product) {
  // Check if product is already in cart
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.onSale ? product.salePrice : product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show added to cart notification
  showNotification(`${product.name} added to your cart!`);
}

// Function to update cart count
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  domElements.cartCount.textContent = totalItems;
  domElements.cartCount.classList.toggle('hidden', totalItems === 0);
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


