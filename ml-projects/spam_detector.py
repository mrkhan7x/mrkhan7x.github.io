# 🤖 Spam Detector AI — Level 1 Project
# File: D:\DA + DE\PYTHON_PROJECTS\01_spam_detector\spam_detector.py

# Step 1: The Training Data
training_data = [
    {"text": "click here to win free money now", "label": "spam"},
    {"text": "hey are we still meeting for lunch today", "label": "ham"},
    {"text": "claim your free cash prize call now", "label": "spam"},
    {"text": "can you send me the sql homework files", "label": "ham"},
    {"text": "urgent secret bonus cash reward inside", "label": "spam"},
    {"text": "please call your mom when you get home", "label": "ham"}
]

# Step 2: The Word Analyzer Function
def analyze_words(data):
    spam_words = {}
    ham_words = {}

    for item in data:
        # Split the message text into a list of individual words
        words = item["text"].split()
        
        if item["label"] == "spam":
            for word in words:
                if word in spam_words:
                    spam_words[word] += 1
                else:
                    spam_words[word] = 1
        else:
            for word in words:
                if word in ham_words:
                    ham_words[word] += 1
                else:
                    ham_words[word] = 1
    
    return spam_words, ham_words

# Step 3: The Predictor Function
def predict_spam(message, spam_words, ham_words):
    spam_score = 0
    ham_score = 0
    
    # Split input message into lowercase words
    words = message.lower().split()
    
    for word in words:
        if word in spam_words:
            spam_score += spam_words[word]
        if word in ham_words:
            ham_score += ham_words[word]
            
    if spam_score > ham_score:
        return "spam"
    else:
        return "ham"

if __name__ == "__main__":
    # 1. Train the model (analyze words)
    spam, ham = analyze_words(training_data)
    
    # 2. Test with new messages
    test_messages = [
        "free cash prize inside click now",
        "hey call mom we are meeting for lunch today",
        "urgent meeting about sql files"
    ]
    
    print("=== AI Predictions ===")
    for msg in test_messages:
        prediction = predict_spam(msg, spam, ham)
        print(f"Message: '{msg}' -> PREDICTION: {prediction.upper()}")
