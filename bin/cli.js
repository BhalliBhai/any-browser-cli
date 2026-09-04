#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { runTests } from '../src/runner.js';
import { SUPPORTED_BROWSERS } from '../src/browsers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

const program = new Command();

program
  .name('any-browser')
  .description('Test your website across Chrome, Firefox, and Safari from one CLI command.')
  .version(pkg.version, '-v, --version');

program
  .command('test')
  .description('Open your site in one or more browsers for testing')
  .argument(
    '<browsers...>',
    `browser(s) to test — ${Object.keys(SUPPORTED_BROWSERS).join(', ')}, or "all"`
  )
  .option('-u, --url <url>', 'URL to test', 'http://localhost:3000')
  .option('--headless', 'run without opening a visible browser window', false)
  .action(async (browsers, options) => {
    await runTests(browsers, options);
  });

program.addHelpText(
  'after',
  `
Examples:
  $ any-browser test safari
  $ any-browser test chrome firefox
  $ any-browser test all
  $ any-browser test chrome --url https://example.com
`
);

program.parse();
