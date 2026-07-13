 # 🌍 TerraGuardian


![Solidity](https://img.shields.io/badge/Solidity-0.8.20-black)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![Chainlink](https://img.shields.io/badge/Chainlink-CRE-blue)
![Gemini](https://img.shields.io/badge/Gemini-2.5-orange)
![Sepolia](https://img.shields.io/badge/Sepolia-Testnet-purple)
![zkVerify](https://img.shields.io/badge/zkVerify-Volta-success)

> **Verifiable Health, Climate & ESG Intelligence Platform**

TerraGuardian is an AI-powered environmental decision intelligence platform that integrates public health surveillance, climate monitoring, and ESG data into a unified risk assessment workflow.

Powered by **Chainlink CRE**, **Gemini**, **Open-Meteo**, **Carbon Intensity API**, and **native zkVerify Groth16 verification**, TerraGuardian produces transparent, auditable environmental decisions that can be independently verified before publication on-chain.

---

## ✨ Features

- 🩺 Public Health Intelligence (CDC Open Data)
- 🌡️ Climate Risk Monitoring (Open-Meteo API)
- ⚡ ESG Carbon Intensity Monitoring
- 🤖 Gemini-powered Risk Assessment
- ⚖️ Deterministic Decision Engine
- 🔐 Native zkVerify Groth16 Verification
- ⛓️ Chainlink CRE Workflow Automation
- 📜 On-chain Environmental Decision Registry
- 💻 React Dashboard

---
# Workflow

```text
                 CDC Open Data
                      │
                      ▼
        Gemini Health Risk Analysis

Open-Meteo API                    Carbon Intensity API
      │                                   │
      ▼                                   ▼
Climate Risk Logic                 ESG Risk Logic
      │                                   │
      └───────────────┬───────────────────┘
                      │
                      ▼
        Deterministic Decision Gate
      (Health + Climate + ESG Signals)
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
 Chainlink CRE Pipeline     zkVerify Proof Pipeline
          │                       │
          ▼                       ▼
 Generate CRE Report       Generate Groth16 Proof
          │                       │
          ▼                       ▼
 HealthAlertRegistry.sol   Submit to zkVerify Volta
          │                       │
          ▼                       ▼
 Ethereum Sepolia          Proof Finalized
          │                       │
          ▼                       ▼
 React Dashboard           Statement Hash
```

---
The platform combines **AI inference** with **deterministic decision logic**.

- **Gemini 2.5 Flash** analyzes public health data from CDC Open Data.
- **Climate Risk Logic** evaluates live weather conditions from Open-Meteo.
- **ESG Risk Logic** evaluates UK grid carbon intensity from the Carbon Intensity API.
-  A deterministic Decision Gate aggregates all three signals before deciding whether the CRE workflow should publish an alert. The same decision inputs are also used by a separate Groth16 proof pipeline that is independently verified on zkVerify Volta.
- Chainlink CRE publishes approved alerts to the deployed Solidity smart contract on Ethereum Sepolia.
---

# Current Agent Workflow

1. Chainlink CRE starts the monitoring workflow.

2. Fetch public health data from CDC Open Data.

3. Fetch live weather observations from Open-Meteo.

4. Fetch live UK electricity carbon intensity.

5. Gemini analyzes public health indicators.

6. A deterministic decision gate evaluates:

   - Public health risk
   - Climate risk
   - ESG carbon intensity

7. If one or more thresholds are exceeded:

   - generate an environmental decision payload
   - create a deterministic proof commitment
   - publish the approved alert through the deployed Solidity contract

8. The separate zkVerify pipeline:

   - encodes the decision inputs in a Circom circuit
   - generates and locally verifies a Groth16 proof
   - submits the proof to zkVerify Volta Testnet
   - receives a finalized statement hash

9. Otherwise, the CRE workflow skips blockchain publication.

10. The React dashboard reads the latest alerts directly from the deployed Sepolia contract.
---

# Agent Decision Logic

Three independent signals are evaluated before any blockchain transaction is created.

## Public Health

```
riskScore >= healthThreshold
```

## Climate

```
climateRisk >= climateThreshold
```

## ESG

```
esgRisk >= esgThreshold
```

If one or more conditions are satisfied:

```text
Generate Groth16 Proof
        ↓
Submit to zkVerify Volta
        ↓
Proof Finalized
        ↓
Statement Hash
        ↓
Chainlink CRE Workflow
        ↓
HealthAlertRegistry.sol
        ↓
Ethereum Sepolia
```

Otherwise the workflow exits without creating an on-chain transaction.

---

# Why Blockchain?

Large datasets and AI inference remain off-chain.

Only high-value environmental decisions together with proof verification results and immutable timestamps are recorded on-chain.

This provides:

- Immutable audit trail
- Public accountability
- Tamper-resistant environmental decisions
- Transparent AI-assisted governance

Rather than asking users to trust an AI model directly, the blockchain provides a transparent record of the final environmental decision.

---
# Why zkVerify?

The goal of zkVerify is **not** to prove that Gemini is "correct".

Instead, TerraGuardian generates a **Groth16 zero-knowledge proof** representing its deterministic environmental decision workflow.

The proof is submitted to **zkVerify Volta Testnet**, where it is independently verified before producing a finalized **statement hash**.

## Current implementation

- ✅ Groth16 circuit
- ✅ Witness generation
- ✅ Local proof generation
- ✅ Local proof verification
- ✅ Native zkVerify Volta submission
- ✅ Proof finalized
- ✅ Statement hash generated

## Future implementation

- Aggregation receipts
- Merkle inclusion proofs
- Cross-chain proof verification
- On-chain receipt verification

---

# Smart Contract

`HealthAlertRegistry.sol`

## Main Functions

### recordAlert()

Stores an environmental health alert.

### recordClimateAlert()

Stores a climate alert.

### onReport()

Receives reports generated by Chainlink CRE.

### getLatestAlert()

Returns the latest public health alert.

### getLatestClimateAlert()

Returns the latest climate alert.

### recordEnvironmentalDecisionAlert()

Stores a verified environmental decision together with its proof hash and multi-source risk assessment.

---

# Dashboard

Current dashboard modules

- 🦠 Public Health Intelligence
- 🌡️ Climate Risk Intelligence
- 🌱 ESG Carbon Intelligence
- 🧠 AI Risk Summary
- ⚖️ Decision Gate
- 🔐 zkVerify Verification Status
- ⛓️ On-chain Registry

The dashboard retrieves blockchain data directly from the deployed Sepolia contract using **ethers.js**.

---

# Tech Stack

## Blockchain

- Solidity
- Sepolia
- ethers.js

## AI

- Gemini 2.5 Flash

## Chainlink

- Chainlink CRE
- Scaffold CRE

## Frontend

- React
- Vite
- Tailwind CSS

## Data Sources

- CDC Open Data API
- Open-Meteo Weather API
- UK National Grid Carbon Intensity API

## Zero Knowledge
- Circom
- Groth16
- snarkjs
- zkVerifyJS
- zkVerify Volta

---

# Project Status

| Component | Status |
|-----------|--------|
| CDC API | ✅ |
| Open-Meteo API | ✅ |
| Carbon Intensity API | ✅ |
| Gemini Analysis | ✅ |
| ESG Module | ✅ |
| Chainlink CRE Workflow | ✅ |
| Workflow Simulation | ✅ |
| Solidity Contract | ✅ |
| Frontend ↔ Smart Contract | ✅ |
| Sepolia Deployment | ✅ |
| Groth16 Circuit | ✅ |
| Proof Generation | ✅ |
| Local Proof Verification | ✅ |
| zkVerify Volta Submission | ✅ |
| zkVerify Finalization | ✅ |
| Statement Hash | ✅ |
| Aggregation Receipt | ⏳ Planned |
| Destination-chain Verification | ⏳ Planned |
| CRE Deployment Access | ⏳ Waiting |

---

# Repository Structure

```text
contracts/
    HealthAlertRegistry.sol

frontend/
    src/
        components/
        services/

workflow-environmental-health-intelligence-agent/
    workflow.ts
    workflow.yaml

zkverify/
    circuits/
    build/
    generate-input.js
    submit-proof.js
```

---

# Current Demo

The current prototype evaluates public health, climate, and ESG signals before deciding whether an environmental alert should be published on-chain.

| Component | Current Demo |
|-----------|--------------|
| Public Health | CDC Open Data |
| Climate | Open-Meteo |
| ESG | UK Carbon Intensity API |
| AI Model | Gemini 2.5 Flash |
| Decision Gate | Health + Climate + ESG |
| Workflow Engine | Chainlink CRE |
| Blockchain | Sepolia |
| Smart Contract | HealthAlertRegistry.sol |
| zkVerify Network | Volta Testnet |
| Proof System | Groth16 |
| Proof Status | ✅ Finalized |

---
# zkVerify Verification

Latest verification result

| Item | Value |
|------|------|
| Network | zkVerify Volta Testnet |
| Proof System | Groth16 |
| Status | ✅ Finalized |
| Transaction Hash | `0x942a124065c32cf758be3c90caaf562545e7b58cee1bba950e4a909747029a2f` |
| Statement Hash | `0xcb17b4b45cc94c05670e0f43c691143fce6f391d88adf7802bd28e2bf1baede5` |

----

# Future Roadmap

## Phase 1 — Public Health

- Disease outbreak monitoring
- AI-generated summaries
- Automated CRE deployment

## Phase 2 — Environmental Intelligence

- Heatwave monitoring
- Air quality
- Water quality
- Wildfire monitoring

## Phase 3 — ESG Intelligence

- Renewable energy indicators
- Grid sustainability metrics
- EU environmental datasets
- Copernicus integration

## Phase 4 — Verifiable AI

- Aggregation receipts
- Cross-chain verification
- On-chain receipt verification
- Production deployment

---

# Vision

We do **not** put AI on-chain.

We put **verifiable trust on-chain**.

Raw datasets, weather observations, ESG metrics, and AI inference remain off-chain for efficiency, while blockchain stores only verifiable environmental decisions together with immutable timestamps and zkVerify proof verification results.

This architecture combines AI scalability with blockchain transparency, creating a verifiable environmental intelligence workflow suitable for future public-sector, climate-tech, and AI governance applications.