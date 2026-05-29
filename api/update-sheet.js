const CELL_PATTERN = /^[A-Z]+[1-9][0-9]*$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_URL || process.env.VITE_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    return res.status(500).json({
      success: false,
      error: 'Missing APPS_SCRIPT_URL environment variable',
    });
  }

  const { cell, value } = req.body || {};
  const numericValue = Number(value);

  if (typeof cell !== 'string' || !CELL_PATTERN.test(cell) || Number.isNaN(numericValue)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid cell or value',
    });
  }

  try {
    const url = new URL(appsScriptUrl);
    url.searchParams.set('cell', cell);
    url.searchParams.set('value', String(numericValue));

    const response = await fetch(url);
    const text = await response.text();

    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = {
        success: false,
        error: 'Apps Script returned a non-JSON response',
        details: text,
      };
    }

    return res.status(response.ok ? 200 : response.status).json(payload);
  } catch (error) {
    return res.status(502).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update sheet',
    });
  }
}
