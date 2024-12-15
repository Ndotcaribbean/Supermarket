document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Validation Functions
    const validateFullName = (name) => {
        return name.trim().length >= 2 && /^[A-Za-z\s]+$/.test(name);
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email.trim());
    };

    const validatePassword = (password) => {
        // At least 8 characters, one uppercase, one lowercase, one number
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return re.test(password);
    };

    // Display Error Message
    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = message;
        
        // Remove any existing error messages
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        formGroup.appendChild(errorDiv);
    };

    // Remove Error Message
    const clearError = (input) => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    };

    // Real-time Validation
    fullnameInput.addEventListener('input', () => {
        const name = fullnameInput.value;
        if (validateFullName(name)) {
            clearError(fullnameInput);
        } else {
            showError(fullnameInput, 'Please enter a valid full name');
        }
    });

    emailInput.addEventListener('input', () => {
        const email = emailInput.value;
        if (validateEmail(email)) {
            clearError(emailInput);
        } else {
            showError(emailInput, 'Please enter a valid email address');
        }
    });

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        if (validatePassword(password)) {
            clearError(passwordInput);
        } else {
            showError(passwordInput, 'Password must be at least 8 characters, include uppercase, lowercase, and number');
        }
    });

    confirmPasswordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (password === confirmPassword) {
            clearError(confirmPasswordInput);
        } else {
            showError(confirmPasswordInput, 'Passwords do not match');
        }
    });

    // Form Submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset previous errors
        [fullnameInput, emailInput, passwordInput, confirmPasswordInput].forEach(clearError);

        // Validate all fields
        let isValid = true;

        if (!validateFullName(fullnameInput.value)) {
            showError(fullnameInput, 'Please enter a valid full name');
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 8 characters, include uppercase, lowercase, and number');
            isValid = false;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }

        // If all validations pass
        if (isValid) {
            // Simulate account creation (replace with actual backend logic)
            const userData = {
                fullName: fullnameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };

            // In a real-world scenario, you would send this to a backend API
            console.log('Account Creation Data:', userData);
            
            // Show success message
            alert('Account created successfully! Redirecting to login...');
            
            // Reset form
            signupForm.reset();

            // Optional: Redirect to login page
            // window.location.href = 'login.html';
        }
    });

    // Login Toggle (if you have a login form on the same page)
    const loginToggle = document.getElementById('login-toggle');
    if (loginToggle) {
        loginToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Toggle between signup and login forms
            // Implement this based on your specific design
            alert('Login form toggle functionality to be implemented');
        });
    }
});