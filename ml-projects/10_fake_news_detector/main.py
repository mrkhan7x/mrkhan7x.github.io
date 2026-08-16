# 🌐 FastAPI Fake News Predictor Server
# File: D:\DA + DE\PYTHON_PROJECTS\10_fake_news_detector\main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

# Initialize NLTK
nltk.download('stopwords', quiet=True)

app = FastAPI(title="Fake News Detector API")

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = None
vectorizer = None
port_stem = PorterStemmer()
stop_words = set(stopwords.words('english'))

@app.on_event("startup")
def load_model_and_vectorizer():
    """
    Loads model.pkl and vectorizer.pkl on server startup.
    """
    global model, vectorizer
    try:
        model_path = os.path.join(BASE_DIR, "model.pkl")
        vectorizer_path = os.path.join(BASE_DIR, "vectorizer.pkl")
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        with open(vectorizer_path, "rb") as f:
            vectorizer = pickle.load(f)
        print("Model and TF-IDF Vectorizer loaded successfully!")
    except FileNotFoundError:
        print("[Error] model.pkl or vectorizer.pkl not found. Run train.py first!")

class NewsPayload(BaseModel):
    title: str
    author: str

def clean_and_stem(content: str) -> str:
    # Remove numbers and punctuation, leaving only letters
    stemmed_content = re.sub('[^a-zA-Z]', ' ', content)
    stemmed_content = stemmed_content.lower()
    stemmed_content = stemmed_content.split()
    # Stem words and filter out stopwords
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if not word in stop_words]
    return ' '.join(stemmed_content)

@app.post("/predict")
def predict_news(news: NewsPayload):
    """
    Predicts if a news article is Fake (1) or Real (0) based on title and author.
    """
    if model is None or vectorizer is None:
        raise HTTPException(status_code=500, detail="Server model files not loaded.")
        
    # Combine title and author matching training format
    combined_text = f"{news.author} {news.title}"
    
    # Preprocess text
    preprocessed_text = clean_and_stem(combined_text)
    
    # Vectorize using fitted TF-IDF vocabulary
    vectorized_input = vectorizer.transform([preprocessed_text])
    
    # Run prediction and calculate probability of being Fake (class 1)
    prediction = int(model.predict(vectorized_input)[0])
    probability = float(model.predict_proba(vectorized_input)[0][1])
    
    return {
        "prediction": prediction,
        "probability_fake": round(probability, 4),
        "status": "Fake/Unreliable" if prediction == 1 else "Real/Reliable"
    }
