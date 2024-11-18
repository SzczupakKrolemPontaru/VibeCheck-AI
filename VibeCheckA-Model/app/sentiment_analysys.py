from sentiment_model import analyze_sentiment as analyze_sentiment_model

def summarize_results(texts):
    results = analyze_sentiment_model(texts)
    summary = {
        "positive": 0,
        "neutral": 0,
        "negative": 0
    }
    for result in results:
        summary[result["label"].lower()] += 1
    return summary

# def get_least_confident_neutral(results):
#     neutral_results = [result for result in results if result["sentiment"] == "neutral"]
    
#     for result in neutral_results:
#         if "confidence" not in result:
#             result["confidence"] = 0 

#     neutral_results.sort(key=lambda x: x["confidence"])
#     return neutral_results[0] if neutral_results else None

