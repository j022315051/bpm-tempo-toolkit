# BPM Tempo Toolkit

Small, dependency-free resources for working with tempo in browser projects:

- `src/bpm-conversions.js` converts BPM to milliseconds per beat and back.
- `src/tap-tempo.js` turns timestamped taps into current and average BPM readings.
- `data/bpm-interval-reference.csv` provides a reusable BPM-to-interval lookup table generated from `milliseconds = 60000 / BPM`.
- `data/genre-tempo-reference.csv` preserves a short, sourced set of genre reference points.
- `examples/browser-tap-demo.html` is a minimal browser example.

The live [BPM Tapper](https://tapbpmnow.com/) uses the same interval-based calculation, while its [BPM Finder](https://tapbpmnow.com/bpm-finder/) analyzes a selected audio file locally in the visitor's browser.

## Usage

```js
import { bpmToMilliseconds, millisecondsToBpm } from './src/bpm-conversions.js';
import { TapTempo } from './src/tap-tempo.js';

bpmToMilliseconds(120); // 500
millisecondsToBpm(500); // 120

const tapper = new TapTempo();
tapper.tap(0);
console.log(tapper.tap(500));
// { currentBpm: 120, averageBpm: 120, intervals: [500] }
```

## Verify

Run the dependency-free checks with Node.js:

```sh
node test.mjs
```

## Data notes

The interval table is generated from the formula printed above; it is not an observed music dataset. The genre table includes the source URL for every row and should be treated as a starting reference because tracks and subgenres vary.

## License

MIT
