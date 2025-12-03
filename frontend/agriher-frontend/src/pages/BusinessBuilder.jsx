import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export default function BusinessBuilder() {
  const [form, setForm] = useState({
    name: "Teja",
    idea: "Millet snacks collective",
    capital: 200000,
    sustainability_focus: true,
  });
  const [plan, setPlan] = useState(null);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${API_URL}/business/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setPlan(await res.json());
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 lg:grid-cols-2"
      >
        <label className="block text-sm font-medium text-slate-700">
          Your name
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 p-2"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Venture idea
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 p-2"
            value={form.idea}
            onChange={(e) => updateField("idea", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Capital (₹)
          <input
            type="number"
            className="mt-1 w-full rounded-lg border border-slate-200 p-2"
            value={form.capital}
            onChange={(e) => updateField("capital", Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.sustainability_focus}
            onChange={(e) =>
              updateField("sustainability_focus", e.target.checked)
            }
          />
          Highlight sustainability strategy
        </label>
        <button className="rounded-full bg-emerald-600 px-6 py-3 text-white lg:col-span-2">
          Generate plan
        </button>
      </form>

      {plan && (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-2xl font-semibold text-slate-900">{plan.title}</h3>
          <p className="text-slate-600">{plan.overview}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-500">
                Investment Estimate
              </p>
              <p className="text-2xl font-semibold">{plan.investment_estimate}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-500">
                Revenue Estimate
              </p>
              <p className="text-2xl font-semibold">{plan.revenue_estimate}</p>
            </div>
          </div>
          <div>
            <p className="font-medium text-slate-800">Execution steps</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
              {plan.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-medium text-slate-800">Risks</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {plan.risks.map((risk) => (
                  <li key={risk}>{risk}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-800">Resilience plan</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {plan.resilience_plan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

