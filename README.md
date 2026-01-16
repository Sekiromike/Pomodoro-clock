# Zen Focus Timer 🧘

A minimal, beautiful, and distraction-free study timer for Windows. Built with **Electron**, **React**, and **Vite**.

![Zen Focus Timer UI](https://via.placeholder.com/800x450/1a1a1a/00bcd4?text=Zen+Focus+Timer+Preview) 
*(Replace with actual screenshot)*

## ✨ Features

- **Distraction-Free UI**: Clean, dark-mode interface with large typography.
- **Visual Timer**: Elegant SVG progress ring with a subtle "breathing" animation.
- **Ambient Sound**: Built-in Brown Noise generator to mask distractions (no external assets required).
- **Smart Transitions**: Automatically switches between **Focus** and **Break** modes.
- **Custom Controls**: Frameless window with custom Minimize, Fullscreen, and Close buttons.
- **Native Experience**: Runs locally on your desktop.

## 🚀 Getting Started

### Prerequisites
- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/zen-focus-timer.git
    cd zen-focus-timer
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

### Running Locally
To start the application in development mode (with hot-reload):

```bash
npm run dev
```
*This handles both the React dev server and the Electron main process concurrently.*

### Building for Production
To create a strictly local production build (Win/Mac/Linux):

```bash
npm run build
```
The output will be in the `dist` or `release` folder (depending on builder config).

## 🛠️ Tech Stack
- **Electron**: Desktop wrapper
- **React**: UI Library
- **Vite**: Super-fast tooling
- **Web Audio API**: For procedural ambient noise generation

## ⌨️ Controls
- **Start/Pause**: Toggle the timer.
- **Settings (Gear Icon)**: Customize durations and toggle ambient sound.
- **Fullscreen (□)**: Enter deep focus mode.

## 📄 License
MIT
