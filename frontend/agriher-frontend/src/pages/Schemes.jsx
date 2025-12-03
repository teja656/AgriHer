import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export default function Schemes() {
  const [filters, setFilters] = useState({
    state: "KA",
    interest_area: "food_processing",
    women_only: true,
  });
  const [schemes, setSchemes] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${API_URL}/schemes/match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    });
    const data = await res.json();
    setSchemes(data.schemes || []);
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 bg-white p-6"
      >
        <label className="text-sm font-medium text-slate-700">
          State
          <input
            className="mt-1 rounded-lg border border-slate-200 p-2"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Interest area
          <select
            className="mt-1 rounded-lg border border-slate-200 p-2"
            value={filters.interest_area}
            onChange={(e) =>
              setFilters({ ...filters, interest_area: e.target.value })
            }
          >
            <option value="food_processing">Food Processing</option>
            <option value="agritech">AgriTech</option>
            <option value="climate">Climate</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={filters.women_only}
            onChange={(e) =>
              setFilters({ ...filters, women_only: e.target.checked })
            }
          />
          Women only
        </label>
        <button className="rounded-full bg-emerald-600 px-6 py-3 text-white">
          Match schemes
        </button>
      </form>

      <div className="grid gap-4">
        {schemes.map((scheme) => (
          <article
            key={scheme.name}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="text-xs uppercase text-emerald-600">Scheme</p>
            <h3 className="text-xl font-semibold text-slate-900">
              {scheme.name}
            </h3>
            <p className="text-sm text-slate-500">
              Support: {scheme.support ?? "TBD"}
            </p>
            <p className="text-xs text-slate-500">
              Eligible states: {scheme.states?.join(", ")}
            </p>
            <p className="text-xs text-slate-400">
              Documents: {scheme.documents?.join(", ")}
            </p>
          </article>
        ))}
        {schemes.length === 0 && (
          <p className="text-slate-500">
            Submit the form above to fetch live, filtered schemes from our database.
          </p>
        )}
      </div>
    </div>
  );
}

