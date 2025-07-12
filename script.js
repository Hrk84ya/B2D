document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('converterForm');
    const inputField = document.getElementById('inputValue');
    const outputField = document.getElementById('outputValue');
    const errorElement = document.getElementById('inputError');
    const toggle = document.getElementById('conversionMode');
    const inputLabel = document.getElementById('inputLabel');
    const outputLabel = document.getElementById('outputLabel');
    const clearButton = document.getElementById('clearInput');
    const copyButton = document.getElementById('copyOutput');
    const convertButton = document.getElementById('convertButton');

    // Initialize the UI
    updateUILabels();

    // Event Listeners
    toggle.addEventListener('change', toggleConversionMode);
    form.addEventListener('submit', handleConversion);
    clearButton.addEventListener('click', clearInput);
    copyButton.addEventListener('click', copyToClipboard);
    inputField.addEventListener('input', handleInput);
    inputField.addEventListener('keydown', handleKeyDown);

    // Toggle between binary and decimal conversion
    function toggleConversionMode() {
        // Clear all fields when toggling
        inputField.value = '';
        outputField.value = '';
        errorElement.textContent = '';
        updateUILabels();
        inputField.focus();
    }

    // Update UI labels based on conversion mode
    function updateUILabels() {
        const isBinaryToDecimal = !toggle.checked;
        inputLabel.textContent = isBinaryToDecimal ? 'Binary Input:' : 'Decimal Input:';
        outputLabel.textContent = isBinaryToDecimal ? 'Decimal Output:' : 'Binary Output:';
        inputField.placeholder = isBinaryToDecimal 
            ? 'Enter binary number (0-1)' 
            : 'Enter decimal number';
        convertButton.textContent = isBinaryToDecimal 
            ? 'Convert to Decimal' 
            : 'Convert to Binary';
    }

    // Handle form submission
    function handleConversion(e) {
        e.preventDefault();
        convert();
    }

    // Handle input changes for real-time conversion
    function handleInput() {
        if (inputField.value.trim() === '') {
            outputField.value = '';
            errorElement.textContent = '';
            return;
        }
        
        // Only auto-convert for valid inputs
        const isValid = validateInput(inputField.value);
        if (isValid) {
            convert();
        }
    }

    // Handle Enter key in input field
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            convert();
        }
    }

    // Clear input field
    function clearInput() {
        inputField.value = '';
        outputField.value = '';
        errorElement.textContent = '';
        inputField.focus();
    }

    // Copy output to clipboard
    function copyToClipboard() {
        if (!outputField.value) return;
        
        navigator.clipboard.writeText(outputField.value).then(() => {
            // Visual feedback
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.style.color = 'var(--primary-color)';
            
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    // Validate input based on conversion mode
    function validateInput(value) {
        const isBinaryToDecimal = !toggle.checked;
        
        if (value === '') {
            errorElement.textContent = 'Please enter a value';
            return false;
        }
        
        if (isBinaryToDecimal) {
            // Validate binary input (only 0s and 1s)
            if (!/^[01]+$/.test(value)) {
                errorElement.textContent = 'Invalid binary number. Only 0 and 1 are allowed.';
                return false;
            }
        } else {
            // Validate decimal input (only digits)
            if (!/^\d+$/.test(value)) {
                errorElement.textContent = 'Invalid decimal number. Only digits 0-9 are allowed.';
                return false;
            }
            
            // Check if the number is too large
            if (BigInt(value) > Number.MAX_SAFE_INTEGER) {
                errorElement.textContent = 'Number is too large. Please enter a smaller number.';
                return false;
            }
        }
        
        errorElement.textContent = '';
        return true;
    }

    // Perform the conversion
    function convert() {
        const inputValue = inputField.value.trim();
        
        if (inputValue === '') {
            outputField.value = '';
            errorElement.textContent = 'Please enter a value';
            return;
        }
        
        if (!validateInput(inputValue)) {
            outputField.value = '';
            return;
        }
        
        try {
            const isBinaryToDecimal = !toggle.checked;
            
            if (isBinaryToDecimal) {
                // Binary to Decimal conversion
                const decimalValue = parseInt(inputValue, 2);
                outputField.value = decimalValue.toString();
            } else {
                // Decimal to Binary conversion
                const decimalValue = BigInt(inputValue);
                outputField.value = decimalValue.toString(2);
            }
        } catch (error) {
            console.error('Conversion error:', error);
            errorElement.textContent = 'An error occurred during conversion. Please try again.';
            outputField.value = '';
        }
    }
});
