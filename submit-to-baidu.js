const { readFile } = require('node:fs/promises');
const path = require('node:path');

const BAIDU_SITE = process.env.BAIDU_SITE || 'sts2hub.com';
const BAIDU_TOKEN = process.env.BAIDU_TOKEN || 'YOUR_BAIDU_TOKEN';
const BASE_URL = 'https://sts2hub.com';
const CARDS_FILE = path.join(process.cwd(), 'public', 'data', 'cards.json');

async function loadCards() {
  const raw = await readFile(CARDS_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error('cards.json must be an array.');
  }
  return parsed;
}

function buildZhCardUrls(cards) {
  return cards
    .map(card => (typeof card?.id === 'string' ? card.id.trim() : ''))
    .filter(Boolean)
    .map(id => `${BASE_URL}/zh/cards/${id}`);
}

async function submitToBaidu(urls) {
  if (!urls.length) {
    console.log('[baidu-submit] No URLs to submit.');
    return;
  }

  if (!BAIDU_TOKEN || BAIDU_TOKEN === 'YOUR_BAIDU_TOKEN') {
    console.warn('[baidu-submit] Missing BAIDU_TOKEN. Please set env var BAIDU_TOKEN.');
    return;
  }

  const endpoint = `http://data.zz.baidu.com/urls?site=${encodeURIComponent(
    BAIDU_SITE,
  )}&token=${encodeURIComponent(BAIDU_TOKEN)}`;

  const body = urls.join('\n');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body,
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
    console.error('[baidu-submit] Response:', result);
    process.exitCode = 1;
    return;
  }

  console.log('[baidu-submit] Submitted URLs:', urls.length);
  console.log('[baidu-submit] success:', result.success ?? 0);
  console.log('[baidu-submit] remain:', result.remain ?? 'N/A');
  if (result.not_same_site || result.not_valid || result.error) {
    console.log('[baidu-submit] detail:', result);
  }
}

async function main() {
  try {
    const cards = await loadCards();
    const urls = buildZhCardUrls(cards);
    await submitToBaidu(urls);
  } catch (error) {
    console.error('[baidu-submit] Failed:', error);
    process.exitCode = 1;
  }
}

main();
