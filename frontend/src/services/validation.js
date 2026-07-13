export async function fetchJson(url, label) {
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(`${label} network request failed`, { cause: error });
  }

  if (!response.ok) {
    throw new Error(`${label} failed with status ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error(`${label} returned invalid JSON`, { cause: error });
  }
}

export function requireRecord(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }

  return value;
}

export function requireFiniteNumber(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number`);
  }

  return number;
}

export function requireString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }

  return value;
}
