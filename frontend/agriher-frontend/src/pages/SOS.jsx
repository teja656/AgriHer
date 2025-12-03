import { useEffect, useRef, useState } from "react";
import SOSButton from "../components/SOSButton";

const WS_URL = import.meta.env.VITE_SOS_WS ?? "ws://localhost:8000/safety/ws/sos";

export default function SOS() {
  const [events, setEvents] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket(WS_URL);
    wsRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setEvents((prev) => [data, ...prev].slice(0, 5));
    };
    return () => wsRef.current?.close();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Real-time SOS command
        </h2>
        <p className="text-sm text-slate-600">
          WebSocket feed for hackathon demo — open two tabs and trigger alerts to
          show instant broadcast.
        </p>
        <div className="mt-6">
          <SOSButton />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm uppercase tracking-widest text-emerald-600">
          Live feed
        </p>
        <ul className="mt-4 space-y-3 text-sm text-slate-800">
          {events.map((evt, idx) => (
            <li
              key={idx}
              className="rounded-xl border border-slate-100 bg-slate-50 p-3"
            >
              <p className="font-semibold">{evt.alert}</p>
              <p className="text-xs text-slate-500">
                lat: {evt.data?.lat}, lng: {evt.data?.lng}
              </p>
            </li>
          ))}
          {events.length === 0 && (
            <li className="text-slate-500">No events yet — trigger SOS.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

