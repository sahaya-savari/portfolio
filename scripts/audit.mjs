import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { preview } from 'vite';

async function runAudit() {
  // 1. Start Vite preview server
  const previewServer = await preview({
    preview: {
      port: 4173,
      host: '127.0.0.1'
    }
  });
  console.log('Vite preview server running at http://127.0.0.1:4173');

  // 2. Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox']
  });

  try {
    for (const formFactor of ['desktop', 'mobile']) {
      console.log(`\n================ Running ${formFactor.toUpperCase()} Audit ================`);
      const options = {
        logLevel: 'error',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
        formFactor: formFactor,
        screenEmulation: formFactor === 'mobile' ? {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
          disabled: false,
        } : {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: formFactor === 'mobile' ? {
          rttMs: 150,
          throughputKbps: 1.6 * 1024,
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 150,
          downloadThroughputKbps: 1.6 * 1024,
          uploadThroughputKbps: 750,
        } : {
          rttMs: 40,
          throughputKbps: 10 * 1024,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        }
      };

      const runnerResult = await lighthouse('http://127.0.0.1:4173', options);
      const lhr = runnerResult.lhr;

      console.log(`Performance: ${Math.round((lhr.categories.performance?.score || 0) * 100)}`);
      console.log(`Accessibility: ${Math.round((lhr.categories.accessibility?.score || 0) * 100)}`);
      console.log(`Best Practices: ${Math.round((lhr.categories['best-practices']?.score || 0) * 100)}`);
      console.log(`SEO: ${Math.round((lhr.categories.seo?.score || 0) * 100)}`);

      console.log(`FCP: ${lhr.audits['first-contentful-paint']?.displayValue} (score: ${lhr.audits['first-contentful-paint']?.score})`);
      console.log(`LCP: ${lhr.audits['largest-contentful-paint']?.displayValue} (score: ${lhr.audits['largest-contentful-paint']?.score})`);
      console.log(`TBT: ${lhr.audits['total-blocking-time']?.displayValue} (score: ${lhr.audits['total-blocking-time']?.score})`);
      console.log(`CLS: ${lhr.audits['cumulative-layout-shift']?.displayValue} (score: ${lhr.audits['cumulative-layout-shift']?.score})`);
      console.log(`Speed Index: ${lhr.audits['speed-index']?.displayValue} (score: ${lhr.audits['speed-index']?.score})`);

      console.log('lcp-breakdown-insight:', JSON.stringify(lhr.audits['lcp-breakdown-insight']?.details, null, 2));
      console.log('lcp-discovery-insight:', JSON.stringify(lhr.audits['lcp-discovery-insight']?.details, null, 2));
      // Network requests waterfall
      const requests = lhr.audits['network-requests']?.details?.items || [];
      console.log('\n--- Network Requests Waterfall (Mobile) ---');
      requests.forEach(r => {
        console.log(`${r.url.replace('http://127.0.0.1:4173', '') || '/'}: start=${Math.round(r.startTime)}ms, end=${Math.round(r.endTime)}ms, duration=${Math.round(r.endTime - r.startTime)}ms, size=${Math.round(r.transferSize / 1024)}KB, priority=${r.priority}`);
      });
      console.log('LCP audit details:', lhr.audits['largest-contentful-paint']?.details?.items);
      const unusedJs = lhr.audits['unused-javascript'];
      console.log('Unused JS items:', unusedJs?.details?.items?.map(i => ({ url: i.url, totalBytes: i.totalBytes, wastedBytes: i.wastedBytes })));

      // Check failing accessibility audits
      const failingA11y = Object.values(lhr.audits).filter(a => a.score !== null && a.score < 1 && lhr.categories.accessibility.auditRefs.some(ref => ref.id === a.id));
      if (failingA11y.length > 0) {
        console.log(`Failing A11y Audits:`, failingA11y.map(a => `${a.id}: ${a.title}`));
        failingA11y.forEach(a => {
          if (a.details?.items?.length) {
            console.log(`   Items:`, a.details.items.slice(0, 5).map(i => i.node?.snippet || i.node?.selector));
          }
        });
      }

      // Opportunities / Diagnostics with potential savings
      const opportunities = Object.values(lhr.audits).filter(a => a.details?.type === 'opportunity' && a.numericValue > 50);
      if (opportunities.length > 0) {
        console.log('Opportunities:', opportunities.map(o => `${o.id}: ${o.displayValue} (${Math.round(o.numericValue)}ms)`));
      }

      // Check non-composited animations
      const nonComposited = lhr.audits['non-composited-animations'];
      if (nonComposited && nonComposited.score !== 1) {
        console.log(`Non-composited animations:`, nonComposited.details?.items?.map(i => i.subItems?.items?.map(s => s.failureReason).join(', ') || i.node?.snippet));
      }

      // Render blocking resources
      const renderBlocking = lhr.audits['render-blocking-resources'];
      if (renderBlocking && renderBlocking.details?.items?.length) {
        console.log(`Render blocking resources:`, renderBlocking.details.items.map(i => `${i.url} (${i.wastedMs}ms)`));
      }
    }
  } finally {
    try {
      await chrome.kill();
    } catch {
      // Ignore Windows temp file cleanup lock
    }
    try {
      previewServer.httpServer.close();
    } catch {
      // Ignore server close error
    }
  }
}

runAudit().catch(console.error);
