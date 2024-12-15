document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const quantityInput = product.querySelector('input[type="number"]');
        const priceElement = product.querySelector('.price');
        
        // Extract the base price and unit
        const priceText = priceElement.textContent;
        const [basePrice, unit] = priceText.split('/');
        const numericPrice = parseFloat(basePrice.replace('$', ''));

        // Add event listener to quantity input
        quantityInput.addEventListener('input', () => {
            const quantity = parseInt(quantityInput.value) || 1;
            const totalPrice = (numericPrice * quantity).toFixed(2);
            priceElement.textContent = `$${totalPrice}/${unit}`;
        });
    });
});

