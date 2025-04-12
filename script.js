var swiper = new Swiper(".review-slider", {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1020: { slidesPerView: 3 },
    },
});

// Cart functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize cart if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Update cart count on page load
    updateCartCount();

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.btn');
    addToCartButtons.forEach(button => {
        if (button.textContent.trim() === 'Add to Cart') {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Get product card element
                const productCard = this.closest('.box');

                // Get product details
                const productName = productCard.querySelector('h2').textContent;
                const productPriceText = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('img').src;

                // Extract numeric price value
                let priceValue = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));
                // priceValue = priceValue * 100;


                // Check if product already exists in cart
                const cart = JSON.parse(localStorage.getItem('cart'));
                const existingItemIndex = cart.findIndex(item => item.name === productName);

                if (existingItemIndex >= 0) {
                    // If exists, increase quantity
                    cart[existingItemIndex].quantity += 1;
                } else {
                    // If new, add to cart
                    cart.push({
                        name: productName,
                        price: priceValue,
                        image: productImage,
                        quantity: 1
                    });
                }

                // Save to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Update cart count
                updateCartCount();

                // Show success message
                alert(`${productName} added to cart!`);
            });
        }
    });
});

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Modal functions (keep your existing modal functions)
// ... rest of your modal code ...


function showQuantityControls(button) {
    // Hide the add to cart button
    button.style.display = 'none';

    // Create quantity controls
    const quantityControls = document.createElement('div');
    quantityControls.className = 'product-quantity';
    quantityControls.innerHTML = `
        <button onclick="decreaseQuantity(this)">-</button>
        <span>1</span>
        <button onclick="increaseQuantity(this)">+</button>
    `;

    // Insert after the button
    button.parentNode.insertBefore(quantityControls, button.nextSibling);
    quantityControls.style.display = 'flex';
}

function increaseQuantity(element) {
    const quantityElement = element.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;

    // You may want to update the cart here as well
    // updateCartWithNewQuantity(...);
}

function decreaseQuantity(element) {
    const quantityElement = element.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent);

    if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
        // updateCartWithNewQuantity(...);
    } else {
        // If quantity reaches 0, show the Add to Cart button again
        const quantityControls = element.parentNode;
        const addButton = quantityControls.previousElementSibling;

        addButton.style.display = 'block';
        quantityControls.remove();
    }
}