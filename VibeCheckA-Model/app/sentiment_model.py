from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import torch, os

MODEL_NAME = "cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual"
file_path = './sample-text-PL.txt'

def load_model():
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    return tokenizer, model

def analyze_sentiment(texts):
    tokenizer, model = load_model()
    nlp_pipeline = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

    results = []
    for text in texts:
        sentiment = nlp_pipeline(text)[0]
        results.append({
            "text": text,
            "label": sentiment["label"],
            "score": round(sentiment["score"], 4)
        })
    return results