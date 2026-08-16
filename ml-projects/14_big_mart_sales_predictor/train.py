import pandas as pd
import numpy as np
import pickle
import os
import requests
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBRegressor
from sklearn.metrics import r2_score, mean_absolute_error, root_mean_squared_error

def download_dataset(base_dir):
    csv_path = os.path.join(base_dir, "Train.csv")
    if os.path.exists(csv_path):
        print(f"Found local Train.csv at {csv_path}")
        return csv_path
    
    url = "https://raw.githubusercontent.com/tirthajyoti/Machine-Learning-with-Python/master/Datasets/BigMart_Sales_Train.csv"
    print(f"Downloading Big Mart Sales dataset from {url}...")
    response = requests.get(url, stream=True)
    if response.status_code != 200:
        url = "https://raw.githubusercontent.com/megha-7/Big-Mart-Sales-Prediction/master/Train.csv"
        response = requests.get(url, stream=True)
    response.raise_for_status()
    
    with open(csv_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=1024 * 1024):
            if chunk:
                f.write(chunk)
                
    print("Download complete!")
    return csv_path

def train():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = download_dataset(base_dir)
    
    print("Loading Big Mart Sales dataset into memory...")
    data = pd.read_csv(csv_path)
    print(f"Total Rows: {len(data)}, Columns: {len(data.columns)}")
    
    # 1. Impute missing Item_Weight with mean
    data['Item_Weight'] = data['Item_Weight'].fillna(data['Item_Weight'].mean())
    
    # 2. Impute missing Outlet_Size with Mode per Outlet_Type
    outlet_fill = data.pivot_table(values='Outlet_Size', columns='Outlet_Type', aggfunc=(lambda x: x.mode()[0]))
    missing_mask = data['Outlet_Size'].isnull()
    data.loc[missing_mask, 'Outlet_Size'] = data.loc[missing_mask, 'Outlet_Type'].apply(lambda x: outlet_fill[x].values[0])
    
    # 3. Clean Item_Visibility zero values
    data['Item_Visibility'] = data['Item_Visibility'].replace(0, np.nan)
    data['Item_Visibility'] = data['Item_Visibility'].fillna(data['Item_Visibility'].mean())
    
    # 4. Feature Engineering: Outlet_Age
    if 'Outlet_Establishment_Year' in data.columns:
        data['Outlet_Age'] = 2013 - data['Outlet_Establishment_Year']
        data.drop(columns=['Outlet_Establishment_Year'], inplace=True)
        
    # 5. Categorical Label Encoding
    cat_cols = ['Item_Identifier', 'Item_Fat_Content', 'Item_Type', 'Outlet_Identifier', 'Outlet_Size', 'Outlet_Location_Type', 'Outlet_Type']
    encoders = {}
    for col in cat_cols:
        if col in data.columns:
            le = LabelEncoder()
            data[col] = le.fit_transform(data[col].astype(str))
            encoders[col] = le
            
    # 6. Feature & Target Split
    X = data.drop(columns=['Item_Outlet_Sales'], axis=1)
    y = data['Item_Outlet_Sales']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2)
    
    print("\nTraining Tuned XGBoost Regressor model...")
    model = XGBRegressor(
        n_estimators=100,
        max_depth=3,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=2
    )
    model.fit(X_train, y_train)
    
    y_pred_train = model.predict(X_train)
    y_pred_test = model.predict(X_test)
    
    r2_tr = r2_score(y_train, y_pred_train)
    r2_te = r2_score(y_test, y_pred_test)
    mae_te = mean_absolute_error(y_test, y_pred_test)
    rmse_te = root_mean_squared_error(y_test, y_pred_test)
    
    print("\n=== Model Evaluation Performance ===")
    print(f"Training R2 Score : {r2_tr:.4f}")
    print(f"Testing R2 Score  : {r2_te:.4f}")
    print(f"Mean Absolute Err : ${mae_te:.2f}")
    print(f"Root Mean Sq Err  : ${rmse_te:.2f}")
    
    # Save model and encoders
    model_path = os.path.join(base_dir, "model.pkl")
    encoders_path = os.path.join(base_dir, "encoders.pkl")
    
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
    with open(encoders_path, "wb") as f:
        pickle.dump(encoders, f)
        
    print(f"\nModel and Encoders successfully saved to: {base_dir}")

if __name__ == "__main__":
    train()
