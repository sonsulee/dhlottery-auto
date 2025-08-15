import assert from 'node:assert';
import { chromium, devices } from 'playwright';

(async () => {
	// Setup
	const browser = await chromium.launch();
	const context = await browser.newContext(devices['iPhone 11']);
	const page = await context.newPage();

	// The actual interesting bit
	await context.route('**.jpg', (route) => route.abort());
	await page.goto('https://example.com/');

	assert((await page.title()) === 'Example Domain'); // 👎 not a Web First assertion

	// Teardown
	await context.close();
	await browser.close();
})();
