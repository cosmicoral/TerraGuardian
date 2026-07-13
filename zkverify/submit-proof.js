import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import {
  zkVerifySession,
  Library,
  CurveType,
  ZkVerifyEvents,
} from "zkverifyjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readJson(relativePath) {
  const fullPath = path.join(__dirname, relativePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required file: ${fullPath}`);
  }

  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function safeJson(value) {
  return JSON.stringify(
    value,
    (_, item) => (typeof item === "bigint" ? item.toString() : item),
    2
  );
}

async function main() {
  const seedPhrase = process.env.SEED_PHRASE?.trim();

  if (!seedPhrase) {
    throw new Error("Missing SEED_PHRASE in zkverify/.env");
  }

  const proof = readJson("./build/proof.json");
  const publicSignals = readJson("./build/public.json");
  const verificationKey = readJson("./build/verification_key.json");

  console.log("Connecting to zkVerify Volta testnet...");

  const session = await zkVerifySession
    .start()
    .Volta()
    .withAccount(seedPhrase);

  try {
    const account = session.getAccount();

    console.log("Connected account:", account.address);
    console.log("Submitting Groth16 proof...");
    console.log("Public inputs:", publicSignals.length);

    const { events, transactionResult } = await session
      .verify()
      .groth16({
        library: Library.snarkjs,
        curve: CurveType.bn128,
      })
      .execute({
        proofData: {
          vk: verificationKey,
          proof,
          publicSignals,
        },
        // No domainId = verify-only mode.
      });

    events.on(ZkVerifyEvents.IncludedInBlock, (eventData) => {
      console.log("\nIncluded in block:");
      console.log(safeJson(eventData));
    });

    events.on(ZkVerifyEvents.Finalized, (eventData) => {
      console.log("\nFinalized:");
      console.log(safeJson(eventData));
    });

    events.on(ZkVerifyEvents.ErrorEvent, (eventData) => {
      console.error("\nzkVerify error:");
      console.error(safeJson(eventData));
    });

    events.on("error", (error) => {
      console.error("\nTransaction emitter error:");
      console.error(error);
    });

    const result = await transactionResult;

    console.log("\nProof verification completed:");
    console.log(safeJson(result));

    const savedResult = {
      network: "zkVerify Volta Testnet",
      proofSystem: "Groth16",
      library: "snarkjs",
      curve: "bn128",
      account: account.address,
      verifiedAt: new Date().toISOString(),
      result,
    };

    fs.writeFileSync(
      path.join(__dirname, "verification-result.json"),
      safeJson(savedResult)
    );

    console.log("\nSaved verification-result.json");
  } finally {
    await session.close();
  }
}

main().catch((error) => {
  console.error("\nProof submission failed:");
  console.error(error);
  process.exitCode = 1;
});