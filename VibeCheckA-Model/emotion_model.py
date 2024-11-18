from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import torch, os

MODEL_NAME = "bhadresh-savani/bert-base-uncased-emotion"
file_path = './sample-text-PL.txt'

def load_model():
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    return tokenizer, model

def analyze_sentiment(texts, tokenizer, model):
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

def load_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.readlines()
    return [line.strip() for line in data]

def main():
    sample_texts = load_data(file_path)
    print("Ładowanie modelu...")
    tokenizer, model = load_model()

    print("Analiza sentymentu...")
    results = analyze_sentiment(sample_texts, tokenizer, model)

    for result in results:
        print(f"Tekst: {result['text']}\nEtykieta: {result['label']}\nPewność: {result['score']}\n")

if __name__ == "__main__":
    main()