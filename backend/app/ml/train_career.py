import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier


def train():
    rows = [
        {
            "education": "BSc",
            "experience": 1,
            "land": 1,
            "interest": "farming",
            "label": "Organic Farmer",
        },
        {
            "education": "MBA",
            "experience": 2,
            "land": 0,
            "interest": "business",
            "label": "Food Processing Entrepreneur",
        },
        {
            "education": "BTech",
            "experience": 3,
            "land": 0,
            "interest": "technology",
            "label": "AgriTech Consultant",
        },
    ]
    df = pd.DataFrame(rows)
    X = pd.get_dummies(df[["education", "experience", "land", "interest"]].astype(str))
    y = df["label"]
    clf = RandomForestClassifier()
    clf.fit(X, y)
    payload = {"model": clf, "cols": list(X.columns)}
    joblib.dump(payload, "../../models/career_model.joblib")
    print("Saved career model.")


if __name__ == "__main__":
    train()


