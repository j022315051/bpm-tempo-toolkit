import assert from 'node:assert/strict';
import fs from 'node:fs';
import { bpmToMilliseconds, millisecondsToBpm } from './src/bpm-conversions.js';
import { TapTempo } from './src/tap-tempo.js';

assert.equal(bpmToMilliseconds(120), 500);
assert.equal(millisecondsToBpm(500), 120);
assert.throws(() => bpmToMilliseconds(0), TypeError);

const tapper = new TapTempo();
assert.equal(tapper.tap(0).averageBpm, null);
assert.equal(tapper.tap(500).currentBpm, 120);
assert.equal(tapper.tap(1000).averageBpm, 120);
tapper.tap(5000);
assert.deepEqual(tapper.intervals, []);

const referenceRows = fs.readFileSync('data/bpm-interval-reference.csv', 'utf8').trim().split('\n');
assert.equal(referenceRows.length, 42);
assert.ok(referenceRows.includes('120,500,60000/120'));

console.log('All checks passed.');
