import {
  calculateClimateRisk,
  calculateEsgRisk as calculateSharedEsgRisk,
  DECISION_THRESHOLDS,
  evaluateDecisionGate,
} from "../../../shared/decisionPolicy";

export { DECISION_THRESHOLDS };

export function clamp(value, minimum, maximum) {
  return Math.min(Math.max(Number(value) || 0, minimum), maximum);
}

export function calculateClimateAssessment(temperature, uvIndex) {
  const assessment = calculateClimateRisk(temperature, uvIndex);
  return {
    riskLevel: assessment.riskLevel,
    safetyAdvice: assessment.advice,
  };
}

export function calculateEsgRisk(carbonData) {
  if (!carbonData) return 0;

  const forecast = Number(carbonData.forecast ?? carbonData.actual ?? 0);
  const index = String(carbonData.index ?? "").toLowerCase();

  return calculateSharedEsgRisk(forecast, index).riskLevel;
}

export function evaluateDecision({ healthAlert, climate, carbonData }) {
  const healthRisk = clamp(healthAlert?.riskScore, 0, 100);
  const climateRisk = clamp(climate?.riskLevel, 0, 5);
  const esgRisk = calculateEsgRisk(carbonData);
  const gate = evaluateDecisionGate(
    healthRisk,
    DECISION_THRESHOLDS.health,
    climateRisk,
    esgRisk,
  );
  const inputs = {
    health: {
      value: healthRisk,
      threshold: DECISION_THRESHOLDS.health,
      triggered: gate.publishHealth,
    },
    climate: {
      value: climateRisk,
      threshold: DECISION_THRESHOLDS.climate,
      triggered: gate.publishClimate,
    },
    esg: {
      value: esgRisk,
      threshold: DECISION_THRESHOLDS.esg,
      triggered: gate.publishEsg,
    },
  };

  return {
    inputs,
    shouldPublish: gate.shouldPublish,
  };
}

export function getHealthRiskLabel(score) {
  if (score < DECISION_THRESHOLDS.health) return "Low signal";
  if (score <= 70) return "Elevated signal";
  return "High signal";
}
