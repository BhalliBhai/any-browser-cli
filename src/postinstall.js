#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import pc from 'picocolors';

const isCI = !!process.env.CI;

console.log('');
console.log(pc.cyan('any-browser needs real browser engines (Chromium, Firefox, WebKit) to run tests.'));
console.log(
  pc.dim('This is a one-time download (~300MB total, handled by Playwright) so every')
);
console.log(pc.dim('"any-browser test <browser>" run afterwards is instant — no setup needed.'));

if (isCI) {
  console.log(pc.yellow('\nCI environment detected — skipping the automatic download.'));
  console.log(pc.dim('Add this as its own step in your CI pipeline instead:'));
  console.log(pc.bold('  npx playwright install --with-deps\n'));
  process.exit(0);
}

console.log(pc.dim('\nDownloading now...\n'));

const result = spawnSync('npx', ['playwright', 'install', 'chromium', 'firefox', 'webkit'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.status === 0) {
  console.log(pc.green("\n✓ Browser engines installed. You're ready to go:"));
  console.log(pc.bold('  any-browser test chrome firefox safari\n'));
} else {
  console.log(pc.yellow("\nCouldn't auto-install the browser engines (this can happen behind"));
  console.log(pc.yellow('certain firewalls/proxies, or if disk space is low).'));
  console.log(pc.dim('Run this once manually, then you\'re good:'));
  console.log(pc.bold('  npx playwright install chromium firefox webkit\n'));
}
