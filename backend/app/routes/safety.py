from fastapi import APIRouter, WebSocket
from twilio.rest import Client
from datetime import datetime
import os

router = APIRouter()

# Twilio config
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH")
TWILIO_FROM = os.getenv("TWILIO_FROM")
SOS_TO = os.getenv("SOS_TO")

# Create Twilio client only if credentials are present, otherwise disable SMS
client: Client | None
if TWILIO_SID and TWILIO_AUTH:
    client = Client(TWILIO_SID, TWILIO_AUTH)
else:
    client = None

class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for conn in self.active_connections:
            await conn.send_text(message)

manager = ConnectionManager()

@router.websocket("/ws/sos")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_text()

            # Broadcast to all clients
            await manager.broadcast(data)

            # Send SMS through Twilio
            send_sos_sms(data)

    except:
        manager.disconnect(websocket)

def send_sos_sms(data: str):
    """Parses incoming SOS message and sends SMS"""
    try:
        # If Twilio isn't configured, just log and skip sending
        if client is None or not TWILIO_FROM or not SOS_TO:
            print("Twilio not configured; skipping SOS SMS. Data:", data)
            return

        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        message_body = f"🚨 SOS Alert!\nTime: {now}\nDetails: {data}"

        client.messages.create(
            body=message_body,
            from_=TWILIO_FROM,
            to=SOS_TO
        )

        print("SOS SMS sent!")

    except Exception as e:
        print("Failed to send SOS SMS:", e)
