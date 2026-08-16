import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

def train():
    # 1. Download/Load Gold Price Dataset
    url = "https://raw.githubusercontent.com/Rnoozy/Gold-Prices-Prediction/main/gld_price_data.csv"
    print("Loading Gold Price dataset...")
    df = pd.read_csv(url)
    
    # 2. Data Cleaning
    print("Preprocessing data...")
    if 'Date' in df.columns:
        df = df.drop(columns=['Date'])
        
    X = df.drop(columns=['GLD'])
    y = df['GLD']
    
    # 3. Train/Test Split (80/20 split)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2)
    
    # 4. Model Training
    print("Training RandomForestRegressor model...")
    model = RandomForestRegressor(n_estimators=100, random_state=2)
    model.fit(X_train, y_train)
    
    # 5. Evaluation
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    print("\n=== Model Performance ===")
    print(f"R² Score            : {r2:.4f} ({r2 * 100:.2f}% variance explained)")
    print(f"Mean Absolute Error : ${mae:.2f}")
    print(f"Root Mean Sq. Error : ${rmse:.2f}")
    
    # 6. Feature Importances
    importances = pd.Series(model.feature_importances_, index=X.columns).sort_values(ascending=False)
    print("\n=== Feature Importances ===")
    for feature, val in importances.items():
        print(f"{feature:10s}: {val * 100:.2f}%")
        
    # 7. Save model
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "model.pkl")
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
    print(f"\nModel successfully saved to: {model_path}")

if __name__ == "__main__":
    train()
