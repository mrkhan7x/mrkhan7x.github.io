# 🧠 Production Machine Learning Microservices & Projects

A collection of production-grade Machine Learning microservices, regression engines, and classification systems built from scratch, tuned for real-world accuracy, and packaged into lightweight FastAPI REST endpoints.

---

## 🚀 Projects Overview

| # | Project Name | Task Type | Model Architecture | Metrics / Performance | FastAPI Endpoint |
|---|---|---|---|---|---|
| **01** | **Spam Detector** | Text Classification | Naive Bayes / Logistic Regression | ~98% Precision | `POST /predict` |
| **05** | **Semantic Search Engine** | Vector Search | Cosine Similarity + Sentence Transformers | High Relevance | `POST /search` |
| **06** | **Diabetes Risk Predictor** | Binary Classification | Logistic Regression | 78% Accuracy | `POST /predict` |
| **08** | **Sonar Rock vs. Mine Classifier** | Binary Classification | Support Vector Machine (RBF Kernel) | 86.5% Test Accuracy | `POST /predict` |
| **09** | **PIMA Diabetes SVM Classifier** | Binary Classification | Support Vector Classifier (Linear) | 77.2% Test Accuracy | `POST /predict` |
| **10** | **Fake News Detector** | NLP Classification | PassiveAggressiveClassifier / TfidfVectorizer | 93.4% Accuracy | `POST /predict` |
| **11** | **Gold Price Predictor** | Time-Series Regression | Random Forest Regressor | $R^2 = 0.98$ | `POST /predict` |
| **12** | **Heart Disease Risk Predictor** | Medical Classification | Logistic Regression | 85.2% Accuracy, High Recall | `POST /predict` |
| **13** | **Credit Card Fraud Detector** | Imbalanced Classification | Logistic Regression + Class Under-sampling | 92.89% Test Acc, 89.8% Recall | `POST /predict` |
| **14** | **Big Mart Sales Predictor** | Retail Sales Forecasting | Tuned XGBoost Regressor | $R^2 = 0.5877$, $MAE = \$865.86$ | `POST /predict` |

---

## 🛠️ Tech Stack & Microservice Architecture

- **Core ML / Stats:** Scikit-Learn, XGBoost, Pandas, NumPy
- **API Framework:** FastAPI, Uvicorn, Pydantic Schema Validation
- **Deployment & Serialization:** Joblib, Pickle, Python 3.13

---

## 📥 Quickstart & Local Execution

1. Clone the repository:
   ```bash
   git clone https://github.com/mrkhan7x/machine-learning-projects.git
   cd machine-learning-projects
   ```

2. Run any microservice endpoint (e.g. Credit Card Fraud Detector):
   ```bash
   cd 13_credit_card_fraud_detector
   python train.py
   uvicorn main:app --reload
   ```

3. Test prediction endpoint:
   ```bash
   python test_api.py
   ```

---

## 👤 Author

**Muhammad Roman Khan (M R KHAN)**  
- Portfolio: [mrkhan7x.github.io](https://mrkhan7x.github.io)
- GitHub: [@mrkhan7x](https://github.com/mrkhan7x)
