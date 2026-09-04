export const SUPPORTED_BROWSERS = {
  chrome: 'chromium',
  chromium: 'chromium',
  firefox: 'firefox',
  safari: 'webkit',
  webkit: 'webkit',
};

export const ENGINE_LABELS = {
  chromium: 'Chrome',
  firefox: 'Firefox',
  webkit: 'Safari',
};

/**
 * Turns whatever the user typed (["safari", "Chrome", "all"]) into a clean,
 * deduplicated list of Playwright engine names, plus anything we didn't recognize.
 */
export function resolveBrowsers(requested) {
  const list = requested.map((b) => b.toLowerCase());

  if (list.includes('all')) {
    return { resolved: ['chromium', 'firefox', 'webkit'], unknown: [] };
  }

  const resolved = [];
  const unknown = [];

  for (const name of list) {
    const engine = SUPPORTED_BROWSERS[name];
    if (!engine) {
      unknown.push(name);
      continue;
    }
    if (!resolved.includes(engine)) resolved.push(engine);
  }

  return { resolved, unknown };
}
