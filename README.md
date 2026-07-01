# Environmental Health Intelligence Agent

A verifiable AI agent for environmental, ESG, and public health monitoring.

This project explores how Chainlink CRE, public real-world data APIs, LLM-based analysis, zkVerify, and Solidity smart contracts can be combined to generate transparent and verifiable risk alerts.

--------
## Workflow Architecture
<img width="1017" height="439" alt="Screenshot 2026-07-02 at 00 57 16" src="https://github.com/user-attachments/assets/b67c3b01-ea08-49d8-8734-f38edbf6c63a" />


---

## Smart Contract

HealthAlertRegistry.sol

- recordAlert()

- getAlert()

- getAlertCount()
- 
## Modules

### Phase 1: Disease Outbreak Monitoring
- Query public health datasets
- Use AI to summarize outbreak risk
- Record alerts on-chain with Solidity

### Phase 2: Environmental & ESG Monitoring
- Heatwave alerts
- Carbon credit / renewable energy verification
- Air quality and water quality monitoring

### Phase 3: zkVerify Integration
- Verify proofs for trusted real-world data
- Consume verified results in smart contracts

## Tech Stack

- Chainlink CRE
- Scaffold CRE
- Remix IDE
- Solidity
- TypeScript
- Public health APIs
- LLM APIs
- zkVerify
