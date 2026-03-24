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

with open("../results/output.txt", "w") as f:
    f.write(f"Random Forest Accuracy: {round(accuracy * 100, 2)}%")

print("\n Done! Results saved in results/output.txt")
   },
   "outputs": [],
   "source": [
    "# English-Odia Transliteration using Machine Learning"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "cf6c146d",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "import pandas as pd\n",
    "import numpy as np\n",
    "from sklearn.model_selection import train_test_split\n",
    "from sklearn.ensemble import RandomForestClassifier\n",
    "from sklearn.preprocessing import LabelEncoder\n",
    "from sklearn.metrics import accuracy_score"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "92d7026a",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "df = pd.read_csv(\"../data/sample_data.csv\")\n",
    "df.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "64d37a69",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "df['english'] = df['english'].str.lower()\n",
    "df['odia'] = df['odia'].str.strip()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "c4e92065",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "data = []\n",
    "\n",
    "for _, row in df.iterrows():\n",
    "    eng = row['english']\n",
    "    odi = row['odia']\n",
    "    \n",
    "    for i in range(len(eng)):\n",
    "        data.append({\n",
    "            'char': eng[i],\n",
    "            'position': i,\n",
    "            'word_length': len(eng),\n",
    "            'target': odi[i] if i < len(odi) else ''\n",
    "        })\n",
    "\n",
    "char_df = pd.DataFrame(data)\n",
    "char_df.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "ec0905ea",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "le_char = LabelEncoder()\n",
    "le_target = LabelEncoder()\n",
    "\n",
    "char_df['char_enc'] = le_char.fit_transform(char_df['char'])\n",
    "char_df['target_enc'] = le_target.fit_transform(char_df['target'])\n",
    "\n",
    "X = char_df[['char_enc', 'position', 'word_length']]\n",
    "y = char_df['target_enc']\n",
    "\n",
    "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n",
    "\n",
    "model = RandomForestClassifier()\n",
    "model.fit(X_train, y_train)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "06db07f5",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "preds = model.predict(X_test)\n",
    "print(\"Accuracy:\", accuracy_score(y_test, preds))"
   ]
  }
 ],
 "metadata": {
  "language_info": {
   "name": "python"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
