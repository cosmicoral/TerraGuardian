import Info from "./Info";

function ClimateModule({ climate, chainClimate }) {
  const data = chainClimate || climate;

  const updatedAt = data?.timestamp
    ? new Date(data.timestamp * 1000).toLocaleString()
    : climate?.time || "Live API response";

  return (
    <section className="mt-6 rounded-[2rem] border border-amber-500/30 bg-amber-950/20 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Climate Risk Module
          </p>
          <h2 className="mt-2 text-xl font-bold">London Heatwave Intelligence</h2>
        </div>

        <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-300">
          {chainClimate ? "On-chain Climate Alert" : climate ? "Live Climate Data" : "Loading"}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <Info label="City" value={data?.city || "Loading"} />
        <Info label="Temperature" value={data ? `${data.temperature}°C` : "Loading"} />
        <Info label="Humidity" value={data ? `${data.humidity}%` : "Loading"} />
        <Info label="Wind Speed" value={climate?.windSpeed ? `${climate.windSpeed} km/h` : "Loading"} />
        <Info label="UV Index" value={climate?.uvIndex ?? "Loading"} />
        <Info label="Risk Level" value={data ? `${data.riskLevel}/5` : "Loading"} />
        <Info label="Updated" value={updatedAt} />
        <Info label="Data Source" value={data?.dataSource || data?.source || "Open-Meteo API"} />
      </div>

      <div className="mt-5 rounded-3xl border border-slate-800 bg-black/30 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
          Safety Advice
        </p>

        <p className="mt-4 text-lg leading-8 text-slate-200">
          {data?.safetyAdvice || "Fetching climate risk data from Open-Meteo..."}
        </p>

        <p className="mt-4 text-sm text-slate-500">
          Source: {data?.dataSource || data?.source || "Open-Meteo API"}
        </p>
      </div>
    </section>
  );
}

export default ClimateModule;