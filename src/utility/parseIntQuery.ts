function parseIntQuery(value: string | undefined, defaultValue?: number) {
  if (value === undefined) return defaultValue;

  const parsedValue = parseInt(value);
  if (Number.isNaN(parsedValue)) return defaultValue;

  return parsedValue;
}

export { parseIntQuery };
