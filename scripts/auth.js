// ── Cart Count ──
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
document.querySelector('.cart-badge').textContent = cartCount;

// ── Show Form ──
function showForm(type) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    } else {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
    }
}

// ── Toggle Password Visibility ──
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// ── Validate Login Email ──
function validateLoginEmail() {
    const email = document.getElementById('login-email');
    const error = document.getElementById('login-email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value === '') {
        error.textContent = 'Email is required';
        email.classList.add('error');
        email.classList.remove('success');
        return false;
    } else if (!emailRegex.test(email.value)) {
        error.textContent = 'Please enter a valid email';
        email.classList.add('error');
        email.classList.remove('success');
        return false;
    } else {
        error.textContent = '';
        email.classList.remove('error');
        email.classList.add('success');
        return true;
    }
}

// ── Validate Login Password ──
function validateLoginPassword() {
    const password = document.getElementById('login-password');
    const error = document.getElementById('login-password-error');

    if (password.value === '') {
        error.textContent = 'Password is required';
        password.classList.add('error');
        password.classList.remove('success');
        return false;
    } else if (password.value.length < 8) {
        error.textContent = 'Password must be at least 8 characters';
        password.classList.add('error');
        password.classList.remove('success');
        return false;
    } else {
        error.textContent = '';
        password.classList.remove('error');
        password.classList.add('success');
        return true;
    }
}

// ── Validate Signup Name ──
function validateName() {
    const name = document.getElementById('signup-name');
    const error = document.getElementById('signup-name-error');

    if (name.value.trim() === '') {
        error.textContent = 'Full name is required';
        name.classList.add('error');
        name.classList.remove('success');
        return false;
    } else if (name.value.trim().length < 3) {
        error.textContent = 'Name must be at least 3 characters';
        name.classList.add('error');
        name.classList.remove('success');
        return false;
    } else {
        error.textContent = '';
        name.classList.remove('error');
        name.classList.add('success');
        return true;
    }
}

// ── Validate Signup Email ──
function validateSignupEmail() {
    const email = document.getElementById('signup-email');
    const error = document.getElementById('signup-email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value === '') {
        error.textContent = 'Email is required';
        email.classList.add('error');
        email.classList.remove('success');
        return false;
    } else if (!emailRegex.test(email.value)) {
        error.textContent = 'Please enter a valid email';
        email.classList.add('error');
        email.classList.remove('success');
        return false;
    } else {
        error.textContent = '';
        email.classList.remove('error');
        email.classList.add('success');
        return true;
    }
}

// ── Validate Signup Password ──
function validateSignupPassword() {
    const password = document.getElementById('signup-password');
    const error = document.getElementById('signup-password-error');
    const strengthDiv = document.getElementById('password-strength');
    const val = password.value;

    // Show strength meter
    strengthDiv.style.display = val.length > 0 ? 'flex' : 'none';

    // Check strength
    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    // Update bars
    const bars = ['bar1', 'bar2', 'bar3', 'bar4'];
    const strengthText = document.getElementById('strength-text');
    const classes = ['weak', 'fair', 'good', 'strong'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#e94560', '#ffc107', '#17a2b8', '#28a745'];

    bars.forEach((barId, index) => {
        const bar = document.getElementById(barId);
        bar.className = 'bar';
        if (index < strength) {
            bar.classList.add(classes[strength - 1]);
        }
    });

    if (val.length > 0) {
        strengthText.textContent = labels[strength - 1] || 'Weak';
        strengthText.style.color = colors[strength - 1] || '#e94560';
    }

    if (val === '') {
        error.textContent = 'Password is required';
        password.classList.add('error');
        return false;
    } else if (val.length < 8) {
        error.textContent = 'At least 8 characters required';
        password.classList.add('error');
        return false;
    } else if (!/[A-Z]/.test(val)) {
        error.textContent = 'Add at least one uppercase letter';
        password.classList.add('error');
        return false;
    } else if (!/[0-9]/.test(val)) {
        error.textContent = 'Add at least one number';
        password.classList.add('error');
        return false;
    } else {
        error.textContent = '';
        password.classList.remove('error');
        password.classList.add('success');
        return true;
    }
}

// ── Validate Confirm Password ──
function validateConfirmPassword() {
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm');
    const error = document.getElementById('signup-confirm-error');

    if (confirm.value === '') {
        error.textContent = 'Please confirm your password';
        confirm.classList.add('error');
        return false;
    } else if (confirm.value !== password) {
        error.textContent = 'Passwords do not match';
        confirm.classList.add('error');
        confirm.classList.remove('success');
        return false;
    } else {
        error.textContent = '✅ Passwords match';
        error.style.color = '#28a745';
        confirm.classList.remove('error');
        confirm.classList.add('success');
        return true;
    }
}

// ── Handle Login ──
function handleLogin() {
    const isEmailValid = validateLoginEmail();
    const isPasswordValid = validateLoginPassword();

    if (!isEmailValid || !isPasswordValid) {
        return;
    }

    const email = document.getElementById('login-email').value;
    const remember = document.getElementById('remember-me').checked;

    // Save to localStorage if remember me
    if (remember) {
        localStorage.setItem('userEmail', email);
    }

    // Save login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', email.split('@')[0]);

    // Show success
    const btn = document.querySelector('#login-form .auth-submit-btn');
    btn.textContent = '✅ Logging in...';
    btn.style.background = '#28a745';

    showToast('success', 'Welcome Back!', 'Login successful! Redirecting...');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// ── Handle Signup ──
function handleSignup() {
    const isNameValid = validateName();
    const isEmailValid = validateSignupEmail();
    const isPasswordValid = validateSignupPassword();
    const isConfirmValid = validateConfirmPassword();

    const terms = document.getElementById('terms');
    const termsError = document.getElementById('terms-error');

    if (!terms.checked) {
        termsError.textContent = 'Please accept terms & conditions';
        return;
    } else {
        termsError.textContent = '';
    }

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
        return;
    }

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;

    // Save user data
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);

    // Show success
    const btn = document.querySelector('#signup-form .auth-submit-btn');
    btn.textContent = '✅ Creating Account...';
    btn.style.background = '#28a745';

    showToast('success', 'Account Created!', 'Welcome to ShopEasy ' + name + '!');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// ── Toast ──
function showToast(type, title, message) {
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-text').textContent = message;
    const toast = document.getElementById('toast');
    toast.classList.add('active');
    setTimeout(closeToast, 4000);
}

function closeToast() {
    document.getElementById('toast').classList.remove('active');
}

// ── Hamburger ──
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('navbar').classList.toggle('active');
});