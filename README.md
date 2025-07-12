# Number System Converter

A powerful web application for converting between different number systems, including Binary, Decimal, Hexadecimal, and Octal. Built with modern HTML, CSS, and JavaScript, featuring a clean, responsive design.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://hrk84ya.github.io/B2D/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

- **Multiple Number Systems**: Convert between Binary, Decimal, Hexadecimal, and Octal
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

- **Binary to Decimal**: `1010` → `10`
- **Decimal to Hex**: `255` → `0xFF`
- **Hex to Octal**: `0xFF` → `0o377`
- **Octal to Binary**: `0o377` → `0b11111111`

## 🛠️ How It Works

The converter uses JavaScript's built-in `BigInt` for handling large numbers and implements custom validation for each number system:

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

