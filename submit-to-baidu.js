const { readdirSync, readFileSync } = require('node:fs');
const path = require('node:path');

const BAIDU_SITE = normalizeOrigin(process.env.BAIDU_SITE || 'https://sts2hub.com');
const BAIDU_TOKEN = (process.env.BAIDU_TOKEN || 'ji3Jk0hy1rdkKgPl').trim();
const BASE_URL = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL || BAIDU_SITE);
const CARDS_DIR = path.join(process.cwd(), 'cards');

function normalizeOrigin(value) {
  try {
    return new URL(value).origin;
  } catch {
    return value.replace(/\/+$/, '');
  }
}

function loadCardKeys() {
  const files = readdirSync(CARDS_DIR);
  const keys = new Set();

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    try {
      const fullPath = path.join(CARDS_DIR, file);
      const raw = readFileSync(fullPath, 'utf8');
      const parsed = JSON.parse(raw);
      const key = parsed?.card?.key;
      if (typeof key === 'string' && key.trim().length > 0) {
        keys.add(key.trim());
      }
    } catch {
      // Ignore malformed card files.
    }
  }

  return [...keys];
}

function buildZhCardUrls(cardKeys) {
  return cardKeys.map(key => `${BASE_URL}/cards/${key}`);
}

async function submitToBaidu(urls) {
  if (!urls.length) {
    console.log('[baidu-submit] No URLs to submit.');
    return;
  }

  if (!BAIDU_TOKEN || BAIDU_TOKEN === 'YOUR_BAIDU_TOKEN') {
    console.warn('[baidu-submit] Missing BAIDU_TOKEN. Set BAIDU_TOKEN environment variable first.');
    return;
  }

  const siteOrigin = new URL(BAIDU_SITE).origin;
  const urlsForSite = urls.filter(url => {
    try {
      return new URL(url).origin === siteOrigin;
    } catch {
      return false;
    }
  });

  if (urlsForSite.length !== urls.length) {
    console.warn(
      `[baidu-submit] Skipped ${urls.length - urlsForSite.length} URL(s) that do not match BAIDU_SITE=${BAIDU_SITE}.`,
    );
  }

  if (!urlsForSite.length) {
    console.warn('[baidu-submit] No URLs match BAIDU_SITE. Nothing submitted.');
    return;
  }

  const endpoint = `http://data.zz.baidu.com/urls?site=${BAIDU_SITE}&token=${encodeURIComponent(
    BAIDU_TOKEN,
  )}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: urlsForSite.join('\n'),
  });

  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch {
    result = { raw: text };
  }

  if (!response.ok) {
    console.error('[baidu-submit] HTTP error:', response.status, response.statusText);
    console.error('[baidu-submit] response:', result);
    return;
  }

  console.log('[baidu-submit] Submitted URLs:', urlsForSite.length);
  console.log('[baidu-submit] success:', result.success ?? 0);
  console.log('[baidu-submit] remain:', result.remain ?? 'N/A');
  if (result.error || result.not_same_site || result.not_valid) {
    console.log('[baidu-submit] detail:', result);
  }
}

async function main() {
  try {
    const cardKeys = loadCardKeys();
    const urls = buildZhCardUrls(cardKeys);
    await submitToBaidu(urls);
  } catch (error) {
    console.error('[baidu-submit] Failed:', error);
    process.exitCode = 1;
  }
}

main();
