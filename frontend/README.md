# TerraGuardian Frontend

Premium React dashboard for the TerraGuardian Encode Club Remix AI Bootcamp final project.

## Data boundaries

- Health records are read from the configured Ethereum Sepolia registry.
- Climate records use the latest registry entry when available and otherwise use live Open-Meteo data.
- Carbon-intensity data is read from the UK Carbon Intensity API.
- The Decision Gate is a client-side threshold preview, not a CRE execution receipt.
- The zkVerify panel displays one historical independent Groth16 submission.

Read operations use a public JSON-RPC provider and do not request wallet access. The current frontend does not expose contract writes.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Optional configuration

```text
VITE_SEPOLIA_RPC_URL=
VITE_HEALTH_ALERT_REGISTRY_ADDRESS=
```
