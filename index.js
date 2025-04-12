
// Toggle search box visibility
function toggleSearch() {
    const box = document.getElementById("searchBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
}

// Open modal based on type
function openModal(type) {
    closeAllModals();
    if (type === 'login') {
        document.getElementById("loginModal").style.display = "block";
    } else if (type === 'signup') {
        document.getElementById("signupModal").style.display = "block";
    } else if (type === 'forgot') {
        document.getElementById("forgotPasswordModal").style.display = "block";
    }
}

// Close all modals
function closeModal() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("signupModal").style.display = "none";
    document.getElementById("forgotPasswordModal").style.display = "none";

    // Reset forms
    resetForm('login');
    resetForm('signup');
    resetForm('forgot');
}

function closeAllModals() {
    closeModal();
}

// Close modal on outside click
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
};

// Toggle password visibility
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Switch to signup form
function switchToSignup() {
    closeModal();
    openModal('signup');
}

// Switch to login form
function switchToLogin() {
    closeModal();
    openModal('login');
}

// Show forgot password modal
function showForgotPassword() {
    closeModal();
    openModal('forgot');
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
    return false;
}

// Hide error message
function hideError(elementId) {
    document.getElementById(elementId).style.display = 'none';
    return true;
}

// Reset form
function resetForm(type) {
    if (type === 'login') {
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        hideError('emailError');
        hideError('passwordError');
        document.getElementById('loginBtnText').textContent = 'Login';
        document.getElementById('loginBtn').disabled = false;
    } else if (type === 'signup') {
        document.getElementById('signupName').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('termsAgreement').checked = false;
        hideError('nameError');
        hideError('signupEmailError');
        hideError('signupPasswordError');
        hideError('confirmPasswordError');
        hideError('termsError');
        document.getElementById('signupBtnText').textContent = 'Create Account';
        document.getElementById('signupBtn').disabled = false;
    } else if (type === 'forgot') {
        document.getElementById('resetEmail').value = '';
        hideError('resetEmailError');
        document.getElementById('resetBtnText').textContent = 'Send Reset Link';
        document.getElementById('resetBtn').disabled = false;
    }
}

// Show success message
function showSuccess(modalType, message) {
    let elementId;
    if (modalType === 'login') {
        elementId = 'successMessage';
    } else if (modalType === 'signup') {
        elementId = 'signupSuccessMessage';
    }

    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';

    // Hide after 3 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Handle login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const btn = document.getElementById('loginBtn');
    const btnText = document.getElementById('loginBtnText');

    // Validate inputs
    let isValid = true;

    if (!email) {
        isValid = showError('emailError', 'Email is required');
    } else if (!validateEmail(email)) {
        isValid = showError('emailError', 'Please enter a valid email');
    } else {
        isValid = hideError('emailError');
    }

    if (!password) {
        isValid = showError('passwordError', 'Password is required');
    } else if (password.length < 6) {
        isValid = showError('passwordError', 'Password must be at least 6 characters');
    } else {
        isValid = hideError('passwordError');
    }

    if (!isValid) return;

    // Simulate API call
    btn.disabled = true;
    btnText.innerHTML = '<div class="loading"></div> Logging in...';

    setTimeout(() => {
        // This would be replaced with actual API call in production
        console.log('Login attempt with:', { email, password });

        // Simulate success response
        showSuccess('login', 'Login successful! Redirecting...');
        btnText.textContent = 'Login Successful!';

        // Redirect after delay
        setTimeout(() => {
            closeModal();
            window.location.href = 'profile.html'; // Redirect to profile page
        }, 1500);
    }, 1500);
}

// Handle signup
function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAgreed = document.getElementById('termsAgreement').checked;
    const btn = document.getElementById('signupBtn');
    const btnText = document.getElementById('signupBtnText');

    // Validate inputs
    let isValid = true;

    if (!name) {
        isValid = showError('nameError', 'Name is required');
    } else {
        isValid = hideError('nameError');
    }

    if (!email) {
        isValid = showError('signupEmailError', 'Email is required');
    } else if (!validateEmail(email)) {
        isValid = showError('signupEmailError', 'Please enter a valid email');
    } else {
        isValid = hideError('signupEmailError');
    }

    if (!password) {
        isValid = showError('signupPasswordError', 'Password is required');
    } else if (password.length < 6) {
        isValid = showError('signupPasswordError', 'Password must be at least 6 characters');
    } else {
        isValid = hideError('signupPasswordError');
    }

    if (!confirmPassword) {
        isValid = showError('confirmPasswordError', 'Please confirm your password');
    } else if (password !== confirmPassword) {
        isValid = showError('confirmPasswordError', 'Passwords do not match');
    } else {
        isValid = hideError('confirmPasswordError');
    }

    if (!termsAgreed) {
        isValid = showError('termsError', 'You must agree to the terms');
    } else {
        isValid = hideError('termsError');
    }

    if (!isValid) return;

    // Simulate API call
    btn.disabled = true;
    btnText.innerHTML = '<div class="loading"></div> Creating account...';

    setTimeout(() => {
        // This would be replaced with actual API call in production
        console.log('Signup attempt with:', { name, email, password });

        // Simulate success response
        showSuccess('signup', 'Account created successfully!');
        btnText.textContent = 'Account Created!';

        // Switch to login after delay
        setTimeout(() => {
            switchToLogin();
            document.getElementById('loginEmail').value = email;
            document.getElementById('loginPassword').value = password;
        }, 1500);
    }, 1500);
}

// Handle password reset
function handlePasswordReset() {
    const email = document.getElementById('resetEmail').value;
    const btn = document.getElementById('resetBtn');
    const btnText = document.getElementById('resetBtnText');

    // Validate email
    if (!email) {
        showError('resetEmailError', 'Email is required');
        return;
    } else if (!validateEmail(email)) {
        showError('resetEmailError', 'Please enter a valid email');
        return;
    } else {
        hideError('resetEmailError');
    }

    // Simulate API call
    btn.disabled = true;
    btnText.innerHTML = '<div class="loading"></div> Sending link...';

    setTimeout(() => {
        // This would be replaced with actual API call in production
        console.log('Password reset requested for:', email);

        // Simulate success response
        btnText.textContent = 'Reset Link Sent!';

        // Show message and switch to login
        setTimeout(() => {
            const modalContent = document.querySelector('#forgotPasswordModal .modal-content');
            modalContent.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <i class="fas fa-check-circle" style="font-size: 50px; color: #76c900; margin-bottom: 20px;"></i>
                            <h3 style="color: #333; margin-bottom: 10px;">Password Reset Link Sent</h3>
                            <p style="color: #666; margin-bottom: 25px;">
                                We've sent a password reset link to ${email}. 
                                Please check your inbox and follow the instructions.
                            </p>
                            <button class="auth-btn" onclick="switchToLogin()" style="width: 100%;">
                                Back to Login
                            </button>
                        </div>
                    `;
        }, 1000);
    }, 1500);
}

// Social login handler
function socialLogin(provider) {
    console.log(`Attempting ${provider} login`);
    // In a real app, this would redirect to the provider's OAuth page
    // For demo, we'll just show a message
    alert(`Redirecting to ${provider} login...`);

    // Simulate successful login after delay
    setTimeout(() => {
        closeModal();
        window.location.href = 'profile.html'; // Redirect to profile page
    }, 1000);
}

// Initialize form validation on input
document.addEventListener('DOMContentLoaded', function () {
    // Login form validation
    document.getElementById('loginEmail').addEventListener('input', function () {
        if (!this.value) {
            showError('emailError', 'Email is required');
        } else if (!validateEmail(this.value)) {
            showError('emailError', 'Please enter a valid email');
        } else {
            hideError('emailError');
        }
    });

    document.getElementById('loginPassword').addEventListener('input', function () {
        if (!this.value) {
            showError('passwordError', 'Password is required');
        } else if (this.value.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
        } else {
            hideError('passwordError');
        }
    });

    // Signup form validation
    document.getElementById('signupName').addEventListener('input', function () {
        if (!this.value) {
            showError('nameError', 'Name is required');
        } else {
            hideError('nameError');
        }
    });

    document.getElementById('signupEmail').addEventListener('input', function () {
        if (!this.value) {
            showError('signupEmailError', 'Email is required');
        } else if (!validateEmail(this.value)) {
            showError('signupEmailError', 'Please enter a valid email');
        } else {
            hideError('signupEmailError');
        }
    });

    document.getElementById('signupPassword').addEventListener('input', function () {
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!this.value) {
            showError('signupPasswordError', 'Password is required');
        } else if (this.value.length < 6) {
            showError('signupPasswordError', 'Password must be at least 6 characters');
        } else {
            hideError('signupPasswordError');
        }

        // Also validate confirm password if it has value
        if (confirmPassword && this.value !== confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
        } else if (confirmPassword) {
            hideError('confirmPasswordError');
        }
    });

    document.getElementById('confirmPassword').addEventListener('input', function () {
        const password = document.getElementById('signupPassword').value;

        if (!this.value) {
            showError('confirmPasswordError', 'Please confirm your password');
        } else if (this.value !== password) {
            showError('confirmPasswordError', 'Passwords do not match');
        } else {
            hideError('confirmPasswordError');
        }
    });

    // Forgot password validation
    document.getElementById('resetEmail').addEventListener('input', function () {
        if (!this.value) {
            showError('resetEmailError', 'Email is required');
        } else if (!validateEmail(this.value)) {
            showError('resetEmailError', 'Please enter a valid email');
        } else {
            hideError('resetEmailError');
        }
    });
});