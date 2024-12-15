document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    // Toggle between login and signup
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    // Signup form validation
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }

        // In a real application, you would send this to a backend
        const userData = {
            name: name,
            email: email,
            password: password
        };

        // Simulate signup (replace with actual backend call)
        console.log('Signup Data:', userData);
        alert('Account created successfully!');
        
        // Clear form
        signupForm.reset();
    });

    // Login form handling
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // In a real application, you would validate against a backend
        const loginData = {
            email: email,
            password: password
        };

        // Simulate login (replace with actual backend call)
        console.log('Login Data:', loginData);
        alert('Login successful!');
        
        // Clear form
        loginForm.reset();
    });

    // Forgot password functionality (placeholder)
    document.querySelector('.forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset functionality coming soon!');
    });
});