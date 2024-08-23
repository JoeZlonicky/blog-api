function parseIntQuery(value, defaultValue) {
  if (value === undefined) return defaultValue;

  value = parseInt(value);
  if (Number.isNaN(value)) return defaultValue;

  return value;
}

export { parseIntQuery };
