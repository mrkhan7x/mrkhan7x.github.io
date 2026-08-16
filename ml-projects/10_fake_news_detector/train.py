# 📰 Fake News Detector — Training Pipeline
# File: D:\DA + DE\PYTHON_PROJECTS\10_fake_news_detector\train.py
import pandas as pd
import numpy as np
import re
import pickle
import os
import urllib.request
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Download NLTK resources
nltk.download('stopwords', quiet=True)

DATA_URL = "https://raw.githubusercontent.com/pillai-ashwin/Fake-news-Detection/master/datasets/train.csv"
DATA_FILENAME = "train.csv"

def download_data_if_needed():
    if not os.path.exists(DATA_FILENAME):
        print("Downloading Fake News dataset...")
        urllib.request.urlretrieve(DATA_URL, DATA_FILENAME)
        print("Download complete.")
    else:
        print("Dataset already exists locally.")

def stemming(content, port_stem, stop_words):
    # Keep only alphabetical characters
    stemmed_content = re.sub('[^a-zA-Z]', ' ', content)
    stemmed_content = stemmed_content.lower()
    stemmed_content = stemmed_content.split()
    # Apply Porter Stemmer while filtering stopwords
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if not word in stop_words]
    return ' '.join(stemmed_content)

def run_pipeline() -> None:
    download_data_if_needed()
    
    # 1. Load dataset
    df = pd.read_csv(DATA_FILENAME)
    
    # 2. Clean nulls
    df['title'] = df['title'].fillna('')
    df['author'] = df['author'].fillna('')
    
    # 3. Create content feature
    df['content'] = df['author'] + ' ' + df['title']
    
    # 4. Text Preprocessing
    port_stem = PorterStemmer()
    stop_words = set(stopwords.words('english'))
    
    print("Preprocessing text (stemming)...")
    df['content'] = df['content'].apply(lambda x: stemming(x, port_stem, stop_words))
    
    X = df['content'].values
    y = df['label'].values
    
    # 5. Vectorize using TF-IDF
    vectorizer = TfidfVectorizer()
    X_vectorized = vectorizer.fit_transform(X)
    
    # 6. Train-test split (80/20 ratio, stratified, random_state=2)
    X_train, X_test, y_train, y_test = train_test_split(
        X_vectorized, y, test_size=0.2, stratify=y, random_state=2
    )
    
    # 7. Train Logistic Regression model
    print("Training Logistic Regression model...")
    model = LogisticRegression(random_state=2)
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred_train = model.predict(X_train)
    y_pred_test = model.predict(X_test)
    print(f"Training Accuracy: {accuracy_score(y_train, y_pred_train) * 100:.2f}%")
    print(f"Testing Accuracy:  {accuracy_score(y_test, y_pred_test) * 100:.2f}%")
    
    # Under-the-hood inspections (Step 2 details)
    feature_names = vectorizer.get_feature_names_out()
    coefficients = model.coef_[0]
    coef_df = pd.DataFrame({'word': feature_names, 'coef': coefficients})
    
    print("\n--- Strongest Predictors of FAKE news (Positive Weights) ---")
    print(coef_df.sort_values(by='coef', ascending=False).head(5).to_string(index=False))
    
    print("\n--- Strongest Predictors of REAL news (Negative Weights) ---")
    print(coef_df.sort_values(by='coef', ascending=True).head(5).to_string(index=False))
    
    # 8. Save model and vectorizer objects using pickle
    with open("model.pkl", "wb") as f:
        pickle.dump(model, f)
    with open("vectorizer.pkl", "wb") as f:
        pickle.dump(vectorizer, f)
    print("\nModel and TF-IDF Vectorizer successfully saved.")

if __name__ == "__main__":
    run_pipeline()
