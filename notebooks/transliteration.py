# ============================================
# English-Odia Transliteration (Notebook Script)
# ============================================

import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

# =========================
# LOAD DATA
# =========================
print("Loading dataset...")
df = pd.read_csv("../data/sample_data.csv")

print("\nDataset Preview:")
print(df.head())

# =========================
# PREPROCESSING
# =========================
print("\nPreprocessing data...")
df['english'] = df['english'].str.lower().str.strip()
df['odia'] = df['odia'].str.strip()

# =========================
# FEATURE CREATION
# =========================
print("\nCreating character-level features...")

data = []

for _, row in df.iterrows():
    eng = row['english']
    odi = row['odia']

    for i in range(len(eng)):
        data.append({
            'char': eng[i],
            'position': i,
            'word_length': len(eng),
            'target': odi[i] if i < len(odi) else ''
        })

char_df = pd.DataFrame(data)

print("\nCharacter Data Preview:")
print(char_df.head())

# =========================
# ENCODING
# =========================
print("\nEncoding features...")

le_char = LabelEncoder()
le_target = LabelEncoder()

char_df['char_enc'] = le_char.fit_transform(char_df['char'])
char_df['target_enc'] = le_target.fit_transform(char_df['target'])

X = char_df[['char_enc', 'position', 'word_length']]
y = char_df['target_enc']

# =========================
# TRAIN TEST SPLIT
# =========================
print("\nSplitting data...")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================
# MODEL TRAINING
# =========================
print("\nTraining Random Forest model...")

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# =========================
# EVALUATION
# =========================
print("\nEvaluating model...")

preds = model.predict(X_test)
accuracy = accuracy_score(y_test, preds)

print("\nModel Accuracy:", round(accuracy * 100, 2), "%")

# =========================
# SAVE RESULT
# =========================
print("\nSaving results...")
