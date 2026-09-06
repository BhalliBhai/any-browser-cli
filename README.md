# any-browser

Test your website on Safari, Firefox, and Chrome — from any OS — with one command.

```
any-browser test safari
any-browser test chrome firefox
any-browser test all
```

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [What Are The Major Browsers?](#what-are-the-major-browsers)
- [Running From Source Instead](#running-from-source-instead)
- [Troubleshooting](#troubleshooting)

## Getting Started

Install it globally from npm:

```
npm install -g any-browser
```

The first install downloads the Chrome, Firefox, and Safari (WebKit) engines
via Playwright — that's a one-time ~300MB download, and you'll see exactly
what's happening and why in your terminal. After that, every run is instant.

## Usage

```
any-browser test <browser...> [options]
```

| Browser argument | Engine used |
|---|---|
| `chrome` | Chromium |
| `firefox` | Firefox |
| `safari` | WebKit |
| `all` | all three |

Options:

- `-u, --url <url>` — URL to test (default: `http://localhost:3000`)
- `--headless` — run without opening a visible window

Examples:

```
any-browser test safari
any-browser test chrome firefox
any-browser test all --url https://example.com
```

🎇 Each browser opens in front of you, paused, so you can click around and
inspect the page exactly like a real visitor would.

## What Are The Major Browsers?

Ensuring your website looks great across all major browsers is crucial for a
consistent user experience. `any-browser` covers Chrome, Firefox, and Safari
regardless of your operating system — Linux, macOS, or Windows.

If we look at browser market share worldwide, Chrome dominates at around 64%,
Safari follows with about 20%, and Firefox holds roughly 4%. While there are
many other browsers, these three are critical because they use distinct
rendering engines:

- **Chrome** (and Chromium-based browsers like Edge and Brave) use **Blink**.
- **Firefox** uses **Gecko**, developed by Mozilla.
- **Safari** uses **WebKit**, developed by Apple.

Since Safari is exclusive to macOS, testing it from Linux or Windows normally
requires workarounds. `any-browser` sidesteps that entirely by using
Playwright's open-source WebKit build, so `any-browser test safari` works
identically on any OS.

## Running From Source Instead

Prefer to clone and run it locally rather than install globally? That still
works exactly like before:

```
git clone https://github.com/BhalliBhai/any-browser-cli.git
cd any-browser-cli
npm install
npm run test:safari   # or test:chrome / test:firefox
```

## Troubleshooting

If you hit missing dependencies on Linux when running WebKit tests:

```
npx playwright install-deps webkit
```

If you see an error about missing libraries such as:

```
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

Install the necessary system packages. On Ubuntu/Debian:

```
sudo apt-get install -y libpcre3 libicu66 libwebp6 libenchant1c2a libffi7
```

For other distributions, check your package manager's docs, or just run
`npx playwright install-deps` and let Playwright figure it out.

---

If this helped, consider starring ⭐ the repository to support the project! 😊

---

Built by [Bhalli B.](https://bhalli.dev) — Full-Stack Developer & SaaS MVP Architect.
