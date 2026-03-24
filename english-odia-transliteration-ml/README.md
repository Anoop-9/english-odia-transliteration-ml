# English–Odia Transliteration using Machine Learning

## 📌 Overview

This project implements a machine learning-based transliteration system that converts English text into Odia script and vice versa. The model focuses on character-level phonetic mapping to ensure accurate and consistent transliteration.

## 🚀 Features

* Bidirectional transliteration (English ↔ Odia)
* Character-level phonetic mapping
* Multiple machine learning models implemented and compared
* Performance evaluation using Accuracy and Character Error Rate (CER)

## 🧠 Methodology

* Collected and preprocessed English–Odia word pairs
* Applied encoding techniques (one-hot encoding, label encoding)
* Trained multiple ML models:

  * Decision Tree
  * Random Forest
  * AdaBoost
  * K-Nearest Neighbors (KNN)
  * Linear Discriminant Analysis (LDA)
* Evaluated models using Accuracy, Precision, Recall, F1-score, and CER

## 📊 Results

* Random Forest achieved the highest accuracy: **94.25%**
* Ensemble models outperformed individual classifiers
* Character-level modeling improved phonetic accuracy

## 🛠 Tech Stack

* Python
* NumPy, Pandas
* Scikit-learn
* Matplotlib, Seaborn
* Jupyter Notebook

## 📂 Project Structure

```
english-odia-transliteration-ml/
│── data/
│── src/
│   └── model.py
│── notebooks/
│── results/
│── README.md
│── requirements.txt
```

## ▶️ How to Run

```bash
pip install -r requirements.txt
python src/model.py
```

## 📌 Applications

* Educational tools for learning Odia language
* Government and administrative systems
* Social media text conversion
* Localization of software and websites

## 🔮 Future Improvements

* Implement deep learning models (LSTM, Transformers)
* Expand dataset for better accuracy
* Deploy as a web application
