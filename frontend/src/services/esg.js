import {
  fetchJson,
  requireFiniteNumber,
  requireRecord,
  requireString,
} from "./validation";

const CARBON_INTENSITY_URL =
  "https://api.carbonintensity.org.uk/intensity";

export async function getCarbonIntensity() {
  const response = requireRecord(
    await fetchJson(CARBON_INTENSITY_URL, "Carbon Intensity request"),
    "Carbon Intensity response",
  );

  if (!Array.isArray(response.data) || response.data.length === 0) {
    throw new Error("Carbon Intensity response contains no data");
  }

  const data = requireRecord(response.data[0], "Carbon Intensity data");
  const intensity = requireRecord(
    data.intensity,
    "Carbon Intensity measurement",
  );
  const forecast = requireFiniteNumber(
    intensity.forecast,
    "Carbon Intensity forecast",
  );
  const actual =
    intensity.actual === null || intensity.actual === undefined
      ? forecast
      : requireFiniteNumber(intensity.actual, "Carbon Intensity actual");
  const index = requireString(intensity.index, "Carbon Intensity index");

  return {
    actual,
    forecast,
    index,
    from: requireString(data.from, "Carbon Intensity start time"),
    to: requireString(data.to, "Carbon Intensity end time"),
    source: "Carbon Intensity API",
  };
}
