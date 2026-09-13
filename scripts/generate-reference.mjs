import fs from 'node:fs';

const rows = ['bpm,milliseconds_per_beat,calculation'];
for (let bpm = 40; bpm <= 240; bpm += 5) {
  const milliseconds = Number((60000 / bpm).toFixed(2));
  rows.push(`${bpm},${milliseconds},60000/${bpm}`);
}

fs.writeFileSync('data/bpm-interval-reference.csv', `${rows.join('\n')}\n`);
console.log(`Wrote ${rows.length - 1} calculated rows.`);
