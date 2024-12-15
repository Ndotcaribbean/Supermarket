class UserManager {
    constructor() {
        this.users = this.loadUsersFromLocalStorage();
        this.currentUser = this.getCurrentUser();
    }

    // Load users from local storage
    loadUsersFromLocalStorage() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users;
    }

    // Save users to local storage
    saveUsersToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Get currently logged-in user
    getCurrentUser() {
        const currentUserEmail = localStorage.getItem('currentUserEmail');
        return this.users.find(user => user.email === currentUserEmail) || null;
    }

    // Login user
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUserEmail', email);
            this.currentUser = user;
            return true;
        }
        return false;
    }

    // Logout user
    logout() {
        localStorage.removeItem('currentUserEmail');
        this.currentUser = null;
    }

    // Register new user
    register(email, password, name) {
        // Check if user already exists
        if (this.users.some(u => u.email === email)) {
            return false;
        }

        const newUser = {
            email,
            password,
            name,
            cart: [],
            orders: []
        };

        this.users.push(newUser);
        this.saveUsersToLocalStorage();
        return true;
    }

    // Add item to cart
    addToCart(item) {
        if (!this.currentUser) {
            alert('Please log in first');
            return false;
        }

        // Check if item already exists in cart
        const existingItemIndex = this.currentUser.cart.findIndex(
            cartItem => cartItem.name === item.name
        );

        if (existingItemIndex > -1) {
            // Update quantity if item exists
            this.currentUser.cart[existingItemIndex].quantity += item.quantity;
        } else {
            // Add new item to cart
            this.currentUser.cart.push(item);
        }

        this.updateUserInDatabase();
        return true;
    }

    // Update user in database (local storage)
    updateUserInDatabase() {
        const userIndex = this.users.findIndex(u => u.email === this.currentUser.email);
        if (userIndex > -1) {
            this.users[userIndex] = this.currentUser;
            this.saveUsersToLocalStorage();
        }
    }

    // Remove item from cart
    removeFromCart(index) {
        if (!this.currentUser) return;
        
        this.currentUser.cart.splice(index, 1);
        this.updateUserInDatabase();
    }

    // Clear cart
    clearCart() {
        if (!this.currentUser) return;
        
        this.currentUser.cart = [];
        this.updateUserInDatabase();
    }
}

// Initialize UserManager globally
const userManager = new UserManager();

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCart() {
        // Ensure user is logged in
        if (!userManager.currentUser) {
            window.location.href = 'account.html';
            return;
        }

        const cart = userManager.currentUser.cart || [];
        
        // Clear previous cart items
        cartItemsContainer.innerHTML = '';

        // Calculate total
        let total = 0;

        // Render cart items
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            
            const itemPrice = parseFloat(item.price.replace('$', '').split('/')[0]);
            const itemTotal = itemPrice * parseInt(item.quantity);
            total += itemTotal;

            cartItemElement.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div>
                    <p>Subtotal: $${itemTotal.toFixed(2)}</p>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItemElement);
        });

        // Update total
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Attach to global scope for button click
    window.removeItem = function(index) {
        userManager.removeFromCart(index);
        renderCart();
    };

    // Checkout functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (!userManager.currentUser) {
                alert('Please log in to proceed with checkout');
                window.location.href = 'account.html';
                return;
            }

            if (userManager.currentUser.cart.length === 0) {
                alert('Your cart is empty');
                return;
            }

            // Create an order
            const order = {
                id: Date.now(),
                items: userManager.currentUser.cart,
                total: parseFloat(cartTotalElement.textContent.replace('$', '')),
                date: new Date().toLocaleString()
            };

            // Add order to user's order history
            userManager.currentUser.orders.push(order);

            // Clear the cart
            userManager.clearCart();

            // Render updated cart (which should now be empty)
            renderCart();

            // Show success message
            alert('Order placed successfully! Thank you for your purchase.');
        });
    }

    // Initial render
    renderCart();
});