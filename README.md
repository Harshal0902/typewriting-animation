<p align="center">
  <img src="https://user-images.githubusercontent.com/64153988/164770549-f0f5d765-c765-4251-b111-b938212ef7a4.gif" alt="npm version" />
</p>

# typewriting-animation

A customizable and lightweight typewriter animation JavaScript library that allows you to add your own custom characters, control the speed of the animation, control the delay between each character, and control the looping of the animation to decide the type of cursor to use.

<p>
  <a href="https://www.npmjs.com/package/typewriting-animation">
    <img src="https://img.shields.io/npm/v/typewriting-animation?style=flat-square" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/typewriting-animation">
    <img src="https://img.shields.io/npm/dw/typewriting-animation?style=flat-square" alt="npm downloads" />
  </a>
  <a href="https://www.npmjs.com/package/typewriting-animation">
    <img src="https://img.shields.io/bundlephobia/min/typewriting-animation?style=flat-square" alt="size" />
  </a>
    <img src="https://img.shields.io/npm/l/typewriting-animation?style=flat-square" alt="license" />
</p>

- [Features](#features)
- [Build using](#build-using)
- [Getting Started](#getting-started)
  - [NPM](#npm)
- [Usage](#usage)
  - [React](#usage-react)
- [Bug Reporting](#bug-reporting)
- [Feature Request](#feature-request)
- [Release Notes](#release-notes)
- [License](#license)

<a id="features"></a>

## 🚀 Features

Customizable typewriter animation with the following features:

- Add your own custom characters
- Control the speed of the animation
- Control the delay between each character
- Control the looping of the animation
- Decide the type of cursor to use

<a id="build-using"></a>

## ⚙️ Build using

- TypeScript
- npm
- Gulp
- Rollup

<a id="getting-started"></a>

## 📦 Getting Started

<a id="npm"></a>

### NPM

#### Installation

```bash
npm i typewriting-animation
```

<a id="usage"></a>

## 🔨 Usage

<a id="usage-react"></a>

### React

```javascript
import React from 'react';
import { useTypewriterEffect } from 'typewriting-animation';

function App() {
  const {
    typedString,
    selectedString,
  } = useTypewriterEffect(
    [
      "add your own custom characters",
      "control the speed of the animation",
      "control the delay between each character",
      "control the looping of the animation",
      "decide the type of cursor to use",
    ],
    // Otpional for customizing the animation
    {
      speed: 30, // Set your desired animation speed in milliseconds
      delay: 2000, // Set the delay between sentences in milliseconds
      loop: false, // Set to true if you want the animation to loop
      cursor: '_', // Set your desired cursor character
    }
  );

  return (
    <div>
      <div className="blinking-cursor" aria-label={selectedString}>
        typewriting-animation allows you to {typedString}
      </div>
    </div>
  );
}

export default App;

```

<!-- [Example](https://codesandbox.io/s/) -->

<a id="bug-reporting"></a>

## 🐛 Bug Reporting

Feel free to [open an issue](https://github.com/Harshal0902/typewriting-animation/issues) on GitHub if you find any bug.

<a id="feature-request"></a>

## ⭐ Feature Request

- Feel free to [Open an issue](https://github.com/Harshal0902/typewriting-animation/issues) on GitHub to request any additional features you might need for your use case.

<a id="release-notes"></a>

## 📋 Release Notes

Check [here](https://github.com/Harshal0902/typewriting-animation/releases) for release notes.

<a id="license"></a>

## 📜 License

This software is open-source, licensed under the [MIT License](https://github.com/Harshal0902/typewriting-animation/blob/main/LICENSE).

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/Harshal0902)
