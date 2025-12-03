from __future__ import annotations

import io
import os
from pathlib import Path
from typing import Optional

import torch
import torchvision.transforms as T
from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image


router = APIRouter()

MODELS_DIR = Path(__file__).resolve().parents[2] / "models"
MODEL_PATH = Path(os.getenv("CROP_MODEL_PATH", MODELS_DIR / "crop_model.pth"))
LABELS = ["healthy", "leaf_blight", "leaf_mold", "nitrogen_deficient"]
_MODEL: Optional[torch.nn.Module] = None


def _load_model() -> Optional[torch.nn.Module]:
    if not MODEL_PATH.exists():
        return None
    model = torch.hub.load("pytorch/vision:v0.15.2", "resnet18", pretrained=False)
    num_ftrs = model.fc.in_features
    model.fc = torch.nn.Linear(num_ftrs, len(LABELS))
    state = torch.load(MODEL_PATH, map_location="cpu")
    model.load_state_dict(state)
    model.eval()
    return model


def _transform(image_bytes: bytes) -> torch.Tensor:
    transforms = T.Compose(
        [
            T.Resize((224, 224)),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return transforms(image).unsqueeze(0)


@router.on_event("startup")
async def startup_event():
    global _MODEL
    try:
        _MODEL = _load_model()
    except Exception as exc:
        print("Crop model load failed:", exc)
        _MODEL = None


@router.post("/detect")
async def detect_crop(file: UploadFile = File(...)):
    if file.content_type not in {"image/png", "image/jpeg", "image/jpg"}:
        raise HTTPException(status_code=400, detail="Upload a PNG or JPEG image.")
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Empty file.")
    if _MODEL is None:
        return {
            "label": "healthy",
            "confidence": 0.55,
            "advice": "Demo fallback — looks healthy. Provide sunlight & monitor weekly.",
        }
    tensor = _transform(content)
    with torch.no_grad():
        out = _MODEL(tensor)
        probs = torch.nn.functional.softmax(out, dim=1)
        conf, idx = torch.max(probs, 1)
        label = LABELS[idx.item()]
    return {
        "label": label,
        "confidence": round(float(conf.item()), 4),
        "advice": f"Suggested treatment for {label}. Add to Agronomy notebook.",
    }


