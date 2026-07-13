# zkVerify Integration Boundary

## Current implementation

The `zkverify/` directory is an independent Groth16 demonstration pipeline:

1. `generate-input.js` creates fixed sample scores and a Poseidon commitment.
2. `decision_hash.circom` proves knowledge of the commitment preimage.
3. snarkjs artifacts under `build/` provide the proof, public signal, and verification key.
4. `submit-proof.js` submits those artifacts to zkVerify Volta in verify-only mode.
5. `verification-summary.json` records one historical finalized submission.

## Explicit non-integration

The Chainlink CRE workflow does not invoke this pipeline. It does not generate a Groth16 proof, call zkVerify, receive a statement hash, or store a zkVerify receipt on Ethereum Sepolia.

The historical zkVerify transaction displayed by the React dashboard is not linked to the latest health alert or a current CRE execution.

## Circuit statement

The current circuit proves knowledge of `decisionSecret` such that:

```text
Poseidon(decisionSecret) == decisionHash
```

It does not enforce health, climate, or carbon thresholds and does not attest to Gemini correctness or source-data authenticity.

## Future integration boundary

A future integration would need a canonical decision encoding, circuit constraints for the claimed policy, a receipt or inclusion-proof flow, and an authenticated on-chain consumer. None of those capabilities are claimed by the current demo.
