# English–Odia Transliteration using Machine Learning

## 📌 Overview

This project implements a machine learning-based transliteration system that converts English text into Odia script and vice versa. The model focuses on **phonetic mapping at the character level**, enabling accurate script conversion.

## 🚀 Features

* Character-level transliteration
* Supports bidirectional conversion (English ↔ Odia)
* Multiple ML models implemented and compared
* Evaluation using accuracy and Character Error Rate (CER)

## 🧠 Methodology

* Collected and preprocessed English–Odia word pairs
* Applied encoding techniques (one-hot, label encoding)
* Trained multiple ML models:

  * Decision Tree
  * Random Forest
  * AdaBoost
  * KNN
  * LDA
* Evaluated using Accuracy, Precision, Recall, F1-score, CER

## 📊 Results

* Random Forest achieved highest accuracy: **94.25%**
* Ensemble models outperformed individual classifiers
* Character-level modeling improved phonetic accuracy

## 🛠 Tech Stack

* Python
* NumPy, Pandas
* Scikit-learn
* Matplotlib / Seaborn
* Jupyter Notebook

## 📂 Project Structure

* `data/` – Dataset files
* `src/` – Model & preprocessing code
* `notebooks/` – Experiments and analysis
* `results/` – Output and evaluation results

## ▶️ How to Run

```bash
pip install -r requirements.txt
python src/model.py
```

## 📌 Future Improvements

* Implement LSTM / Transformer models
* Increase dataset size
* Deploy as web application

## 💡 Applications

* Educational tools for learning Odia
* Government documentation systems
* Social media transliteration
* Localization of apps/websites
