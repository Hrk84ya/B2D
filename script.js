document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('converterForm');
    const inputField = document.getElementById('inputValue');
    const outputField = document.getElementById('outputValue');
    const errorElement = document.getElementById('inputError');
    const inputType = document.getElementById('inputType');
    const outputType = document.getElementById('outputType');
    const swapButton = document.getElementById('swapButton');
    const clearButton = document.getElementById('clearInput');
    const copyButton = document.getElementById('copyOutput');
    const convertButton = document.getElementById('convertButton');

    // Number system configurations
    const numberSystems = {
        binary: {
            name: 'Binary',
            base: 2,
            prefix: '0b',
            pattern: /^[01]+$/,
            error: 'Please enter a valid binary number (0-1)'
        },
        decimal: {
            name: 'Decimal',
            base: 10,
            prefix: '',
            pattern: /^\d+$/,
            error: 'Please enter a valid decimal number (0-9)'
        },
        hex: {
            name: 'Hexadecimal',
            base: 16,
            prefix: '0x',
            pattern: /^[0-9a-fA-F]+$/,
            error: 'Please enter a valid hexadecimal number (0-9, A-F)'
        },
        octal: {
            name: 'Octal',
            base: 8,
            prefix: '0o',
            pattern: /^[0-7]+$/,
            error: 'Please enter a valid octal number (0-7)'
        }
    };

    // Initialize the application
    init();

    // Event Listeners
    form.addEventListener('submit', handleConversion);
    inputType.addEventListener('change', handleInputChange);
    outputType.addEventListener('change', handleInputChange);
    swapButton.addEventListener('click', swapConversion);
    clearButton.addEventListener('click', clearInput);
    copyButton.addEventListener('click', copyToClipboard);
    inputField.addEventListener('input', handleInput);
    inputField.addEventListener('keydown', handleKeyDown);

    // Initialize the application
    function init() {
        updatePlaceholder();
        updateConvertButtonText();
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

    // Handle input type changes
    function handleInputChange() {
        // Clear previous results
        inputField.value = '';
        outputField.value = '';
        errorElement.textContent = '';
        
        // Update UI
        updatePlaceholder();
        updateConvertButtonText();
        inputField.focus();
    }

    // Swap input and output types
    function swapConversion() {
        const tempType = inputType.value;
        inputType.value = outputType.value;
        outputType.value = tempType;
        
        // Swap values if they exist
        if (outputField.value) {
            inputField.value = outputField.value;
            convert();
        } else {
            inputField.value = '';
            outputField.value = '';
        }
        
        // Update UI
        updatePlaceholder();
        updateConvertButtonText();
        inputField.focus();
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
            const originalIcon = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.style.color = 'var(--success-color)';
            
            setTimeout(() => {
                copyButton.innerHTML = originalIcon;
                copyButton.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            errorElement.textContent = 'Failed to copy to clipboard';
        });
    }

    // Handle Enter key in input field
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            convert();
        }
    }

    // Update input placeholder based on selected type
    function updatePlaceholder() {
        const type = inputType.value;
        const system = numberSystems[type];
        inputField.placeholder = `Enter ${system.name.toLowerCase()} number${system.prefix ? ` (${system.prefix}...)` : ''}`;
    }

    // Update convert button text based on conversion
    function updateConvertButtonText() {
        const fromType = numberSystems[inputType.value].name;
        const toType = numberSystems[outputType.value].name;
        convertButton.textContent = `Convert ${fromType} to ${toType}`;
    }

    // Validate input based on selected number system
    function validateInput(value) {
        const type = inputType.value;
        const system = numberSystems[type];
        
        // Remove any prefix for validation
        const cleanValue = value.replace(new RegExp(`^${system.prefix}`, 'i'), '');
        
        if (cleanValue === '') {
            errorElement.textContent = 'Please enter a value';
            return false;
        }
        
        if (!system.pattern.test(cleanValue)) {
            errorElement.textContent = system.error;
            return false;
        }
        
        // Additional validation for decimal numbers to prevent overflow
        if (type === 'decimal' && BigInt(cleanValue) > Number.MAX_SAFE_INTEGER) {
            errorElement.textContent = 'Number is too large. Please enter a smaller number.';
            return false;
        }
        
        errorElement.textContent = '';
        return true;
    }

    // Convert between number systems
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
            const fromType = inputType.value;
            const toType = outputType.value;
            const fromSystem = numberSystems[fromType];
            const toSystem = numberSystems[toType];
            
            // Remove prefix if present
            const cleanInput = inputValue.replace(new RegExp(`^${fromSystem.prefix}`, 'i'), '');
            
            // Convert to decimal first
            let decimalValue;
            if (fromType === 'decimal') {
                decimalValue = BigInt(cleanInput);
            } else {
                decimalValue = BigInt('0' + fromSystem.prefix + cleanInput);
            }
            
            // Convert from decimal to target system
            let result;
            if (toType === 'decimal') {
                result = decimalValue.toString();
            } else {
                result = toSystem.prefix + decimalValue.toString(toSystem.base);
            }
            
            // Convert to uppercase for hex output
            if (toType === 'hex') {
                result = result.toUpperCase();
            }
            
            outputField.value = result;
        } catch (error) {
            console.error('Conversion error:', error);
            errorElement.textContent = 'An error occurred during conversion. Please check your input.';
            outputField.value = '';
        }
    }
});
