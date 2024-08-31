document.getElementById('converterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const binaryInput = document.getElementById('binaryInput').value;
    const binaryError = document.getElementById('binaryError');
    const decimalOutput = document.getElementById('decimalOutput');

    // Clear previous error messages
    binaryError.textContent = '';

    // Validate input
    if (!/^[01]+$/.test(binaryInput)) {
        binaryError.textContent = 'Invalid input. Only 0 and 1 are allowed.';
        decimalOutput.value = '';
        return;
    }

    // Convert binary to decimal
    const decimalValue = parseInt(binaryInput, 2);
    decimalOutput.value = decimalValue;
});
