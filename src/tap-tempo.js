import { millisecondsToBpm } from './bpm-conversions.js';

export class TapTempo {
  constructor({ sessionTimeoutMs = 3000, maxIntervals = 12 } = {}) {
    if (!Number.isFinite(sessionTimeoutMs) || sessionTimeoutMs <= 0) throw new TypeError('sessionTimeoutMs must be positive');
    if (!Number.isInteger(maxIntervals) || maxIntervals < 1) throw new TypeError('maxIntervals must be a positive integer');
    this.sessionTimeoutMs = sessionTimeoutMs;
    this.maxIntervals = maxIntervals;
    this.reset();
  }

  reset() {
    this.lastTap = null;
    this.intervals = [];
  }

  tap(timestamp = performance.now()) {
    if (!Number.isFinite(timestamp)) throw new TypeError('timestamp must be finite');

    if (this.lastTap !== null) {
      const interval = timestamp - this.lastTap;
      if (interval <= 0) throw new RangeError('timestamps must increase');
      if (interval > this.sessionTimeoutMs) {
        this.intervals = [];
      } else {
        this.intervals.push(interval);
        this.intervals = this.intervals.slice(-this.maxIntervals);
      }
    }

    this.lastTap = timestamp;
    const latest = this.intervals.at(-1);
    const averageInterval = this.intervals.length
      ? this.intervals.reduce((sum, value) => sum + value, 0) / this.intervals.length
      : null;

    return {
      currentBpm: latest === undefined ? null : millisecondsToBpm(latest),
      averageBpm: averageInterval === null ? null : millisecondsToBpm(averageInterval),
      intervals: [...this.intervals],
    };
  }
}
