import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export default function Learning() {
  const [journey, setJourney] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/learning/demo_user`)
      .then((res) => res.json())
      .then(setJourney);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-slate-900">
        Personalized Learning
      </h2>
      {journey ? (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm uppercase tracking-widest text-emerald-600">
              Modules
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
              {journey.modules?.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-slate-500">
              Progress: {(journey.progress * 100).toFixed(0)}%
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm uppercase tracking-widest text-emerald-600">
              Real stories & deep dives
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>
                <a
                  href="https://www.youtube.com/watch?v=Yp5n3_akG5I"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  How a woman farmer built an organic brand from 2 acres
                </a>
                <span className="ml-1 text-xs text-slate-500">
                  · YouTube case study
                </span>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=iFRAUz3Efo8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  FPO & collective models for women in agriculture
                </a>
                <span className="ml-1 text-xs text-slate-500">
                  · NABARD / FPO explainer
                </span>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=hgJmJz-kMGY"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  Turning value-added products into a rural D2C brand
                </a>
                <span className="ml-1 text-xs text-slate-500">
                  · Women-led agri startup journey
                </span>
              </li>
              <li>
                <a
                  href="https://www.myscheme.gov.in/search?query=women%20entrepreneur"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  Central & state schemes for women agri‑entrepreneurs
                </a>
                <span className="ml-1 text-xs text-slate-500">
                  · myScheme.gov curated search
                </span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <p className="text-slate-500">Loading journey...</p>
      )}
    </div>
  );
}

