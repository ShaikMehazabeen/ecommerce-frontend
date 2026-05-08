// ── Firebase Setup ──
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ── Firebase Config ──
const firebaseConfig = {
    apiKey: "AIzaSyAuXQP5kS2SOGOWbDXnMs33T742D7T1rpA",
    authDomain: "shopeasy-3dff9.firebaseapp.com",
    projectId: "shopeasy-3dff9",
    storageBucket: "shopeasy-3dff9.firebasestorage.app",
    messagingSenderId: "114604906291",
    appId: "1:114604906291:web:d3af7c87a1848a8b301046"
};

// ── Initialize Firebase ──
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── Cart Count ──
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
document.querySelector('.cart-badge').textContent = cartCount;

// ── Check Auth State ──
onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
        localStorage.setItem('userEmail', user.email);
    }
});

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

// ── Toggle Password ──
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

// ── Handle Signup ──
async function handleSignup() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    const terms = document.getElementById('terms');
    const btn = document.querySelector('#signup-form .auth-submit-btn');

    // Reset errors
    document.getElementById('signup-name-error').textContent = '';
    document.getElementById('signup-email-error').textContent = '';
    document.getElementById('signup-password-error').textContent = '';
    document.getElementById('signup-confirm-error').textContent = '';
    document.getElementById('terms-error').textContent = '';

    // Validate
    let valid = true;

    if (name.length < 3) {
        document.getElementById('signup-name-error').textContent = 'Name must be at least 3 characters';
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('signup-email-error').textContent = 'Enter a valid email';
        valid = false;
    }

    if (password.length < 8) {
        document.getElementById('signup-password-error').textContent = 'Password must be at least 8 characters';
        valid = false;
    }

    if (password !== confirm) {
        document.getElementById('signup-confirm-error').textContent = 'Passwords do not match';
        valid = false;
    }

    if (!terms.checked) {
        document.getElementById('terms-error').textContent = 'Please accept terms & conditions';
        valid = false;
    }

    if (!valid) return;

    try {
        btn.textContent = '⏳ Creating Account...';
        btn.disabled = true;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, { displayName: name });

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        btn.textContent = '✅ Account Created!';
        btn.style.background = '#28a745';

        showToast('success', 'Welcome!', 'Account created! Welcome ' + name + '!');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.log('Firebase Error Code:', error.code);
        console.log('Firebase Error Message:', error.message);
        btn.textContent = 'Create Account';
        btn.disabled = false;
        btn.style.background = '#e94560';

        let errorMessage = 'Signup failed. Try again.';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Email already registered. Please login!';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password is too weak';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address';
        }
        document.getElementById('signup-email-error').textContent = errorMessage;
    }
}

// ── Handle Login ──
async function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const btn = document.querySelector('#login-form .auth-submit-btn');

    // Reset errors
    document.getElementById('login-email-error').textContent = '';
    document.getElementById('login-password-error').textContent = '';

    // Validate
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        document.getElementById('login-email-error').textContent = 'Enter a valid email';
        valid = false;
    }

    if (password.length < 8) {
        document.getElementById('login-password-error').textContent = 'Password must be at least 8 characters';
        valid = false;
    }

    if (!valid) return;

    try {
        btn.textContent = '⏳ Logging in...';
        btn.disabled = true;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.displayName || email.split('@')[0]);
        localStorage.setItem('userEmail', email);

        btn.textContent = '✅ Login Successful!';
        btn.style.background = '#28a745';

        showToast('success', 'Welcome Back!', 'Login successful! Redirecting...');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        btn.textContent = 'Login';
        btn.disabled = false;
        btn.style.background = '#e94560';

        let errorMessage = 'Login failed. Try again.';
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address';
        } else if (error.code === 'auth/invalid-credential') {
            errorMessage = 'Invalid email or password';
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Too many attempts. Try again later';
        }
        document.getElementById('login-password-error').textContent = errorMessage;
    }
}

// ── Password Strength ──
function validateSignupPassword() {
    const val = document.getElementById('signup-password').value;
    const strengthDiv = document.getElementById('password-strength');
    strengthDiv.style.display = val.length > 0 ? 'flex' : 'none';

    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const bars = ['bar1', 'bar2', 'bar3', 'bar4'];
    const classes = ['weak', 'fair', 'good', 'strong'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#e94560', '#ffc107', '#17a2b8', '#28a745'];
    const strengthText = document.getElementById('strength-text');

    bars.forEach((barId, index) => {
        const bar = document.getElementById(barId);
        bar.className = 'bar';
        if (index < strength) bar.classList.add(classes[strength - 1]);
    });

    if (val.length > 0) {
        strengthText.textContent = labels[strength - 1] || 'Weak';
        strengthText.style.color = colors[strength - 1] || '#e94560';
    }
}

// ── Toast ──
function showToast(type, title, message) {
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-text').textContent = message;
    const toast = document.getElementById('toast');
    const icon = toast.querySelector('.toast-icon i');
    if (type === 'error') {
        toast.classList.add('error');
        icon.className = 'fas fa-times-circle';
    } else {
        toast.classList.remove('error');
        icon.className = 'fas fa-check-circle';
    }
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

// ── Make All Functions Global ──
// ── Make All Functions Global ──
window.showForm = showForm;
window.togglePassword = togglePassword;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.closeToast = closeToast;

// ── Validation Functions (Global) ──
window.validateName = function() {
    const name = document.getElementById('signup-name');
    const error = document.getElementById('signup-name-error');
    if (name.value.trim().length < 3) {
        error.textContent = 'Name must be at least 3 characters';
        name.classList.add('error');
        name.classList.remove('success');
        return false;
    }
    error.textContent = '';
    name.classList.remove('error');
    name.classList.add('success');
    return true;
};

window.validateSignupEmail = function() {
    const email = document.getElementById('signup-email');
    const error = document.getElementById('signup-email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        error.textContent = 'Enter a valid email';
        email.classList.add('error');
        email.classList.remove('success');
        return false;
    }
    error.textContent = '';
    email.classList.remove('error');
    email.classList.add('success');
    return true;
};

window.validateLoginEmail = function() {
    const email = document.getElementById('login-email');
    const error = document.getElementById('login-email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        error.textContent = 'Enter a valid email';
        email.classList.add('error');
        email.classList.remove('success');
        return false;
    }
    error.textContent = '';
    email.classList.remove('error');
    email.classList.add('success');
    return true;
};

window.validateLoginPassword = function() {
    const password = document.getElementById('login-password');
    const error = document.getElementById('login-password-error');
    if (password.value.length < 8) {
        error.textContent = 'Password must be at least 8 characters';
        password.classList.add('error');
        password.classList.remove('success');
        return false;
    }
    error.textContent = '';
    password.classList.remove('error');
    password.classList.add('success');
    return true;
};

window.validateSignupPassword = function() {
    const val = document.getElementById('signup-password').value;
    const error = document.getElementById('signup-password-error');
    const strengthDiv = document.getElementById('password-strength');
    strengthDiv.style.display = val.length > 0 ? 'flex' : 'none';

    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const bars = ['bar1', 'bar2', 'bar3', 'bar4'];
    const classes = ['weak', 'fair', 'good', 'strong'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#e94560', '#ffc107', '#17a2b8', '#28a745'];
    const strengthText = document.getElementById('strength-text');

    bars.forEach((barId, index) => {
        const bar = document.getElementById(barId);
        bar.className = 'bar';
        if (index < strength) bar.classList.add(classes[strength - 1]);
    });

    if (val.length > 0) {
        strengthText.textContent = labels[strength - 1] || 'Weak';
        strengthText.style.color = colors[strength - 1] || '#e94560';
    }

    if (val.length < 8) {
        error.textContent = 'At least 8 characters required';
        document.getElementById('signup-password').classList.add('error');
        return false;
    } else if (!/[A-Z]/.test(val)) {
        error.textContent = 'Add at least one uppercase letter';
        document.getElementById('signup-password').classList.add('error');
        return false;
    } else if (!/[0-9]/.test(val)) {
        error.textContent = 'Add at least one number';
        document.getElementById('signup-password').classList.add('error');
        return false;
    }
    error.textContent = '';
    document.getElementById('signup-password').classList.remove('error');
    document.getElementById('signup-password').classList.add('success');
    return true;
};

window.validateConfirmPassword = function() {
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm');
    const error = document.getElementById('signup-confirm-error');
    if (confirm.value !== password) {
        error.textContent = 'Passwords do not match';
        error.style.color = '#e94560';
        confirm.classList.add('error');
        confirm.classList.remove('success');
        return false;
    }
    error.textContent = '✅ Passwords match';
    error.style.color = '#28a745';
    confirm.classList.remove('error');
    confirm.classList.add('success');
    return true;
};