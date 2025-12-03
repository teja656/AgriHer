import { useEffect, useRef, useState } from "react";

const WS_URL = import.meta.env.VITE_SOS_WS ?? "ws://localhost:8000/safety/ws/sos";

export default function SOSButton() {
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  function ensureSocket() {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;
    wsRef.current = new WebSocket(WS_URL);
    wsRef.current.onopen = () => setConnected(true);
    wsRef.current.onclose = () => setConnected(false);
    wsRef.current.onerror = () => setConnected(false);
  }

  function sendSOS() {
    ensureSocket();
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const payload = {
          type: "sos",
          user_id: "demo_user",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          message: "Need assistance",
        };
        wsRef.current.send(JSON.stringify(payload));
        alert("SOS dispatched");
      },
      (err) => alert(err.message)
    );
  }

  return (
    <button
      onClick={sendSOS}
      className="rounded-full bg-rose-600 px-6 py-3 text-white shadow-lg transition hover:bg-rose-700"
    >
      {connected ? "Send SOS" : "Connect & Send SOS"}
    </button>
  );
}

