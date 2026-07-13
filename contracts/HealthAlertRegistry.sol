// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HealthAlertRegistry
 * @notice Demonstration registry for health, climate, and environmental
 *         decision records.
 * @dev This contract intentionally has no access control. Records are
 *      caller-submitted data and do not, by themselves, prove Chainlink CRE
 *      provenance, source-data authenticity, or zkVerify verification.
 */
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
        int256 temperature; // Degrees Celsius multiplied by 10.
        uint8 humidity; // Percentage from 0 to 100.
        uint8 uvIndex; // Demonstration range from 0 to 20.
        uint8 riskLevel; // Demonstration risk level from 1 to 5.
        string safetyAdvice;
        string dataSource;
        bytes32 evidenceHash; // Caller-supplied reference to external evidence.
        uint256 timestamp;
        address publisher; // Direct msg.sender; not an authenticated data source.
    }

    struct EnvironmentalDecisionAlert {
        // Reserved for a future combined-decision integration. The current CRE
        // workflow writes HealthAlert records through onReport.
        uint256 alertId;
        string source;
        string region;
        string disease;
        uint256 healthRisk;
        uint8 climateRisk;
        uint8 esgRisk;
        bytes32 proofHash; // Caller-supplied proof reference; not verified on-chain.
        string summary;
        uint256 timestamp;
        address publisher; // Direct msg.sender; not proof of CRE provenance.
    }

    // Append-only demonstration records. Array indexes are the canonical IDs.
    HealthAlert[] public healthAlerts;
    ClimateAlert[] public climateAlerts;
    EnvironmentalDecisionAlert[] public environmentalDecisionAlerts;

    // Full climate records are grouped by exact, case-sensitive city strings.
    mapping(string => ClimateAlert[]) private cityClimateAlerts;

    /**
     * @notice Emitted when a health alert is appended.
     * @dev This event does not assert who produced or approved the source data.
     */
    event HealthAlertRecorded(
        uint256 indexed alertId,
        string source,
        string region,
        string disease,
        uint256 riskScore,
        string summary,
        uint256 timestamp
    );

    /**
     * @notice Emitted when a caller submits a climate alert.
     * @dev publisher is msg.sender and evidenceHash is an unverified reference.
     */
    event ClimateAlertRecorded(
        uint256 indexed alertId,
        string indexed city,
        uint8 riskLevel,
        int256 temperature,
        bytes32 evidenceHash,
        uint256 timestamp,
        address indexed publisher
    );

    /**
     * @notice Emitted when a caller submits a combined environmental decision.
     * @dev proofHash is stored as metadata; no proof verification occurs here.
     */
    event EnvironmentalDecisionAlertRecorded(
        uint256 indexed alertId,
        string region,
        string disease,
        uint256 healthRisk,
        uint8 climateRisk,
        uint8 esgRisk,
        bytes32 proofHash,
        uint256 timestamp,
        address indexed publisher
    );

    /**
     * @notice Appends a health alert submitted directly by the caller.
     */
    function recordAlert(
        string memory source,
        string memory region,
        string memory disease,
        uint256 riskScore,
        string memory summary
    ) external {
        _recordHealthAlert(source, region, disease, riskScore, summary);
    }

    /**
     * @notice Decodes and stores the health-alert payload used by the demo CRE
     *         workflow.
     * @dev This entry point is permissionless and does not validate a CRE
     *      forwarder or report signature.
     */
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

    /**
     * @notice Appends caller-supplied climate decision metadata.
     */
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

        ClimateAlert memory climateAlert = ClimateAlert({
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

        climateAlerts.push(climateAlert);
        cityClimateAlerts[city].push(climateAlert);

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

    /**
     * @notice Appends caller-supplied Environmental Decision metadata.
     * @dev A nonzero proofHash is required as a reference, but is not verified.
     */
    function recordEnvironmentalDecisionAlert(
        string memory source,
        string memory region,
        string memory disease,
        uint256 healthRisk,
        uint8 climateRisk,
        uint8 esgRisk,
        bytes32 proofHash,
        string memory summary
    ) external returns (uint256 alertId) {
        require(bytes(source).length > 0, "Source required");
        require(bytes(region).length > 0, "Region required");
        require(bytes(disease).length > 0, "Disease required");
        require(bytes(summary).length > 0, "Summary required");
        require(healthRisk <= 100, "Health risk must be <= 100");
        require(climateRisk >= 1 && climateRisk <= 5, "Climate risk must be 1-5");
        require(esgRisk >= 1 && esgRisk <= 5, "ESG risk must be 1-5");
        require(proofHash != bytes32(0), "Proof hash required");

        alertId = environmentalDecisionAlerts.length;

        environmentalDecisionAlerts.push(
            EnvironmentalDecisionAlert({
                alertId: alertId,
                source: source,
                region: region,
                disease: disease,
                healthRisk: healthRisk,
                climateRisk: climateRisk,
                esgRisk: esgRisk,
                proofHash: proofHash,
                summary: summary,
                timestamp: block.timestamp,
                publisher: msg.sender
            })
        );

        emit EnvironmentalDecisionAlertRecorded(
            alertId,
            region,
            disease,
            healthRisk,
            climateRisk,
            esgRisk,
            proofHash,
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

    function getClimateAlertsByCity(
        string calldata city
    ) external view returns (ClimateAlert[] memory) {
        return cityClimateAlerts[city];
    }

    function getEnvironmentalDecisionAlert(
        uint256 alertId
    ) external view returns (EnvironmentalDecisionAlert memory) {
        return environmentalDecisionAlerts[alertId];
    }

    function getEnvironmentalDecisionAlertCount() external view returns (uint256) {
        return environmentalDecisionAlerts.length;
    }

    function getLatestEnvironmentalDecisionAlert()
        external
        view
        returns (EnvironmentalDecisionAlert memory)
    {
        require(environmentalDecisionAlerts.length > 0, "No environmental alerts");
        return environmentalDecisionAlerts[environmentalDecisionAlerts.length - 1];
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

        healthAlerts.push(
            HealthAlert({
                source: source,
                region: region,
                disease: disease,
                riskScore: riskScore,
                summary: summary,
                timestamp: block.timestamp
            })
        );

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
