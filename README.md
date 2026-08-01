# Browser-Testing

# Test Your Website on Different Browsers

Published January 28, 2025

## Table of Contents

- [Getting Started](#getting-started)
- [What Are The Major Browsers?](#what-are-the-major-browsers)
- [Method That Works for Linux, macOS, Windows](#method-that-works-for-linux-macos-windows)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

To set up and run the project, follow these steps:

### 1. Clone the Repository
```sh
git clone https://github.com/BhalliBhai/Browser-Testing.git
cd Browser-Testing
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run Tests
To test your site in different browsers, use the following commands:

```sh
npm run test:chrome  # Runs tests in Chrome
npm run test:firefox # Runs tests in Firefox
npm run test:safari  # Runs tests in Safari (WebKit)
```

### 4. 🎇Browser Window is In front of you...🎇

---

## What Are The Major Browsers?

Ensuring your website looks great across all major browsers is crucial for a consistent user experience. This guide will help you test your site on **Chrome, Firefox, and Safari** regardless of your operating system—Linux, macOS, or Windows.

### Why These Browsers?

If we look at browser market share worldwide, Chrome dominates at around 64%, Safari follows with about 20%, and Firefox holds roughly 4%. While there are many other browsers, these three are critical because they use distinct **browser engines**, which render web pages differently:

- **Chrome** (and Chromium-based browsers like Edge and Brave) use **Blink**.
- **Firefox** uses **Gecko**, developed by Mozilla.
- **Safari** uses **WebKit**, developed by Apple.

Since **Safari is exclusive to macOS**, testing on it from Linux or Windows requires workarounds. Let's explore a solution.

---

## Method That Works for Linux, macOS, Windows

### Linux Users:
If you’re on Linux, you can use a **WebKit-based browser** like **Epiphany**. It may not be a perfect Safari replica, but it uses the same rendering engine.

### Windows Users:
Windows lacks a WebKit-based browser, so the best approach is using **a virtual machine** or the latest **Windows Subsystem for Linux (WSL)** with a GUI.

### Cross-Platform Solution:
To ensure a clean and automated testing environment, we use **Playwright**, which supports testing across **Chromium (Chrome), Firefox, and WebKit (Safari)** with open-source builds.

⚠️ **Linux Users:** Playwright officially supports Ubuntu LTS versions. For unsupported distros, consider using a VM.

### Setting Up Playwright

#### 1. Initialize a new project:
```sh
npm init -y
```

#### 2. Install Playwright:
```sh
npm i -D @playwright/test
```

#### 3. Install browsers:
```sh
npx playwright install
```

#### 4. Update `package.json`:
```json
{
  "scripts": {
    "test:chrome": "npx playwright test --headed --browser=chromium",
    "test:firefox": "npx playwright test --headed --browser=firefox",
    "test:safari": "npx playwright test --headed --browser=webkit"
  },
  "devDependencies": {
    "@playwright/test": "^1.22.1"
  }
}
```
🐿️ The `npx` command lets you run Playwright without installing it globally.

#### 5. Create a test file:
Create a file `tests/browser.test.ts` with the following content:
```ts
import { test } from '@playwright/test';

test('test browser', async ({ page }) => {
  await page.goto('http://localhost:3000/'); // Change URL as needed
  await page.pause(); // Keeps the browser open for inspection
});
```

#### 6. Run the tests:
```sh
npm run test:safari
```
🎉 That’s it! You can now test your website in **Chrome, Firefox, and Safari** from any OS.

---

## Troubleshooting

If you encounter missing dependencies on Linux when running WebKit tests, install them using:
```sh
npx playwright install-deps webkit
```

If you see an error about missing libraries such as:
```sh
browserType.launch:

Host system is missing dependencies to run browsers.
Missing libraries:
  libpcre.so.3
  libicui18n.so.66
  libicuuc.so.66
  libwebp.so.6
  libenchant.so.1
  libffi.so.
```
You need to install the necessary system dependencies. For Ubuntu, you can run:
```sh
sudo apt-get install -y libpcre3 libicu66 libwebp6 libenchant1c2a libffi7
```
For other distributions, refer to your package manager’s documentation.

Now your site can be tested on every major browser regardless of your OS. 🚀

If this helped, consider **starring** ⭐ the repository to support the project! 😊

...