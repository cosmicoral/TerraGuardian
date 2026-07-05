# 🌍 Environmental Health Intelligence Agent

![Solidity](https://img.shields.io/badge/Solidity-0.8.20-black)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![Chainlink](https://img.shields.io/badge/Chainlink-CRE-blue)
![Gemini](https://img.shields.io/badge/Gemini-2.5-orange)
![Sepolia](https://img.shields.io/badge/Sepolia-Testnet-purple)


An AI-powered environmental intelligence agent that combines public health data, live climate observations, Chainlink CRE workflows, Gemini 2.5 Flash, Solidity smart contracts, and a React dashboard to monitor real-world risks and publish selected alerts to the Sepolia test network.

The project demonstrates how multiple real-world data sources can be analyzed by AI and evaluated through deterministic decision logic before being recorded on-chain.
--------
## Workflow Architecture

<img width="1017" height="439" alt="Workflow Architecture" src="https://github.com/user-attachments/assets/b67c3b01-ea08-49d8-8734-f38edbf6c63a">

---
## Features

- ✅ CDC Open Data integration
- ✅ Open-Meteo climate monitoring
- ✅ Gemini 2.5 Flash risk analysis
- ✅ Dual-source decision gate
- ✅ Chainlink CRE workflow simulation
- ✅ Solidity smart contract registry
- ✅ Sepolia deployment
- ✅ React dashboard with live on-chain data

---

# Workflow

```

CDC Open Data        Open-Meteo API
       \               /
        \             /
         ▼           ▼
      Gemini Analysis
              │
              ▼
      Decision Gate
              │
              ▼
     Chainlink CRE Workflow
              │
              ▼
   HealthAlertRegistry.sol
              │
              ▼
           Sepolia
              │
              ▼
      React Dashboard

```

---
## Current Agent Workflow

1. A Chainlink CRE workflow starts the monitoring process.

2. Fetch public health data from CDC Open Data.

3. Fetch live weather observations from Open-Meteo.

4. Gemini evaluates health-related indicators.

5. A deterministic decision gate evaluates:

   - Health risk
   - Climate risk

6. If either threshold is exceeded:

   - prepare the alert payload
   - publish to the deployed Solidity contract on Sepolia

7. Otherwise:

   - skip blockchain publication

8. The React dashboard reads the latest alerts directly from the deployed smart contract.

# Agent Decision Logic

The workflow evaluates two independent signals before publishing an alert.

Health Decision

AI riskScore >= alertThreshold

Climate Decision

climateRisk >= climateThreshold

If either condition evaluates to true, the workflow prepares an encoded report and publishes it through Chainlink CRE to the HealthAlertRegistry contract on Sepolia.

Otherwise the workflow exits without generating an on-chain transaction.

---

# Smart Contract

`HealthAlertRegistry.sol`

## Functions

### recordAlert()

Stores a manually submitted health alert.

### onReport()

Receives encoded reports from Chainlink CRE.

### getAlert()

Returns a specific alert.

### getAlertCount()

Returns the total number of alerts.

---

# Dashboard

Dashboard modules

• Public Health Intelligence

• Climate Risk Intelligence

• Agent Decision Gate

• Workflow Visualization

• On-chain Registry

• AI Summary

All displayed data is read directly from the deployed Sepolia contract using **viem**.

---

# Tech Stack

### Blockchain

- Solidity

- Sepolia

- Viem

### AI

- Gemini 2.5 Flash

### Chainlink

- Chainlink CRE

- Scaffold CRE

### Frontend

- React

- Vite

### Data

- CDC Open Data API
- Open-Meteo Weather API

### Future

Future

- EU Climate Data

- Copernicus Climate Service

- Air Quality APIs

- Flood Monitoring

- Wildfire Monitoring

- zkVerify

- The Graph

- ESG Indicators

---

# Project Status

| Component | Status |

|-----------|--------|

| CDC API | ✅ |

| Gemini Analysis | ✅ |

| Chainlink CRE Workflow | ✅ |

| Workflow Simulation | ✅ |

| Solidity Contract | ✅ |

| Frontend ↔ Solidity | ✅ |

| Sepolia Deployment | ✅ |

| CRE Deployment Access | ⏳ Waiting |

---

# Future Roadmap

## Phase 1 — Public Health

- Disease outbreak monitoring

- AI-generated summaries

- On-chain registry

## Phase 2 — Environmental Intelligence

- Heatwave monitoring

- Air quality

- Water quality

- Wildfire monitoring

## Phase 3 — ESG

- Carbon monitoring

- Renewable energy

- Sustainability indicators

## Phase 4 — Verifiable AI

- zkVerify

- Proof-backed AI outputs

- Cross-chain verification

---

# Repository Structure

```

contracts/

    HealthAlertRegistry.sol

frontend/

    src/

        services/

        components/

workflow-environmental-health-intelligence-agent/

    workflow.ts

    config/

    workflow.yaml

```

---

# Current Demo

The current prototype monitors both public health and climate signals before deciding whether an on-chain alert should be published.

| Component | Current Demo |
|-----------|--------------|
| Health Source | CDC Open Data |
| Climate Source | Open-Meteo Weather API |
| AI Model | Gemini 2.5 Flash |
| Decision Gate | Health Risk + Climate Risk Threshold |
| Workflow Engine | Chainlink CRE |
| Blockchain | Sepolia Testnet |
| Smart Contract | HealthAlertRegistry.sol |

### Example Output

| Field | Value |
|------|------|
| Disease | COVID-19 |
| Region | United States |
| AI Risk Score | 13 / 100 |
| London Temperature | 21.4 °C |
| Humidity | 64 % |
| UV Index | 0 |
| Climate Risk | 1 / 5 (Low) |
| Data Source | CDC Open Data + Open-Meteo + Gemini |
| Workflow Decision | Skipped (Below Thresholds) |
| Network | Sepolia |

---

# Next Milestone

After Chainlink approves deployment access, this workflow will transition from local simulation to a fully deployed Chainlink CRE workflow capable of automatically writing AI-generated public health alerts to the Sepolia blockchain.
