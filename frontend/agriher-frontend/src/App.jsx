import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CropDetect from "./pages/CropDetect";
import Career from "./pages/Career";
import BusinessBuilder from "./pages/BusinessBuilder";
import SOS from "./pages/SOS";
import Mentors from "./pages/Mentors";
import Schemes from "./pages/Schemes";
import Learning from "./pages/Learning";

const links = [
  { to: "/", label: "Home" },
  { to: "/crop", label: "Crop Detect" },
  { to: "/career", label: "Career" },
  { to: "/business", label: "Business Builder" },
  { to: "/learning", label: "Learning" },
  { to: "/mentors", label: "Mentors" },
  { to: "/schemes", label: "Schemes" },
  { to: "/sos", label: "SOS" },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-emerald-600">
              AgriHer
            </p>
            <p className="text-xl font-semibold text-slate-800">
              Women-led agri innovation suite
            </p>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1 font-medium ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop" element={<CropDetect />} />
          <Route path="/career" element={<Career />} />
          <Route path="/business" element={<BusinessBuilder />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/sos" element={<SOS />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
