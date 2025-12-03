import os
from typing import Optional

from fastapi import HTTPException

try:
    from twilio.rest import Client
except ImportError:  # optional dependency
    Client = None  # type: ignore


def send_sms_alert(to_number: str, body: str) -> Optional[str]:
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_number = os.getenv("TWILIO_FROM_NUMBER")
    if not all([account_sid, auth_token, from_number]):
        raise HTTPException(
            status_code=400,
            detail="Twilio credentials missing. Set TWILIO_* env vars for SMS alerts.",
        )
    if Client is None:
        raise HTTPException(
            status_code=400, detail="Twilio SDK not installed in this environment."
        )
    client = Client(account_sid, auth_token)
    message = client.messages.create(body=body, from_=from_number, to=to_number)
    return message.sid


