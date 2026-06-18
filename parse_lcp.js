import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./lhreport.json', 'utf8'));

const metrics = {
    perf: data.categories.performance.score * 100,
    lcp: data.audits['largest-contentful-paint']?.displayValue,
    cls: data.audits['cumulative-layout-shift']?.displayValue,
    tbt: data.audits['total-blocking-time']?.displayValue,
    si: data.audits['speed-index']?.displayValue,
    inp: data.audits['interactive']?.displayValue // using interactive or tti for INP
}

const lcpElement = data.audits['largest-contentful-paint-element']?.details?.items[0]?.node?.snippet || 'Not found';
const lcpSelector = data.audits['largest-contentful-paint-element']?.details?.items[0]?.node?.selector || 'Not found';

console.log(JSON.stringify({ metrics, lcpElement, lcpSelector }, null, 2));
