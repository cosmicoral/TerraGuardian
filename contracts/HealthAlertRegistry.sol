// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HealthAlertRegistry {
    struct HealthAlert {
        string source;
        string region;
        string disease;
        uint256 riskScore;
        string summary;
        uint256 timestamp;
    }

    struct ClimateAlert {
        uint256 alertId;
        string city;
        int256 temperature; // °C × 10
        uint8 humidity; // 0-100
        uint8 uvIndex; // 0-20
        uint8 riskLevel; // 1-5
        string safetyAdvice;
        string dataSource;
        bytes32 evidenceHash;
        uint256 timestamp;
        address publisher;
    }

    HealthAlert[] public healthAlerts;
    ClimateAlert[] public climateAlerts;
    mapping(string => ClimateAlert[]) private cityClimateAlerts;

    event HealthAlertRecorded(
        uint256 indexed alertId,
        string source,
        string region,
        string disease,
        uint256 riskScore,
        string summary,
        uint256 timestamp
    );

    event ClimateAlertRecorded(
        uint256 indexed alertId,
        string indexed city,
        uint8 riskLevel,
        int256 temperature,
        bytes32 evidenceHash,
        uint256 timestamp,
        address indexed publisher
    );

    function recordAlert(
        string memory source,
        string memory region,
        string memory disease,
        uint256 riskScore,
        string memory summary
    ) external {
        _recordHealthAlert(source, region, disease, riskScore, summary);
    }

    function onReport(bytes calldata report) external {
        (
            string memory source,
            string memory region,
            string memory disease,
            uint256 riskScore,
            string memory summary
        ) = abi.decode(report, (string, string, string, uint256, string));

        _recordHealthAlert(source, region, disease, riskScore, summary);
    }

    function recordClimateAlert(
        string memory city,
        int256 temperature,
        uint8 humidity,
        uint8 uvIndex,
        uint8 riskLevel,
        string memory safetyAdvice,
        string memory dataSource,
        bytes32 evidenceHash
    ) external returns (uint256 alertId) {
        require(bytes(city).length > 0, "City required");
        require(bytes(safetyAdvice).length > 0, "Safety advice required");
        require(bytes(dataSource).length > 0, "Data source required");
        require(humidity <= 100, "Humidity must be <= 100");
        require(uvIndex <= 20, "UV index must be <= 20");
        require(riskLevel >= 1 && riskLevel <= 5, "Risk level must be 1-5");

        alertId = climateAlerts.length;

        ClimateAlert memory newAlert = ClimateAlert({
            alertId: alertId,
            city: city,
            temperature: temperature,
            humidity: humidity,
            uvIndex: uvIndex,
            riskLevel: riskLevel,
            safetyAdvice: safetyAdvice,
            dataSource: dataSource,
            evidenceHash: evidenceHash,
            timestamp: block.timestamp,
            publisher: msg.sender
        });

        climateAlerts.push(newAlert);
        cityClimateAlerts[city].push(newAlert);

        emit ClimateAlertRecorded(
            alertId,
            city,
            riskLevel,
            temperature,
            evidenceHash,
            block.timestamp,
            msg.sender
        );
    }

    function getAlert(uint256 alertId) external view returns (HealthAlert memory) {
        return healthAlerts[alertId];
    }

    function getAlertCount() external view returns (uint256) {
        return healthAlerts.length;
    }

    function getLatestAlert() external view returns (HealthAlert memory) {
        require(healthAlerts.length > 0, "No health alerts");
        return healthAlerts[healthAlerts.length - 1];
    }

    function getClimateAlert(uint256 alertId) external view returns (ClimateAlert memory) {
        return climateAlerts[alertId];
    }

    function getClimateAlertCount() external view returns (uint256) {
        return climateAlerts.length;
    }

    function getLatestClimateAlert() external view returns (ClimateAlert memory) {
        require(climateAlerts.length > 0, "No climate alerts");
        return climateAlerts[climateAlerts.length - 1];
    }

    function getClimateAlertsByCity(string memory city) external view returns (ClimateAlert[] memory) {
        return cityClimateAlerts[city];
    }

    function _recordHealthAlert(
        string memory source,
        string memory region,
        string memory disease,
        uint256 riskScore,
        string memory summary
    ) internal {
        require(riskScore <= 100, "Risk score must be <= 100");
        require(bytes(source).length > 0, "Source required");
        require(bytes(region).length > 0, "Region required");
        require(bytes(disease).length > 0, "Disease required");
        require(bytes(summary).length > 0, "Summary required");

        healthAlerts.push(HealthAlert({
            source: source,
            region: region,
            disease: disease,
            riskScore: riskScore,
            summary: summary,
            timestamp: block.timestamp
        }));

        emit HealthAlertRecorded(
            healthAlerts.length - 1,
            source,
            region,
            disease,
            riskScore,
            summary,
            block.timestamp
        );
    }
}