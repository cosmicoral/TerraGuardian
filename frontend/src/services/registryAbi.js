export const registryAbi = [
  "function getAlertCount() view returns (uint256)",
  "function getLatestAlert() view returns ((string source, string region, string disease, uint256 riskScore, string summary, uint256 timestamp))",
  "function getClimateAlertCount() view returns (uint256)",
  "function getLatestClimateAlert() view returns ((uint256 alertId, string city, int256 temperature, uint8 humidity, uint8 uvIndex, uint8 riskLevel, string safetyAdvice, string dataSource, bytes32 evidenceHash, uint256 timestamp, address publisher))",
];
