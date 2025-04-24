// accessibility-check.js
const { chromium } = require('playwright');
const fs = require('fs');
const axeSource = require('axe-core').source;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // テスト対象のURLを指定
  await page.goto('https://example.com');

  // axe-core をブラウザにインジェクト
  await page.addScriptTag({ content: axeSource });

  // アクセシビリティテストを実行
  const results = await page.evaluate(async () => {
    return await axe.run();
  });

  // 結果を出力
  const output = JSON.stringify(results, null, 2);
  fs.writeFileSync('axe-results.json', output);

  if (results.violations.length > 0) {
    console.error('アクセシビリティの違反が検出されました:');
    results.violations.forEach((v) => {
      console.error(`${v.id}: ${v.help}`);
    });
    process.exit(1); // CIを失敗にする
  } else {
    console.log('アクセシビリティ違反はありませんでした。');
  }

  await browser.close();
})();
