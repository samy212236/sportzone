// Produits disponibles
const products = [
    {
        id: 1,
        name: 'T-Shirt SportZone',
        category: 'tshirts',
        price: 29.99,
        emoji: '👕',
        description: 'T-shirt confortable et respirant pour vos entraînements'
    },
    {
        id: 2,
        name: 'Legging Performance',
        category: 'pantalons',
        price: 49.99,
        emoji: '🩳',
        description: 'Legging hautement élastique pour plus de liberté de mouvement'
    },
    {
        id: 3,
        name: 'Chaussures Running Pro',
        category: 'chaussures',
        price: 89.99,
        emoji: '👟',
        description: 'Chaussures de running avec semelle amortissante'
    },
    {
        id: 4,
        name: 'Sweat à Capuche',
        category: 'tshirts',
        price: 59.99,
        emoji: '🧥',
        description: 'Sweat chaud et douillet pour l\'après-sport'
    },
    {
        id: 5,
        name: 'Short Sportif',
        category: 'pantalons',
        price: 34.99,
        emoji: '⬜',
        description: 'Short séchage rapide avec poches pratiques'
    },
    {
        id: 6,
        name: 'Bonnet SportZone',
        category: 'accessoires',
        price: 19.99,
        emoji: '🧢',
        description: 'Bonnet chaud pour les entraînements hivernaux'
    },
    {
        id: 7,
        name: 'Chaussettes Performance',
        category: 'accessoires',
        price: 14.99,
        emoji: '🧦',
        description: 'Chaussettes antidérapantes pour plus de confort'
    },
    {
        id: 8,
        name: 'Baskets Casual Sport',
        category: 'chaussures',
        price: 69.99,
        emoji: '👞',
        description: 'Baskets polyvalentes pour le sport et le quotidien'
    },
    {
        id: 9,
        name: 'Brassière de Sport',
        category: 'tshirts',
        price: 44.99,
        emoji: '⭐',
        description: 'Brassière de sport avec maintien optimal'
    },
    {
        id: 10,
        name: 'Sac de Sport',
        category: 'accessoires',
        price: 39.99,
        emoji: '🎒',
        description: 'Sac spacieux pour transporter vos équipements'
    },
    {
        id: 11,
        name: 'Pantalon Jogging',
        category: 'pantalons',
        price: 54.99,
        emoji: '👖',
        description: 'Pantalon jogging confortable pour la détente'
    },
    {
        id: 12,
        name: 'Gants de Sport',
        category: 'accessoires',
        price: 24.99,
        emoji: '🧤',
        description: 'Gants thermiques pour vos séances de froid'
    }
];

// Panier
let cart = [];
let currentFilter = 'tous';

// Initialiser la boutique
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    loadCartFromStorage();
});

// Afficher les produits
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <div class="product-price">${product.price}€</div>
                <div class="product-description">${product.description}</div>
                <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filtrer les produits
function filterProducts(category) {
    currentFilter = category;

    // Mettre à jour les boutons actifs
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filtrer et afficher
    if (category === 'tous') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// Ajouter au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    saveCartToStorage();
    showNotification(`${product.name} ajouté au panier!`);
}

// Mettre à jour l'affichage du panier
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('totalPrice');

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        totalPrice.textContent = '0€';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                Quantité: ${item.quantity} × ${item.price}€
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: #ff6b6b; color: white; border: none; border-radius: 5px; cursor: pointer; padding: 0.3rem 0.6rem;">
                ✕
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = total.toFixed(2) + '€';
}

// Supprimer du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToStorage();
}

// Toggler le panier
function toggleCart() {
    document.getElementById('cart').classList.toggle('active');
}

// Passer la commande
function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Commande confirmée! Total: ${total.toFixed(2)}€\n\nMerci d'avoir choisi SportZone! 🎉`);
    
    cart = [];
    updateCart();
    saveCartToStorage();
    toggleCart();
}

// Sauvegarder le panier dans le localStorage
function saveCartToStorage() {
    localStorage.setItem('sportzone-cart', JSON.stringify(cart));
}

// Charger le panier depuis le localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('sportzone-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 300;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll vers les produits
function scrollToProducts() {
    document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
}

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Merci pour votre message! Nous vous répondrons très bientôt. 📧');
            contactForm.reset();
        });
    }
});
