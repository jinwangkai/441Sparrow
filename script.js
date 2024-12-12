// Object containing the prices of each course
const coursePrices = {
    "Course 1": 15,
    "Course 2": 20,
    "Course 3": 25,
    "Course 4": 30,
    "Course 5": 35
};

let cart = {
    "Course 1": 0,
    "Course 2": 0,
    "Course 3": 0,
    "Course 4": 0,
    "Course 5": 0
};

document.addEventListener('DOMContentLoaded', function() {
    // Check login status and redirect if necessary
    const checkLoginStatus = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            console.log("User is not logged in. Redirecting to login page...");
            window.location.href = 'login.html';
        } else {
            console.log("User is logged in. Access granted.");
        }
    };

    // Handle login form submission
    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'cart.html';
        } else {
            alert('Incorrect email or password.');
        }
    };

    // Handle registration form submission
    const handleRegisterFormSubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password === confirmPassword) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            alert('Registration successful! You can now login.');
            window.location.href = 'login.html';
        } else {
            alert('Passwords do not match.');
        }
    };

    // Update total price in the cart
    const updateTotalPrice = () => {
        let totalPrice = 0;
        Object.keys(cart).forEach(course => totalPrice += cart[course] * coursePrices[course]);
        const totalPriceElement = document.querySelector('.total-price-section h2');
        totalPriceElement.textContent = `Total Price for All Courses: $${totalPrice}`;
    };

    // Handle cart operations
    const handleCartOperations = () => {
        const courses = document.querySelectorAll('.course');
        courses.forEach(course => {
            const addButton = course.querySelector('button');
            const courseName = course.querySelector('h2').textContent;
            const quantityInput = course.querySelector('input[type="text"]');
            const removeButton = course.querySelector('.remove-course');

            addButton.addEventListener('click', () => {
                const quantity = parseInt(quantityInput.value.trim());
                if (!isNaN(quantity)) {
                    cart[courseName] += quantity;
                    updateTotalPrice();
                } else {
                    alert('Please enter a valid quantity.');
                }
            });

            removeButton.addEventListener('click', () => {
                cart[courseName] = 0;
                quantityInput.value = '';
                updateTotalPrice();
            });
        });

        const clearCartButton = document.querySelector('.clear-cart');
        clearCartButton.addEventListener('click', () => {
            Object.keys(cart).forEach(course => cart[course] = 0);
            document.querySelectorAll('.course input[type="text"]').forEach(input => input.value = '');
            updateTotalPrice();
        });

        const checkoutButton = document.querySelector('.checkout');
        checkoutButton.addEventListener('click', () => {
            let totalPrice = 0;
            Object.keys(cart).forEach(course => totalPrice += cart[course] * coursePrices[course]);
            alert(`The total price of your shopping cart is $${totalPrice}`);
        });
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    };

    // Add event listeners for login and registration forms
    document.getElementById('loginForm')?.addEventListener('submit', handleLoginFormSubmit);
    document.getElementById('registerForm')?.addEventListener('submit', handleRegisterFormSubmit);
    document.getElementById('logoutButton')?.addEventListener('click', handleLogout);

    // Check login status and handle navigation
    if (window.location.pathname.includes('course.html') || window.location.pathname.includes('cart.html')) {
        checkLoginStatus();
    }

    // Handle cart operations after DOM is fully loaded
    handleCartOperations();
});