from sentiment_model import load_model, analyze_sentiment, load_data
from datetime import datetime
import os

file_path = './sample-text-PL.txt'

def summarize_results(results):
    summary = {
        "positive": 0,
        "neutral": 0,
        "negative": 0
    }
    for result in results:
        summary[result["label"].lower()] += 1
    return summary

def get_least_confident_neutral(results, count=3):
    neutral_results = [res for res in results if res["label"].lower() == "neutral"]
    neutral_results.sort(key=lambda x: x["confidence"])
    return neutral_results[:count]

def save_results_to_file(results, summary, least_confident_neutral, file_path="analysis/results.txt"):
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_path = f"analysis/results_{current_time}.txt"
    
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, "w", encoding="utf-8") as file:
        file.write("Sentiment analysis summary:\n")
        file.write(f"Positive: {summary['positive']}\n")
        file.write(f"Neutral: {summary['neutral']}\n")
        file.write(f"Negative: {summary['negative']}\n")
        
        file.write("\nSentences with the least confidence and neutral sentiment:\n")
        for res in least_confident_neutral:
            file.write(f"Text: {res['text']}\nConfidence: {res['confidence']}\n\n")

def main():
    sample_texts = load_data(file_path)
    print("Loading model...")
    tokenizer, model = load_model()

    print("Sentiment analysis...")
    results = analyze_sentiment(sample_texts, tokenizer, model)

    summary = summarize_results(results)
    print("\nSentiment analysis summary:")
    print(f"Positive: {summary['positive']}")
    print(f"Neutral: {summary['neutral']}")
    print(f"Negative: {summary['negative']}")

    least_confident_neutral = get_least_confident_neutral(results)
    print("\nSentences with the least confidence and neutral sentiment:")
    for res in least_confident_neutral:
        print(f"Text: {res['text']}\nConfidence: {res['confidence']}\n")

    save_results_to_file(results, summary, least_confident_neutral)

if __name__ == "__main__":
    main()