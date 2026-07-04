import { BrowserProvider, Contract } from "ethers";
import contractJson from "./abi/HealthAlertRegistry.json";

const CONTRACT_ADDRESS = "0x54910B770A045c04672Cb53Db4b0b80812237370";

export async function getContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();

  return new Contract(
    CONTRACT_ADDRESS,
    contractJson.abi,
    signer
  );
}

export async function getLatestAlert() {
  const contract = await getContract();

  const count = await contract.getAlertCount();

  if (count === 0n) {
    return null;
  }

  const latest = await contract.getAlert(count - 1n);

  return {
    source: latest.source,
    region: latest.region,
    disease: latest.disease,
    riskScore: Number(latest.riskScore),
    summary: latest.summary,
    timestamp: Number(latest.timestamp),
  };
}

export async function getLatestClimateAlert() {
  const contract = await getContract();

  const count = await contract.getClimateAlertCount();

  if (count === 0n) {
    return null;
  }

  const latest = await contract.getLatestClimateAlert();

  return {
    alertId: Number(latest.alertId),
    city: latest.city,
    temperature: Number(latest.temperature) / 10,
    humidity: Number(latest.humidity),
    uvIndex: Number(latest.uvIndex),
    riskLevel: Number(latest.riskLevel),
    safetyAdvice: latest.safetyAdvice,
    dataSource: latest.dataSource,
    evidenceHash: latest.evidenceHash,
    timestamp: Number(latest.timestamp),
    publisher: latest.publisher,
  };
}