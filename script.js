// Sample products data
const products = [
    {
        id: 1,
        name: "Premium Leather Wallet",
        price: 2999,
        image: "https://picsum.photos/seed/wallet1/300/300",
        description: "Handcrafted genuine leather wallet with multiple card slots and coin pocket.",
        details: "Made from premium Italian leather, this wallet features RFID protection, 8 card slots, 2 bill compartments, and a secure coin pocket. Dimensions: 11cm x 9cm x 2cm."
    },
    {
        id: 2,
        name: "Luxury Watch",
        price: 15999,
        image: "https://picsum.photos/seed/watch1/300/300",
        description: "Elegant timepiece with Swiss movement and sapphire crystal.",
        details: "This luxury watch features automatic movement, water resistance up to 100m, date display, and comes with a genuine leather strap. Case diameter: 42mm."
    },
    {
        id: 3,
        name: "Designer Sunglasses",
        price: 4999,
        image: "https://picsum.photos/seed/sunglasses1/300/300",
        description: "UV protection sunglasses with polarized lenses.",
        details: "100% UV protection, polarized lenses for reduced glare, lightweight acetate frame, comes with protective case and cleaning cloth."
    },
    {
        id: 4,
        name: "Premium Backpack",
        price: 3999,
        image: "https://picsum.photos/seed/backpack1/300/300",
        description: "Water-resistant backpack with laptop compartment.",
        details: "15.6-inch laptop compartment, water-resistant material, multiple organizer pockets, padded shoulder straps, and USB charging port."
    },
    {
        id: 5,
        name: "Silk Scarf",
        price: 1999,
        image: "https://picsum.photos/seed/scarf1/300/300",
        description: "100% pure silk scarf with exclusive print design.",
        details: "90cm x 90cm pure silk scarf, hand-rolled edges, exclusive print design, comes in luxury gift box."
    },
    {
        id: 6,
        name: "Leather Belt",
        price: 2499,
        image: "https://picsum.photos/seed/belt1/300/300",
        description: "Genuine leather belt with premium buckle.",
        details: "Full-grain leather, removable buckle, width: 3.5cm, available in black and brown, adjustable length."
    },
    {
        id: 7,
        name: "Perfume Set",
        price: 5999,
        image: "https://picsum.photos/seed/perfume1/300/300",
        description: "Collection of premium fragrances for all occasions.",
        details: "Set includes 3 x 30ml bottles: Daytime Fresh, Evening Elegance, and Night Intense. Long-lasting formulas with premium ingredients."
    },
    {
        id: 8,
        name: "Smart Wallet",
        price: 3499,
        image: "https://picsum.photos/seed/smartwallet1/300/300",
        description: "Bluetooth-enabled wallet with tracking technology.",
        details: "Bluetooth tracking via mobile app, RFID protection, slim design, rechargeable battery, lost phone alert feature."
    }
];

let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Cart button
    document.getElementById('cartButton').addEventListener('click', toggleCart);
    
    // Mobile menu button
    document.getElementById('mobileMenuButton').addEventListener('click', toggleMobileMenu);
    
    // Close cart button
    document.getElementById('closeCartButton').addEventListener('click', toggleCart);
    
    // Close product modal
    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
    
    // Modal backdrop
    document.querySelector('.modal-backdrop').addEventListener('click', closeProductModal);
    
    // Checkout button
    document.getElementById('checkoutButton').addEventListener('click', checkout);
    
    // WhatsApp order button
    document.getElementById('whatsappOrderButton').addEventListener('click', orderViaWhatsApp);
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    
    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletterSubmit);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.getElementById('mobileMenu').classList.add('hidden');
            }
        });
    });
}

// Load products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => `
        <div class="bg-white rounded-lg overflow-hidden shadow-lg hover-lift cursor-pointer" onclick="showProductDetail(${product.id})">
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                <span class="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">Premium</span>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold">₹${product.price.toLocaleString('en-IN')}</span>
                    <button onclick="event.stopPropagation(); addToCart(${product.id})" class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                        <i class="fas fa-cart-plus mr-2"></i>Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show product detail modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div>
            <img src="${product.image}" alt="${product.name}" class="w-full rounded-lg">
        </div>
        <div>
            <h2 class="text-3xl font-bold playfair mb-4">${product.name}</h2>
            <p class="text-3xl font-bold mb-4">₹${product.price.toLocaleString('en-IN')}</p>
            <p class="text-gray-600 mb-6">${product.details}</p>
            
            <div class="space-y-4 mb-6">
                <div class="flex items-center">
                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Premium Quality Guaranteed</span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-shipping-fast text-blue-500 mr-2"></i>
                    <span>Free Shipping on orders above ₹999</span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-undo text-orange-500 mr-2"></i>
                    <span>7-Day Easy Returns</span>
                </div>
            </div>
            
            <div class="flex gap-4">
                <button onclick="addToCart(${product.id}); closeProductModal();" class="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                    <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                </button>
                <button onclick="orderViaWhatsAppProduct(${product.id})" class="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                    <i class="fab fa-whatsapp mr-2"></i>Order Now
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('productModal').classList.remove('hidden');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification('Product added to cart!');
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCart = document.getElementById('emptyCart');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        emptyCart.classList.remove('hidden');
        cartItems.innerHTML = '';
        cartTotal.textContent = '₹0';
    } else {
        emptyCart.classList.add('hidden');
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center gap-4 p-4 border rounded-lg">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">₹${item.price.toLocaleString('en-IN')}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="w-8 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Toggle cart
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('translate-x-full');
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Order via WhatsApp
function orderViaWhatsApp() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const message = `Hello! I'd like to order the following items from Finixy:\n\n` +
        cart.map(item => `${item.name} - Quantity: ${item.quantity} - ₹${item.price.toLocaleString('en-IN')}`).join('\n') +
        `\n\nTotal: ₹${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('en-IN')}`;
    
    const whatsappUrl = `https://wa.me/918891519975?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Order single product via WhatsApp
function orderViaWhatsAppProduct(productId) {
    const product = products.find(p => p.id === productId);
    const message = `Hello! I'd like to order ${product.name} for ₹${product.price.toLocaleString('en-IN')} from Finixy.`;
    
    const whatsappUrl = `https://wa.me/918891519975?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    showNotification('Checkout feature coming soon! Please order via WhatsApp.');
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    event.target.reset();
}

// Handle newsletter submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    showNotification('Thank you for subscribing! Check your email for exclusive offers.');
    event.target.reset();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}