import { execSync } from 'child_process';
import fs from 'fs';

const runs = 3;
const url = 'http://localhost:4173';
let allRuns = [];

console.log(`Running Lighthouse ${runs} times on ${url}...`);

for (let i = 1; i <= runs; i++) {
  console.log(`Run ${i}/${runs}...`);
  try {
    execSync(`npx --yes lighthouse ${url} --output json --output-path ./lh-run-${i}.json --chrome-flags="--headless"`, { stdio: 'pipe' });
  } catch (e) {
    console.log(`Run ${i} had an error (likely chrome-launcher EPERM), but we will check if JSON was created.`);
  }

  if (fs.existsSync(`./lh-run-${i}.json`)) {
    const data = JSON.parse(fs.readFileSync(`./lh-run-${i}.json`, 'utf8'));
    allRuns.push({
      run: i,
      perf: data.categories.performance.score * 100,
      lcp: data.audits['largest-contentful-paint']?.displayValue,
      cls: data.audits['cumulative-layout-shift']?.displayValue,
      tbt: data.audits['total-blocking-time']?.displayValue,
      si: data.audits['speed-index']?.displayValue,
      inp: data.audits['interactive']?.displayValue || data.audits['max-potential-fid']?.displayValue || "N/A"
    });
  }
}

// Calculate averages
let avg = { perf: 0, lcpMs: 0, cls: 0, tbtMs: 0, siMs: 0, inpMs: 0 };
let validRuns = allRuns.length;

allRuns.forEach(r => {
    avg.perf += r.perf;
    avg.lcpMs += parseFloat(r.lcp.replace(/[^0-9.]/g, '')) * (r.lcp.includes('s') ? 1000 : 1);
    avg.cls += parseFloat(r.cls);
    avg.tbtMs += parseFloat(r.tbt.replace(/[^0-9.]/g, ''));
    avg.siMs += parseFloat(r.si.replace(/[^0-9.]/g, '')) * (r.si.includes('s') ? 1000 : 1);
    avg.inpMs += parseFloat(r.inp.replace(/[^0-9.]/g, '')) * (r.inp.includes('s') && r.inp !== 'N/A' ? 1000 : 1);
});

if (validRuns > 0) {
    avg.perf = (avg.perf / validRuns).toFixed(2);
    avg.lcp = (avg.lcpMs / validRuns).toFixed(2) + ' ms';
    avg.cls = (avg.cls / validRuns).toFixed(3);
    avg.tbt = (avg.tbtMs / validRuns).toFixed(2) + ' ms';
    avg.si = (avg.siMs / validRuns).toFixed(2) + ' ms';
    avg.inp = (avg.inpMs / validRuns).toFixed(2) + ' ms';
}

console.log("=== RESULTS ===");
console.log(JSON.stringify({ runs: allRuns, averages: avg }, null, 2));
