# 🔧 Hyperparameter Tuner (Bias-Variance Analyzer)
# File: D:\DA + DE\PYTHON_PROJECTS\07_model_benchmark\tuner.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# 1. Corrected file path for Google Colab
DATA_PATH = "D:/DA + DE/LEARNING/diabetic_data.csv"

def load_data():
    df = pd.read_csv(DATA_PATH)
    features = [
        "time_in_hospital",
        "num_lab_procedures",
        "num_procedures",
        "num_medications",
        "number_diagnoses"
    ]
    X = df[features]
    y = (df["readmitted"] == "<30").astype(int)
    return train_test_split(X, y, test_size=0.2, random_state=42)

import matplotlib.pyplot as plt

if __name__ == "__main__":
    X_train, X_test, y_train, y_test = load_data()
    
    # Range of depths to test
    depths = [1, 2, 3, 5, 8, 12, 16, 20, 25]
    
    print("=== Hyperparameter Tuning (Decision Tree Depth) ===")
    print(f"{'Depth':<8} | {'Train Accuracy':<14} | {'Test Accuracy':<13} | {'Status'}")
    print("-" * 65)
    
    train_accuracies = []
    test_accuracies = []
    
    for depth in depths:
        # TASK 1: Initialize, fit, and predict with the current depth
        model = DecisionTreeClassifier(max_depth=depth, random_state=42)
        model.fit(X_train, y_train)
        
        train_preds = model.predict(X_train)
        test_preds = model.predict(X_test)
        
        # Calculate accuracy scores
        train_acc = accuracy_score(y_train, train_preds) if train_preds is not None else 0.0
        test_acc = accuracy_score(y_test, test_preds) if test_preds is not None else 0.0
        
        train_accuracies.append(train_acc)
        test_accuracies.append(test_acc)
        
        # TASK 2: Classify the bias-variance status based on scores
        if train_acc < 0.887 and test_acc < 0.887:
            status = "Underfitting (High Bias)"
        elif train_acc > 0.90 and (train_acc - test_acc) > 0.02:   # 2% gap indicates variance gap
            status = "Overfitting (High Variance)"
        else:
            status = "Balanced"
        
        print(f"{depth:<8} | {train_acc:<14.4f} | {test_acc:<13.4f} | {status}")

    # Generate and save the bias-variance trade-off plot
    plt.figure(figsize=(10, 6))
    plt.plot(depths, train_accuracies, label="Train Accuracy (Under-the-hood Fit)", marker='o', linewidth=2, color='#1f77b4')
    plt.plot(depths, test_accuracies, label="Test Accuracy (Generalization Fit)", marker='s', linewidth=2, color='#d62728')
    plt.axhline(y=0.887, color='gray', linestyle='--', label='Baseline Performance')
    
    plt.title("Decision Tree Complexity Analysis: Bias vs. Variance", fontsize=14, fontweight='bold', pad=15)
    plt.xlabel("Tree Complexity (Max Depth)", fontsize=12)
    plt.ylabel("Accuracy Score", fontsize=12)
    plt.xticks(depths)
    plt.grid(True, linestyle=':', alpha=0.6)
    plt.legend(loc='lower right', frameon=True, shadow=False)
    plt.tight_layout()
    
    plot_output_path = "bias_variance_curve.png"
    plt.savefig(plot_output_path, dpi=300)
    print(f"\n[Plot] Saved visual bias-variance diagnostic curve to: {plot_output_path}")

