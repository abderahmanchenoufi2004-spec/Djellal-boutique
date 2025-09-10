const productData = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        price: 450000,
        formattedPrice: '450,000 DZD',
        image: 'https://www.apple.com/v/iphone-15-pro/c/images/overview/design/design_hero_1__gq4suyls8c2u_large.jpg',
        images: [
            'https://www.apple.com/v/iphone-15-pro/c/images/overview/design/design_hero_1__gq4suyls8c2u_large.jpg',
            'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-unselect-202309?wid=5120&hei=2880&fmt=jpeg&qlt=90&.v=1692845700636'
        ],
        brand: 'apple',
        category: 'smartphones',
        specs: {
            ram: '8GB',
            processor: 'A17 Pro',
            storage: '256GB',
            display: '6.1" Super Retina XDR',
            camera: '48MP Triple Camera',
            battery: '3274 mAh'
        },
        rating: 4.8,
        reviews: 1247,
        features: ['5G Ready', 'Wireless Charging', 'Face ID', 'Water Resistant'],
        isNew: true,
        isBestSeller: true
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        price: 420000,
        formattedPrice: '420,000 DZD',
        image: 'https://www.91-cdn.com/hub/wp-content/uploads/2023/09/Samsung-Galaxy-S24-Ultra-render-2.jpg',
        images: [
            'https://www.91-cdn.com/hub/wp-content/uploads/2023/09/Samsung-Galaxy-S24-Ultra-render-2.jpg',
            'https://images.samsung.com/is/image/samsung/p6pmt/assets/s24-ultra-highlights-kv-d.jpg'
        ],
        brand: 'samsung',
        category: 'smartphones',
        specs: {
            ram: '12GB',
            processor: 'Snapdragon 8 Gen 3',
            storage: '512GB',
            display: '6.8" Dynamic AMOLED 2X',
            camera: '200MP Quad Camera',
            battery: '5000 mAh'
        },
        rating: 4.7,
        reviews: 892,
        features: ['5G Ready', 'S Pen Included', 'Wireless Charging', 'Water Resistant'],
        isNew: true,
        isBestSeller: true
    },
    {
        id: 3,
        name: 'Google Pixel 8 Pro',
        price: 390000,
        formattedPrice: '390,000 DZD',
        image: 'https://i.brecorder.com/primary/2024/05/6645935a35be4.jpg',
        images: [
            'https://i.brecorder.com/primary/2024/05/6645935a35be4.jpg',
            'https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/10/Google-Pixel-8-Pro-Review-1-scaled.jpg'
        ],
        brand: 'google',
        category: 'smartphones',
        specs: {
            ram: '12GB',
            processor: 'Google Tensor G3',
            storage: '256GB',
            display: '6.7" LTPO OLED',
            camera: '50MP Triple Camera',
            battery: '5050 mAh'
        },
        rating: 4.6,
        reviews: 654,
        features: ['Pure Android', 'AI Photography', 'Wireless Charging', 'Magic Eraser'],
        isNew: false,
        isBestSeller: false
    },
    {
        id: 4,
        name: 'Xiaomi 14 Ultra',
        price: 350000,
        formattedPrice: '350,000 DZD',
        image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-2.jpg',
        images: [
            'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-2.jpg',
            'https://i02.appmifile.com/80_operator_global/01/03/2024/102111111111111111111111111111111111111-1709355671.jpg'
        ],
        brand: 'xiaomi',
        category: 'smartphones',
        specs: {
            ram: '16GB',
            processor: 'Snapdragon 8 Gen 3',
            storage: '512GB',
            display: '6.73" LTPO AMOLED',
            camera: '50MP Quad Camera',
            battery: '5300 mAh'
        },
        rating: 4.5,
        reviews: 423,
        features: ['Leica Camera', 'Ultra Fast Charging', '5G Ready', 'MIUI 15'],
        isNew: true,
        isBestSeller: false
    },
    {
        id: 5,
        name: 'iPhone 14 Pro Max',
        price: 380000,
        formattedPrice: '380,000 DZD',
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-max-deep-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1663792344260',
        images: [
            'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-max-deep-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1663792344260',
            'https://www.apple.com/v/iphone/home/bh/images/overview/compare/compare_iphone_14_pro__e2x2q2z0050y_large.jpg'
        ],
        brand: 'apple',
        category: 'smartphones',
        specs: {
            ram: '6GB',
            processor: 'A16 Bionic',
            storage: '256GB',
            display: '6.7" Super Retina XDR',
            camera: '48MP Triple Camera',
            battery: '4323 mAh'
        },
        rating: 4.7,
        reviews: 2156,
        features: ['Dynamic Island', 'Always-On Display', 'Face ID', 'Ceramic Shield'],
        isNew: false,
        isBestSeller: true
    },
    {
        id: 6,
        name: 'OnePlus 12',
        price: 320000,
        formattedPrice: '320,000 DZD',
        image: 'https://onemobile.s3.amazonaws.com/2024/01/OnePlus-12-02.jpg',
        images: [
            'https://onemobile.s3.amazonaws.com/2024/01/OnePlus-12-02.jpg',
            'https://oasis.opstatics.com/content/dam/oasis/page/2023/global/oneplus-12/specs/specs-camera-pc.jpg'
        ],
        brand: 'oneplus',
        category: 'smartphones',
        specs: {
            ram: '12GB',
            processor: 'Snapdragon 8 Gen 3',
            storage: '256GB',
            display: '6.82" LTPO AMOLED',
            camera: '50MP Triple Camera',
            battery: '5400 mAh'
        },
        rating: 4.4,
        reviews: 287,
        features: ['100W SuperVOOC', 'Hasselblad Camera', 'OxygenOS 14', '5G Ready'],
        isNew: true,
        isBestSeller: false
    },
    {
        id: 7,
        name: 'Samsung Galaxy A55',
        price: 120000,
        formattedPrice: '120,000 DZD',
        image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-5g-1.jpg',
        images: [
            'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-5g-1.jpg',
            'https://images.samsung.com/is/image/samsung/p6pmt/assets/galaxy-a55-5g-highlights-kv-d.jpg'
        ],
        brand: 'samsung',
        category: 'smartphones',
        specs: {
            ram: '8GB',
            processor: 'Exynos 1480',
            storage: '128GB',
            display: '6.6" Super AMOLED',
            camera: '50MP Triple Camera',
            battery: '5000 mAh'
        },
        rating: 4.2,
        reviews: 500,
        features: ['5G Connectivity', 'IP67 Water Resistant', 'Great Value'],
        isNew: true,
        isBestSeller: false
    },
    {
        id: 8,
        name: 'Redmi Note 13 Pro+',
        price: 95000,
        formattedPrice: '95,000 DZD',
        image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-plus-5g-1.jpg',
        images: [
            'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-plus-5g-1.jpg',
            'https://i02.appmifile.com/80_operator_global/01/03/2024/102111111111111111111111111111111111111-1709355671.jpg'
        ],
        brand: 'xiaomi',
        category: 'smartphones',
        specs: {
            ram: '12GB',
            processor: 'Dimensity 7200 Ultra',
            storage: '512GB',
            display: '6.67" AMOLED',
            camera: '200MP Triple Camera',
            battery: '5000 mAh'
        },
        rating: 4.5,
        reviews: 300,
        features: ['200MP Camera', '120W HyperCharge', 'IP68 Dust/Water Resistant'],
        isNew: true,
        isBestSeller: true
    },
    {
        id: 9,
        name: 'Samsung Galaxy S25 Ultra',
        price: 480000,
        formattedPrice: '480,000 DZD',
        image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-1.jpg', // Placeholder image
        images: [
            'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-1.jpg',
            'https://images.samsung.com/is/image/samsung/p6pmt/assets/s25-ultra-highlights-kv-d.jpg'
        ],
        brand: 'samsung',
        category: 'smartphones',
        specs: {
            ram: '16GB',
            processor: 'Snapdragon 8 Gen 4',
            storage: '1TB',
            display: '6.9" Dynamic AMOLED 3X',
            camera: '200MP Quad Camera',
            battery: '5000 mAh'
        },
        rating: 4.9,
        reviews: 0,
        features: ['Next-Gen AI', 'Improved S Pen', 'Titanium Frame', '8K Video'],
        isNew: true,
        isBestSeller: false
    }
];

export { productData };