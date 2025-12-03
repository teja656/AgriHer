export default function StatCard({ title, value, subtext }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{subtext}</p>
    </div>
  );
}

