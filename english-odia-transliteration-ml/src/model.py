import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings('ignore')

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# =========================
# LOAD DATA
# =========================
def load_data(path):
    df = pd.read_csv(path)
    df = df.rename(columns={
        'english word': 'english',
        'native word': 'odia'
    })
    df.dropna(inplace=True)
    return df

# =========================
# PREPROCESSING
# =========================
def preprocess(df):
    df['english'] = df['english'].str.lower().str.strip()
    df['odia'] = df['odia'].str.strip()
    return df

# =========================
# FEATURE ENGINEERING
# =========================
def create_features(df):
    data = []

    for _, row in df.iterrows():
        eng = row['english']
        odi = row['odia']

        for i, char in enumerate(eng):
            data.append({
                'char': char,
                'position': i,
                'word_length': len(eng),
                'is_first': int(i == 0),
                'is_last': int(i == len(eng)-1),
                'target': odi[i] if i < len(odi) else ''
            })

    return pd.DataFrame(data)

# =========================
# ENCODING
# =========================
def encode(df):
    le_char = LabelEncoder()
    le_target = LabelEncoder()

    df['char_enc'] = le_char.fit_transform(df['char'])
    df['target_enc'] = le_target.fit_transform(df['target'])

    X = df[['char_enc', 'position', 'word_length', 'is_first', 'is_last']]
    y = df['target_enc']

    return X, y, le_target

# =========================
# TRAIN MODEL
# =========================
def train_model(X_train, y_train):
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model

# =========================
# MAIN FUNCTION
# =========================
def main():
    print("🚀 English–Odia Transliteration Model")

    df = load_data("data/sample_data.csv")
    df = preprocess(df)

    char_df = create_features(df)
    X, y, le = encode(char_df)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = train_model(X_train, y_train)

    preds = model.predict(X_test)

    print("Accuracy:", accuracy_score(y_test, preds))
    print("\nClassification Report:\n")
    print(classification_report(y_test, preds))

if __name__ == "__main__":
    main()
