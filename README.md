# Number System Converter

A powerful web application for converting between different number systems, including Binary, Decimal, Hexadecimal, and Octal. Built with modern HTML, CSS, and JavaScript, featuring a clean, responsive design.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://hrk84ya.github.io/B2D/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

- **Multiple Number Systems**: Convert between Binary, Decimal, Hexadecimal, Octal, and Roman Numerals
- **Step-by-Step Conversion**: Visualize the complete conversion process
- **Bit Position Visualization**: See binary bit positions and their values
- **Bidirectional Conversion**: Easily swap between input and output number systems
- **Real-time Conversion**: See results update as you type
- **Input Validation**: Smart validation with helpful error messages
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Copy to Clipboard**: One-click copy for quick results
- **Clean UI**: Modern, intuitive interface with smooth animations

## 🚀 Quick Start

1. **Select Input Type**: Choose your input number system from the first dropdown
2. **Enter Number**: Type or paste your number in the input field
3. **Select Output Type**: Choose the desired output number system
4. **View Result**: The converted number appears instantly
5. **Copy or Swap**: Copy the result or swap input/output with a single click

## 🎯 Examples

### Basic Conversions
- **Binary to Decimal**: `1010` → `10`
- **Decimal to Hex**: `255` → `0xFF`
- **Hex to Octal**: `0xFF` → `0o377`
- **Octal to Binary**: `0o377` → `0b11111111`
- **Decimal to Roman**: `42` → `XLII`
- **Roman to Binary**: `MMXXIII` → `0b11111100111` (2023)

### Step-by-Step Example: Binary to Decimal
```
Input: 1010 (binary)

Step 1: Convert to Decimal
1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10

Result: 10 (decimal)
```

### Bit Position Example: 1101 (binary)
```
Bit:   1   1   0   1
Pos:  3  2  1  0
Val:  8  4  2  1

Calculation: 8 + 4 + 0 + 1 = 13 (decimal)
```

## 🛠️ How It Works

### Conversion Process

1. **Input Validation**: The input is validated based on the selected number system
2. **Step-by-Step Conversion**:
   - Input value is displayed with bit visualization for binary
   - Conversion to decimal with detailed calculation steps
   - Final conversion to target base with explanation
3. **Result Display**: The final converted value is shown with proper formatting

### Bit Position Visualization

For binary conversions, each bit is displayed with its positional value (2^n):

```
Bit:   1   0   1   1   0   1   0   1
Pos:  7  6  5  4  3  2  1  0
Val: 128 64 32 16  8  4  2  1
```

### Technical Implementation

The converter uses JavaScript's built-in `BigInt` for handling large numbers and implements:
- Custom validation for each number system
- Real-time conversion with debouncing
- Responsive bit visualization
- Cross-browser compatibility

```javascript
// Example conversion function
function convertNumber(value, fromBase, toBase) {
    const decimalValue = BigInt('0' + value);
    return decimalValue.toString(toBase);
}
```

## 📱 Responsive Design

- **Mobile-first** approach ensures great experience on all devices
- Adaptive layout that works on screens of any size
- Touch-friendly controls for mobile users

## 🎨 UI/UX Features

- Clean, modern interface with a professional color scheme
- Visual feedback for all interactions
- Clear error messages with helpful guidance
- Smooth animations and transitions

## 🧪 Testing

Tested with various edge cases including:
- Large numbers (handled with BigInt)
- Different input formats (with/without prefixes)
- Invalid inputs (shows appropriate error messages)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

