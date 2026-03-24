{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "a297d952",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
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
