import pandas as pd
import numpy as np
import pickle
import os
import requests
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

def download_dataset(base_dir):
    csv_path = os.path.join(base_dir, "creditcard.csv")
    if os.path.exists(csv_path):
        print(f"Found local creditcard.csv at {csv_path}")
        return csv_path
    
    url = "https://raw.githubusercontent.com/nsethi31/Kaggle-Data-Credit-Card-Fraud-Detection/master/creditcard.csv"
    print(f"Downloading dataset from {url}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    with open(csv_path, "wb") as f:
        downloaded = 0
        for chunk in response.iter_content(chunk_size=1024 * 1024):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)
                print(f"Downloaded {downloaded / (1024 * 1024):.1f} MB...", flush=True)
                
    print("Download complete!")
    return csv_path

def train():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = download_dataset(base_dir)
    
    print("Loading Credit Card Fraud dataset into memory...")
    df = pd.read_csv(csv_path)
    
    print(f"Total Transactions: {len(df)}")
    legit = df[df.Class == 0]
    fraud = df[df.Class == 1]
    
    print(f"Legitimate Count  : {len(legit)}")
    print(f"Fraudulent Count  : {len(fraud)}")
    
    # Under-sampling to handle extreme class imbalance
    legit_sample = legit.sample(n=len(fraud), random_state=2)
    balanced_df = pd.concat([legit_sample, fraud], axis=0)
    
    X = balanced_df.drop(columns=['Class'], axis=1)
    y = balanced_df['Class']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=2)
    
    print("\nTraining Logistic Regression model on balanced dataset...")
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, y_train)
    
    y_pred_train = model.predict(X_train)
    y_pred_test = model.predict(X_test)
    
    train_acc = accuracy_score(y_train, y_pred_train)
    test_acc = accuracy_score(y_test, y_pred_test)
    test_precision = precision_score(y_test, y_pred_test)
    test_recall = recall_score(y_test, y_pred_test)
    test_f1 = f1_score(y_test, y_pred_test)
    
    print("\n=== Model Performance Metrics ===")
    print(f"Training Accuracy : {train_acc * 100:.2f}%")
    print(f"Testing Accuracy  : {test_acc * 100:.2f}%")
    print(f"Precision Score   : {test_precision * 100:.2f}%")
    print(f"Recall (Sens.)    : {test_recall * 100:.2f}%")
    print(f"F1-Score          : {test_f1 * 100:.2f}%")
    
    print("\nDetailed Classification Report:")
    print(classification_report(y_test, y_pred_test, target_names=['Legitimate', 'Fraud']))
    
    # Save model artifact
    model_path = os.path.join(base_dir, "model.pkl")
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
        
    print(f"Model successfully saved to: {model_path}")

if __name__ == "__main__":
    train()
