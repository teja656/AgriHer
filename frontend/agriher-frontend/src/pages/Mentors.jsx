import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/mentors/`)
      .then((res) => res.json())
      .then(setMentors)
      .catch(() => setMentors([]));
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-semibold text-slate-900">Mentor grid</h2>
        <p className="text-sm text-slate-600">
          Data flows from MongoDB via FastAPI — great point to show integration
          with Atlas.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {mentors.map((mentor) => (
          <article
            key={mentor._id ?? mentor.name}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="text-sm uppercase text-emerald-600">{mentor.state}</p>
            <h3 className="text-xl font-semibold text-slate-900">
              {mentor.name}
            </h3>
            <p className="text-sm text-slate-500">
              {mentor.expertise?.join(", ")}
            </p>
            <p className="text-xs text-slate-400">{mentor.contact}</p>
          </article>
        ))}
        {mentors.length === 0 && (
          <p className="text-slate-500">
            Run `POST /mentors/seed` once to populate demo mentors.
          </p>
        )}
      </div>
    </div>
  );
}

