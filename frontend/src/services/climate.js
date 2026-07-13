import {
  fetchJson,
  requireFiniteNumber,
  requireRecord,
  requireString,
} from "./validation";
import { calculateClimateAssessment } from "../domain/decision";

const LATITUDE = 51.5072;
const LONGITUDE = -0.1276;

export async function getClimateRisk() {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${LATITUDE}` +
    `&longitude=${LONGITUDE}` +
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index" +
    "&timezone=Europe%2FLondon";
  const response = requireRecord(
    await fetchJson(url, "Open-Meteo request"),
    "Open-Meteo response",
  );
  const current = requireRecord(response.current, "Open-Meteo current data");
  const temperature = requireFiniteNumber(
    current.temperature_2m,
    "Open-Meteo temperature",
  );
  const humidity = requireFiniteNumber(
    current.relative_humidity_2m,
    "Open-Meteo humidity",
  );
  const windSpeed = requireFiniteNumber(
    current.wind_speed_10m,
    "Open-Meteo wind speed",
  );
  const uvIndex = requireFiniteNumber(
    current.uv_index,
    "Open-Meteo UV index",
  );
  const time = requireString(current.time, "Open-Meteo observation time");
  const risk = calculateClimateAssessment(temperature, uvIndex);

  return {
    city: "London",
    temperature,
    humidity,
    windSpeed,
    uvIndex,
    time,
    ...risk,
    source: "Open-Meteo API",
    status: "Live climate data",
  };
}
