# 🌍 Environmental Health Intelligence Agent

![Solidity](https://img.shields.io/badge/Solidity-0.8.20-black)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![Chainlink](https://img.shields.io/badge/Chainlink-CRE-blue)
![Gemini](https://img.shields.io/badge/Gemini-2.5-orange)
![Sepolia](https://img.shields.io/badge/Sepolia-Testnet-purple)


A verifiable AI application that combines **Chainlink CRE**, **Gemini 2.5 Flash**, **Solidity**, and **React** to generate transparent on-chain public health intelligence.

The project demonstrates how real-world data can be analyzed by AI, recorded on-chain, and displayed through a decentralized dashboard.

--------
## Workflow Architecture

<img width="1017" height="439" alt="Workflow Architecture" src="https://github.com/user-attachments/assets/b67c3b01-ea08-49d8-8734-f38edbf6c63a">

---

# Features

✅ CDC Open Data integration

✅ Gemini AI risk analysis

✅ Chainlink CRE workflow

✅ Solidity smart contract

✅ On-chain health registry

✅ React dashboard

✅ Sepolia deployment

---

# Workflow

```

CDC Open Data

        │

        ▼

 Gemini 2.5 Flash

        │

        ▼

 Structured JSON

        │

        ▼

Chainlink CRE Workflow

        │

        ▼

HealthAlertRegistry.sol

        │

        ▼

 Sepolia Testnet

        │

        ▼

 React Dashboard

```

---

# Current Pipeline

1. Chainlink CRE cron trigger starts the workflow.

2. Fetch weekly COVID-19 hospitalization data from CDC Open Data.

3. Gemini 2.5 Flash analyzes the dataset.

4. Gemini returns

- riskScore

- disease

- region

- summary

5. The workflow encodes the AI response.

6. The payload is submitted to the Solidity contract.

7. The React frontend retrieves the latest alert directly from Sepolia.

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

The frontend displays

- Latest Risk Score

- Disease

- Region

- Data Source

- AI Summary

- Workflow Status

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

### Future

- zkVerify

- Environmental APIs

- ESG datasets

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

Current public health example

| Field | Value |

|------|------|

| Disease | COVID-19 |

| Region | United States |

| Risk Score | 10 |

| Source | CDC Open Data + Gemini |

| Network | Sepolia |

---

# Next Milestone

After Chainlink approves deployment access, this workflow will transition from local simulation to a fully deployed Chainlink CRE workflow capable of automatically writing AI-generated public health alerts to the Sepolia blockchain.
