import { chromium } from 'playwright';
import 'dotenv/config';

const NON_DIGIT_REGEX = /[^\d]/g;
const MINIMUM_AMOUNT = 5000;

function validateEnvironmentVariables() {
	const id = process.env.DHLOTTERY_ID;
	const pw = process.env.DHLOTTERY_PASSWORD;

	if (!id || !pw) {
		console.error('환경변수 DHLOTTERY_ID, DHLOTTERY_PASSWORD가 설정되지 않았습니다.');
		process.exit(1);
	}

	return { id, pw };
}

(async () => {
	console.log('🚀 동행복권 자동화 시작');

	// 환경변수 검증
	const { id, pw } = validateEnvironmentVariables();

	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();

	// 이미지 리소스 차단으로 성능 최적화
	await context.route('**.jpg', (route) => route.abort());
	await page.goto('https://dhlottery.co.kr/common.do?method=main');

	try {
		// 로그인
		await page.getByRole('link', { name: '로그인' }).click();
		await page.locator('input[name="userId"]').fill(id);
		await page.locator('input[name="password"]').fill(pw);
		await page.getByRole('group').getByRole('link', { name: '로그인' }).click();

		await page.waitForSelector(
			'form[name="frmLogin"] .topAccount ul.information li.money strong',
		);

		// 예치금 확인
		const depositAmount = await page
			.locator(
				'form[name="frmLogin"] .topAccount ul.information li.money strong',
			)
			.textContent();
		const amountNumber = depositAmount
			? Number.parseInt(depositAmount.replace(NON_DIGIT_REGEX, ''), 10)
			: 0;

		console.log(`예치금: ${depositAmount}`);

		if (amountNumber < MINIMUM_AMOUNT) {
			throw new Error(`예치금이 부족합니다 (${amountNumber}원)`);
		}

		// 로또 페이지 이동
		await page.getByText('복권구매').hover();
		const [newPage] = await Promise.all([
			context.waitForEvent('page'),
			page.locator('#gnb .gnb1_1 a').click(),
		]);

		await newPage.waitForLoadState('networkidle');
		await newPage.waitForSelector('#ifrm_tab');
		const iframe = newPage.frameLocator('#ifrm_tab');
		await newPage.waitForTimeout(3000);

		// 판매시간 확인
		const saleTimePopup = iframe.locator('#popupLayerAlert .layer-message');
		const isPopupVisible = await saleTimePopup.isVisible();

		if (isPopupVisible) {
			const alertMessage = await saleTimePopup.textContent();
			if (alertMessage?.includes('현재 시간은 판매시간이 아닙니다')) {
				console.log('현재 판매시간이 아닙니다');
				await iframe.locator('#popupLayerAlert .button.confirm').click();
				await newPage.close();
				return;
			}
		}

		// 로또 구매
		await iframe.locator('#tabWay2Buy #num2').click();
		await iframe.locator('#divWay2Buy1 .amount #amoundApply').selectOption('5');
		await iframe.locator('#divWay2Buy1 .amount input[type="button"]').click();
		await iframe.locator('.selected-games .footer #btnBuy').click();
		await iframe
			.locator('#popupLayerConfirm .btns input[value="확인"]')
			.click();

		// 구매한도 확인
		const limitPopup = iframe.locator('#recommend720Plus');
		const isLimitPopupVisible = await limitPopup.isVisible();

		if (isLimitPopupVisible) {
			console.log('이번 주 구매한도를 초과했습니다');
			await iframe
				.locator(
					'#recommend720Plus .btns a[href="javascript:closeRecomd720Popup();"]',
				)
				.click();
			await newPage.close();
			return;
		}

		// 구매 완료
		await iframe.locator('#popReceipt').waitFor({ state: 'visible' });
		
		const round = await iframe.locator('#popReceipt #buyRound').textContent();
		const issueDate = await iframe
			.locator('#popReceipt #issueDay')
			.textContent();
		const buyAmount = await iframe
			.locator('#popReceipt #nBuyAmount')
			.textContent();

		console.log(`\n구매 완료!`);
		console.log(`${round || ''}`);
		console.log(`발행일: ${issueDate || ''}`);
		console.log(`금액: ${buyAmount || ''}원`);

		const lottoNumbers = await iframe
			.locator('#popReceipt #reportRow li')
			.all();
		for (const lottoNumber of lottoNumbers) {
			const gameLabel = await lottoNumber
				.locator('strong span')
				.first()
				.textContent();
			const numbers = await lottoNumber.locator('.nums span').allTextContents();
			console.log(`${gameLabel || ''}게임: ${numbers.join(', ')}`);
		}

		await iframe.locator('#popReceipt #closeLayer').click();
		await newPage.close();
	} catch (error) {
		console.error(`오류: ${error}`);
		throw error;
	} finally {
		await context.close();
		await browser.close();
	}
})().catch(() => {
	process.exit(1);
});
