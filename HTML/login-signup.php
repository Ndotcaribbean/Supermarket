<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Walker Supermarket - Login/Signup</title>
    <link rel="stylesheet" href="login-signup.css">
</head>
<body>
    <div class="container" id="container">
        <div class="form-container sign-up-container">
            <form id="signup-form">
                <h1>Create Account</h1>
                <input type="text" placeholder="Full Name" id="signup-name" required />
                <input type="email" placeholder="Email" id="signup-email" required />
                <input type="password" placeholder="Password" id="signup-password" required />
                <input type="password" placeholder="Confirm Password" id="confirm-password" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form id="login-form">
                <h1>Sign in</h1>
                <input type="email" placeholder="Email" id="login-email" required />
                <input type="password" placeholder="Password" id="login-password" required />
                <a href="#" class="forgot-password">Forgot your password?</a>
                <button type="submit">Sign In</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button class="ghost" id="signIn">Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start your journey with Walker Supermarket</p>
                    <button class="ghost" id="signUp">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    <script src="login-signup.js"></script>
</body>
</html>