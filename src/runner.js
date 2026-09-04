import { spawn } from 'node:child_process';
import pc from 'picocolors';
import { resolveBrowsers, ENGINE_LABELS } from './browsers.js';

export async function runTests(browserArgs, options) {
  const { resolved, unknown } = resolveBrowsers(browserArgs);

  if (unknown.length) {
    console.log(pc.yellow(`Skipping unknown browser(s): ${unknown.join(', ')}`));
    console.log(pc.dim('Supported: chrome, firefox, safari, all'));
  }

  if (!resolved.length) {
    console.log(pc.red('No valid browsers to test. Try: any-browser test chrome firefox safari'));
    process.exitCode = 1;
    return;
  }

  const names = resolved.map((e) => ENGINE_LABELS[e]).join(', ');
  console.log(pc.cyan(`\nTesting ${options.url} in: ${names}\n`));

  for (const engine of resolved) {
    // eslint-disable-next-line no-await-in-loop -- browsers run one at a time on purpose
    await runOne(engine, options);
  }
}

function runOne(engine, options) {
  return new Promise((resolve) => {
    console.log(pc.bold(`\n▶ ${ENGINE_LABELS[engine]} (${engine})`));

    const args = ['playwright', 'test', `--project=${engine}`];
    if (!options.headless) args.push('--headed');

    const child = spawn('npx', args, {
      stdio: 'inherit',
      env: {
        ...process.env,
        TEST_URL: options.url,
        TEST_HEADLESS: options.headless ? '1' : '0',
      },
      shell: process.platform === 'win32',
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(pc.green(`✓ ${ENGINE_LABELS[engine]} finished`));
      } else {
        console.log(pc.red(`✗ ${ENGINE_LABELS[engine]} exited with code ${code}`));
      }
      resolve();
    });

    child.on('error', (err) => {
      console.log(pc.red(`✗ Couldn't start ${ENGINE_LABELS[engine]}: ${err.message}`));
      resolve();
    });
  });
}