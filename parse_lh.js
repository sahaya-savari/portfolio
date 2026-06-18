import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./lhreport.json', 'utf8'));

let a11yIssues = [];
const a11yAuditRefs = data.categories.accessibility.auditRefs.filter(ref => ref.weight > 0);
a11yAuditRefs.forEach(ref => {
  const audit = data.audits[ref.id];
  if (audit && audit.score !== 1 && audit.score !== null) {
    a11yIssues.push({ id: audit.id, title: audit.title });
  }
});

let bpIssues = [];
const bpAuditRefs = data.categories['best-practices'].auditRefs.filter(ref => ref.weight > 0);
bpAuditRefs.forEach(ref => {
  const audit = data.audits[ref.id];
  if (audit && audit.score !== 1 && audit.score !== null) {
    bpIssues.push({ id: audit.id, title: audit.title });
  }
});

let perfIssues = [];
const perfAuditRefs = data.categories.performance.auditRefs.filter(ref => ref.weight > 0);
perfAuditRefs.forEach(ref => {
  const audit = data.audits[ref.id];
  if (audit && audit.score !== 1 && audit.score !== null) {
    perfIssues.push({ id: audit.id, title: audit.title, value: audit.displayValue });
  }
});

const metrics = {
    perf: data.categories.performance.score * 100,
    a11y: data.categories.accessibility.score * 100,
    bp: data.categories['best-practices'].score * 100,
    seo: data.categories.seo.score * 100,
    lcp: data.audits['largest-contentful-paint']?.displayValue,
    cls: data.audits['cumulative-layout-shift']?.displayValue,
    tbt: data.audits['total-blocking-time']?.displayValue,
    si: data.audits['speed-index']?.displayValue,
}

console.log(JSON.stringify({ metrics, a11yIssues, bpIssues, perfIssues }, null, 2));
