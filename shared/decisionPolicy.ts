export const DECISION_THRESHOLDS = Object.freeze({
  health: 30,
  climate: 3,
  esg: 3,
});

export type RiskAssessment = {
  riskLevel: number;
  advice: string;
};

export type DecisionGateResult = {
  publishHealth: boolean;
  publishClimate: boolean;
  publishEsg: boolean;
  shouldPublish: boolean;
};

export function calculateClimateRisk(
  temperature: number,
  uvIndex: number,
): RiskAssessment {
  if (temperature >= 35 || uvIndex >= 8) {
    return {
      riskLevel: 5,
      advice:
        "Extreme heat or UV risk. Avoid outdoor activity during peak hours.",
    };
  }

  if (temperature >= 30 || uvIndex >= 6) {
    return {
      riskLevel: 4,
      advice: "High heat or UV risk. Reduce prolonged outdoor exposure.",
    };
  }

  if (temperature >= 26 || uvIndex >= 4) {
    return {
      riskLevel: 3,
      advice:
        "Moderate heat risk. Stay hydrated and check vulnerable groups.",
    };
  }

  if (temperature >= 22) {
    return {
      riskLevel: 2,
      advice: "Mild heat risk. Continue normal precautions.",
    };
  }

  return {
    riskLevel: 1,
    advice: "Normal conditions. Monitor local weather updates.",
  };
}

export function calculateEsgRisk(
  forecast: number,
  index: string,
): RiskAssessment {
  if (index === "very high" || forecast >= 300) {
    return {
      riskLevel: 5,
      advice:
        "Very high carbon intensity. Delay non-critical energy-intensive workloads.",
    };
  }

  if (index === "high" || forecast >= 200) {
    return {
      riskLevel: 4,
      advice:
        "High carbon intensity. Consider reducing non-essential electricity usage.",
    };
  }

  if (index === "moderate" || forecast >= 100) {
    return {
      riskLevel: 3,
      advice: "Moderate carbon intensity. Continue monitoring grid conditions.",
    };
  }

  return {
    riskLevel: 1,
    advice:
      index === "low"
        ? "Low carbon intensity. Good time for energy-efficient operations."
        : "Carbon intensity is within normal operating conditions.",
  };
}

export function evaluateDecisionGate(
  healthRiskScore: number,
  healthThreshold: number,
  climateRiskLevel: number,
  esgRiskLevel: number,
): DecisionGateResult {
  const publishHealth = healthRiskScore >= healthThreshold;
  const publishClimate = climateRiskLevel >= DECISION_THRESHOLDS.climate;
  const publishEsg = esgRiskLevel >= DECISION_THRESHOLDS.esg;

  return {
    publishHealth,
    publishClimate,
    publishEsg,
    shouldPublish: publishHealth || publishClimate || publishEsg,
  };
}
