function requirePositiveFinite(value, name) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive finite number`);
  }
}

export function bpmToMilliseconds(bpm) {
  requirePositiveFinite(bpm, 'bpm');
  return 60000 / bpm;
}

export function millisecondsToBpm(milliseconds) {
  requirePositiveFinite(milliseconds, 'milliseconds');
  return 60000 / milliseconds;
}
