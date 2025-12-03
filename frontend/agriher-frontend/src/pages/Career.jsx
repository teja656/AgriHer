import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const initialForm = {
  education_level: "BSc Agriculture",
  experience_years: 0,
  land_available: false,
  interest_area: "technology",
  location: "KA",
  capital: 150000,
};

export default function Career() {
  const [form, setForm] = useState(initialForm);
  const [recommendation, setRecommendation] = useState(null);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${API_URL}/career/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setRecommendation(data);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
      >
        <h2 className="text-2xl font-semibold text-slate-900">
          Career Navigator
        </h2>
        <label className="block text-sm font-medium text-slate-700">
          Education level
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 p-2"
            value={form.education_level}
            onChange={(e) => updateField("education_level", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Experience (years)
          <input
            type="number"
            className="mt-1 w-full rounded-lg border border-slate-200 p-2"
            value={form.experience_years}
            onChange={(e) => updateField("experience_years", Number(e.target.value))}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Interest area
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 p-2"
            value={form.interest_area}
            onChange={(e) => updateField("interest_area", e.target.value)}
          >
            <option value="technology">AgriTech</option>
            <option value="farming">Organic Farming</option>
            <option value="business">Food Processing</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.land_available}
            onChange={(e) => updateField("land_available", e.target.checked)}
          />
          Land available
        </label>
        <button className="w-full rounded-full bg-emerald-600 py-3 text-white">
          Generate recommendation
        </button>
      </form>

      {recommendation ? (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-emerald-600">
            Suggested Path
          </p>
          <p className="text-3xl font-semibold text-slate-900">
            {recommendation.career}
          </p>
          <p className="text-sm text-slate-500">{recommendation.reason}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
            {recommendation.roadmap?.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-slate-500">
          Fill the form to preview the ML/rule-based recommendation.
        </div>
      )}
    </div>
  );
}

