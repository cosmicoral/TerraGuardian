import galaxyMesh from "./assets/galaxy-mesh.svg";
import ClimateModule from "./components/ClimateModule";
import DecisionGate from "./components/DecisionGate";
import ESGModule from "./components/ESGModule";
import Header from "./components/Header";
import HealthModule from "./components/HealthModule";
import ModuleGrid from "./components/ModuleGrid";
import Workflow from "./components/Workflow";
import ZkVerifyCard from "./components/ZkVerifyCard";
import { useDashboardData } from "./hooks/useDashboardData";

function App() {
  const dashboard = useDashboardData();

  return (
    <main className="app-shell" aria-busy={dashboard.loading}>
      <img className="app-shell__mesh" src={galaxyMesh} alt="" />
      <div className="app-shell__glow app-shell__glow--one" />
      <div className="app-shell__glow app-shell__glow--two" />
      <div className="page-frame">
        <Header lastUpdated={dashboard.lastUpdated} loading={dashboard.loading} onRefresh={dashboard.refresh} />
        <HealthModule healthAlert={dashboard.healthAlert} loading={dashboard.loading} error={dashboard.errors.healthAlert} />
        <ClimateModule climate={dashboard.climate} climateSource={dashboard.climateSource} loading={dashboard.loading} error={dashboard.errors.liveClimate ?? dashboard.errors.recordedClimate} />
        <ESGModule carbonData={dashboard.carbonData} loading={dashboard.loading} error={dashboard.errors.carbonData} />
        <DecisionGate healthAlert={dashboard.healthAlert} climate={dashboard.climate} carbonData={dashboard.carbonData} />
        <ZkVerifyCard />
        <Workflow />
        <ModuleGrid />
      </div>
    </main>
  );
}

export default App;
