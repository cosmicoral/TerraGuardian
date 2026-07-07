import "./index.css";
import { useEffect, useState } from "react";
import { getLatestAlert, getLatestClimateAlert } from "./services/blockchain";
import { getClimateRisk } from "./services/climate";
import { getCarbonIntensity } from "./services/esg";

import Header from "./components/Header";
import ClimateModule from "./components/ClimateModule";
import HealthModule from "./components/HealthModule";
import ESGModule from "./components/ESGModule";
import DecisionGate from "./components/DecisionGate";
import Workflow from "./components/Workflow";
import ModuleGrid from "./components/ModuleGrid";

function App() {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [climate, setClimate] = useState(null);
  const [chainClimate, setChainClimate] = useState(null);
  const [esg, setEsg] = useState(null);

  useEffect(() => {
    async function loadAlert() {
      try {
        const latest = await getLatestAlert();
        setAlert(latest);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    async function loadClimate() {
      try {
        const latestClimate = await getClimateRisk();
        setClimate(latestClimate);
      } catch (err) {
        console.error(err);
      }
    }

    async function loadChainClimate() {
      try {
        const latest = await getLatestClimateAlert();
        setChainClimate(latest);
      } catch (err) {
        console.error(err);
      }
    }

    async function loadEsg() {
      try {
        const latest = await getCarbonIntensity();
        setEsg(latest);
      } catch (err) {
        console.error(err);
      }
    }

    loadAlert();
    loadClimate();
    loadChainClimate();
    loadEsg();
  }, []);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Header />

        <ClimateModule climate={climate} chainClimate={chainClimate} />
        <ESGModule esg={esg} />

        <HealthModule alert={alert} loading={loading} />

        <DecisionGate alert={alert} climate={chainClimate || climate} esg={esg} />

        <Workflow />

        <ModuleGrid />
      </div>
    </main>
  );
}

export default App;