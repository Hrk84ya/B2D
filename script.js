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

    // Roman numeral helper functions
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    // Convert decimal to Roman numerals
    function decimalToRoman(num) {
        if (num <= 0 || num > 3999) {
            throw new Error('Roman numerals must be between 1 and 3999');
        }
        
        let result = '';
        let remaining = num;
        
        for (const item of romanNumerals) {
            while (remaining >= item.value) {
                result += item.numeral;
                remaining -= item.value;
            }
        }
        
        return result;
    }

    // Convert Roman numerals to decimal
    function romanToDecimal(roman) {
        const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let result = 0;
        
        // Convert to uppercase and validate
        const str = roman.toUpperCase();
        if (!/^[IVXLCDM]+$/i.test(roman)) {
            throw new Error('Invalid Roman numeral');
        }
        
        for (let i = 0; i < str.length; i++) {
            const current = romanMap[str[i]];
            const next = romanMap[str[i + 1]];
            
            if (next && current < next) {
                result += next - current;
                i++; // Skip next character as it's already processed
            } else {
                result += current;
            }
        }
        
        // Validate the result by converting back to Roman and comparing
        if (decimalToRoman(result) !== str) {
            throw new Error('Invalid Roman numeral format');
        }
        
        return result;
    }

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
        },
        roman: {
            name: 'Roman',
            base: 'roman',
            prefix: '',
            pattern: /^[IVXLCDM]+$/i,
            error: 'Please enter a valid Roman numeral (I, V, X, L, C, D, M)'
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
        if (type === 'roman') {
            inputField.placeholder = 'Enter Roman numeral (I, V, X, L, C, D, M)';
        } else {
            inputField.placeholder = `Enter ${system.name.toLowerCase()} number${system.prefix ? ` (${system.prefix}...)` : ''}`;
        }
    }

    // Update convert button text based on conversion
    function updateConvertButtonText() {
        const fromType = inputType.value === 'roman' ? 'Roman' : numberSystems[inputType.value].name;
        const toType = outputType.value === 'roman' ? 'Roman' : numberSystems[outputType.value].name;
        convertButton.textContent = `Convert ${fromType} to ${toType}`;
    }

    // Validate input based on selected number system
    function validateInput(value) {
        const type = inputType.value;
        const system = numberSystems[type];
        
        // For Roman numerals, we don't need to remove any prefix
        if (type === 'roman') {
            if (!system.pattern.test(value)) {
                errorElement.textContent = system.error;
                return false;
            }
            
            // Additional validation for Roman numerals
            try {
                const decimal = romanToDecimal(value);
                if (decimal > 3999) {
                    errorElement.textContent = 'Roman numerals must be between I (1) and MMMCMXCIX (3999)';
                    return false;
                }
            } catch (error) {
                errorElement.textContent = error.message || 'Invalid Roman numeral';
                return false;
            }
            
            errorElement.textContent = '';
            return true;
        }
        
        // For other number systems, remove any prefix for validation
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

    // Function to show bit positions with visual indicators
    function showBitPositions(binaryStr, elementId) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';
        
        // Create bit elements
        for (let i = 0; i < binaryStr.length; i++) {
            const bit = document.createElement('div');
            bit.className = `bit ${binaryStr[i] === '1' ? 'active' : ''} bit-${binaryStr[i]}`;
            bit.textContent = binaryStr[i];
            bit.dataset.value = `2^${binaryStr.length - 1 - i}`;
            container.appendChild(bit);
        }
    }

    // Function to convert a number from one base to another with step tracking
    function convertNumber(value, fromBase, toBase) {
        // Reset steps
        const steps = [];
        let decimalValue = 0n;
        
        // Special case: Roman to Roman (just validate and return)
        if (fromBase === 'roman' && toBase === 'roman') {
            const decimal = romanToDecimal(value);
            document.getElementById('decimalCalculation').textContent = 
                `${value} = ${decimal} (decimal)`;
            document.getElementById('targetCalculation').textContent = 
                `= ${value} (Roman)`;
            document.getElementById('outputBits').textContent = value;
            return value;
        }
        
        // Step 1: Convert from input base to decimal
        if (fromBase === 'roman') {
            // Convert Roman to decimal
            decimalValue = BigInt(romanToDecimal(value));
            document.getElementById('inputBits').textContent = value;
            document.getElementById('decimalCalculation').textContent = 
                `${value} = ${decimalValue} (decimal)`;
        } else if (fromBase !== 10) {
            let binaryStr = value;
            if (fromBase === 16) binaryStr = value.replace(/^0x/i, '');
            if (fromBase === 8) binaryStr = value.replace(/^0o/i, '');
            if (fromBase === 2) binaryStr = value.replace(/^0b/i, '');
            
            // Show bit positions for binary input
            if (fromBase === 2) {
                showBitPositions(binaryStr, 'inputBits');
            } else {
                document.getElementById('inputBits').innerHTML = '';
                document.getElementById('inputBits').textContent = `${value} (base ${fromBase})`;
            }
            
            // Convert to decimal
            decimalValue = BigInt('0x' + (fromBase === 2 ? binaryStr : 
                                      fromBase === 8 ? parseInt(binaryStr, 8).toString(16) : 
                                      fromBase === 16 ? binaryStr : value));
            
            // Show decimal conversion steps
            if (fromBase === 2) {
                const bitValues = [];
                let position = 0;
                for (let i = binaryStr.length - 1; i >= 0; i--) {
                    const bit = binaryStr[i];
                    const power = BigInt(2) ** BigInt(position);
                    bitValues.unshift(`(${bit} × 2^${position} = ${bit * power})`);
                    position++;
                }
                document.getElementById('decimalCalculation').textContent = 
                    `${binaryStr} = ${bitValues.join(' + ')} = ${decimalValue} (decimal)`;
            } else {
                document.getElementById('decimalCalculation').textContent = 
                    `${value} (base ${fromBase}) = ${decimalValue} (decimal)`;
            }
        } else {
            decimalValue = BigInt(value);
            document.getElementById('inputBits').textContent = value;
            document.getElementById('decimalCalculation').textContent = 
                `${value} (decimal)`;
        }
        
        // Step 2: Convert from decimal to target base
        let result = '';
        if (toBase === 'roman') {
            // Convert decimal to Roman
            try {
                result = decimalToRoman(Number(decimalValue));
                document.getElementById('targetCalculation').textContent = 
                    `= ${result} (Roman)`;
                document.getElementById('outputBits').textContent = result;
            } catch (error) {
                throw new Error('Number must be between 1 and 3999 for Roman numeral conversion');
            }
        } else if (toBase === 10) {
            result = decimalValue.toString();
            document.getElementById('targetCalculation').textContent = 
                `= ${result} (decimal)`;
        } else {
            let tempValue = decimalValue;
            const digits = [];
            
            // Special handling for binary output to show bit positions
            if (toBase === 2) {
                result = '0b' + decimalValue.toString(2);
                const binaryStr = decimalValue.toString(2);
                showBitPositions(binaryStr, 'outputBits');
                
                // Show conversion steps
                let step = `${decimalValue} ÷ 2 = `;
                let steps = [];
                let val = decimalValue;
                while (val > 0) {
                    const remainder = val % 2n;
                    steps.unshift(`${val} ÷ 2 = ${val / 2n} remainder ${remainder}`);
                    val = val / 2n;
                }
                document.getElementById('targetCalculation').textContent = 
                    steps.join('\n');
            } else {
                result = toBase === 16 ? '0x' + decimalValue.toString(16).toUpperCase() :
                         toBase === 8 ? '0o' + decimalValue.toString(8) :
                         decimalValue.toString(toBase);
                document.getElementById('targetCalculation').textContent = 
                    `= ${result} (base ${toBase})`;
                document.getElementById('outputBits').textContent = result;
            }
        }
        
        return result;
    }

    // Convert between number systems
    function convert() {
        // Clear any previous error messages and steps
        errorElement.textContent = '';
        document.getElementById('decimalCalculation').textContent = '';
        document.getElementById('targetCalculation').textContent = '';
        
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
            
            const result = convertNumber(inputValue, fromSystem.base, toSystem.base);
            
            outputField.value = result;
        } catch (error) {
            console.error('Conversion error:', error);
            errorElement.textContent = 'An error occurred during conversion. Please check your input.';
            outputField.value = '';
        }
    }
});
