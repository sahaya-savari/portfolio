import { execSync } from 'child_process';
import fs from 'fs';

const runs = 3;
const url = 'http://localhost:4173';
let scores = { perf: 0, a11y: 0, bp: 0, seo: 0, lcp: 0, cls: 0, inp: 0, tbt: 0, si: 0 };
let a11yIssues = [];
let bpIssues = [];

console.log(`Running Lighthouse ${runs} times on ${url}...`);

for (let i = 1; i <= runs; i++) {
  console.log(`Run ${i}/${runs}...`);
  try {
    execSync(`npx --yes lighthouse ${url} --output json --output-path ./lh-temp.json --chrome-flags="--headless"`, { stdio: 'pipe' });
    const data = JSON.parse(fs.readFileSync('./lh-temp.json', 'utf8'));
    
    scores.perf += data.categories.performance.score * 100;
    scores.a11y += data.categories.accessibility.score * 100;
    scores.bp += data.categories['best-practices'].score * 100;
    scores.seo += data.categories.seo.score * 100;
    
    scores.lcp += data.audits['largest-contentful-paint'].numericValue;
    scores.cls += data.audits['cumulative-layout-shift'].numericValue;
    scores.inp += data.audits['interactive'] ? data.audits['interactive'].numericValue : 0; 
    scores.tbt += data.audits['total-blocking-time'].numericValue;
    scores.si += data.audits['speed-index'].numericValue;

    if (i === 1) {
      const a11yAuditRefs = data.categories.accessibility.auditRefs.filter(ref => ref.weight > 0);
      a11yAuditRefs.forEach(ref => {
        const audit = data.audits[ref.id];
        if (audit.score !== 1 && audit.score !== null) {
          a11yIssues.push({ id: audit.id, title: audit.title, description: audit.description, details: audit.details });
        }
      });
      
      const bpAuditRefs = data.categories['best-practices'].auditRefs.filter(ref => ref.weight > 0);
      bpAuditRefs.forEach(ref => {
        const audit = data.audits[ref.id];
        if (audit.score !== 1 && audit.score !== null) {
          bpIssues.push({ id: audit.id, title: audit.title, description: audit.description, details: audit.details });
        }
      });
    }
  } catch (e) {
    console.error(`Run ${i} failed:`, e.message);
  }
}

for (let key in scores) {
  scores[key] = (scores[key] / runs).toFixed(2);
}

const result = {
  averages: scores,
  a11yIssues,
  bpIssues
};

fs.writeFileSync('lh_summary.json', JSON.stringify(result, null, 2));
console.log('Finished. Summary saved to lh_summary.json');
