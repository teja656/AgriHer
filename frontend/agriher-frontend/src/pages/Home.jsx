import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";

const stats = [
  { title: "Active women founders", value: "250", subtext: "mentored this year" },
  { title: "Schemes mapped", value: "34", subtext: "state & central" },
  { title: "SOS responses", value: "12min", subtext: "avg escalation time" },
];

const features = [
  {
    title: "AI Crop & Soil Doctor",
    detail: "Upload a leaf photo, get rapid disease detection & treatment.",
    to: "/crop",
  },
  {
    title: "Career & Entrepreneurship Builder",
    detail: "Personalized paths with business plan templates & mentors.",
    to: "/career",
  },
  {
    title: "Climate Resilience Safety Net",
    detail: "Real-time SOS + geofenced alerts for field operations.",
    to: "/sos",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 p-10 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">
          Climate-smart · Women-first · AI-native
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-snug sm:text-5xl">
          Build and scale your agri startup with AI, not guesswork.
        </h1>
        <p className="mt-4 max-w-3xl text-emerald-50">
          AgriHer pulls everything into one clean workspace: crop intelligence,
          plug-and-play business blueprints, curated mentors, scheme matching, and
          safety rails — so you can ship impact from day one.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/career"
            className="rounded-full bg-white px-6 py-3 text-emerald-700 font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            Start founder demo
          </Link>
          <Link
            to="/crop"
            className="rounded-full border border-white/40 px-6 py-3 text-white hover:bg-white/10 hover:-translate-y-0.5 transition"
          >
            Launch AI Crop Doctor
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.to}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-xs uppercase tracking-widest text-emerald-600">
              Feature
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{feature.detail}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

