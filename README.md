# AgriHer Hackathon Stack

Practical reference implementation that combines a FastAPI backend, React+Vite frontend, MongoDB Atlas, and lightweight ML services powered by PyTorch and scikit-learn. Focus is on getting a compelling hackathon demo live quickly: crop disease detection, career guidance, entrepreneurship builder, SOS + live tracking, mentorship, and schemes navigator.

## Prerequisites
- Python 3.10+ with `pip`
- Node.js 18+ / npm
- MongoDB Atlas cluster (or local Mongo on `mongodb://localhost:27017`)
- Optional: CUDA GPU for training the crop model

Copy `.env.example` to `.env` and adjust credentials (MongoDB, Twilio, model paths).

## Backend
```bash
cd backend
python -m venv .venv
. .venv/Scripts/activate  # PowerShell: .\\.venv\\Scripts\\Activate.ps1
pip install -r app/requirements.txt
uvicorn app.main:app --reload --port 8000
```

Key endpoints:
- `POST /ml/detect` – crop disease inference (fallback if model missing)
- `POST /career/recommend` – ML/rule-based career paths
- `POST /business/generate` – entrepreneurship plan builder
- `POST /schemes/match` – filters seeded schemes
- `GET /mentors/` + `POST /mentors/request` – mentorship flow
- `WS /safety/ws/sos` – WebSocket real-time SOS relay

Training helpers live in `backend/app/ml/`. Run them after arranging a small dataset to refresh models.

## Frontend
```bash
cd frontend/agriher-frontend
npm install
npm run dev -- --host
```

Routes/pages include:
- Landing with feature highlights
- Crop detection uploader
- Career navigator & learning journey
- Entrepreneurship builder + printable plan
- SOS dashboard with live WebSocket feed
- Mentor directory and schemes explorer

TailwindCSS is configured for rapid UI tweaks.

## Docker
Backend & frontend ship with individual Dockerfiles for quick deployment. Example:
```bash
cd backend
docker build -t agriher-api .
docker run -p 8000:8000 --env-file ../.env agriher-api
```

## Demo Script (48–72h sprint)
1. Career form ➜ recommendation & roadmap
2. Business plan generator ➜ share PDF/screenshot
3. Crop detection ➜ upload demo leaf, show response
4. SOS button ➜ observe WebSocket alert stream
5. Mentor directory + scheme matches ➜ highlight data
6. Wrap with architecture slide + deployment mention

## Testing
- Backend: add FastAPI tests via `pytest` (not included yet); start with health + route smoke tests.
- Frontend: run `npm run lint` to ensure JSX consistency.

## Next Steps / Stretch Ideas
- Swap fallback models with fully trained PyTorch checkpoints
- Integrate Whisper for speech UX, LangChain for scheme Q&A
- Wire push notifications (Firebase) + production SMS/voice via Twilio
- Deploy on Render/Railway (backend) and Vercel/Netlify (frontend)

Happy hacking! Contributions welcome.

