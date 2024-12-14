def summarize_results(texts):
    summary = {
        "positive": 0,
        "neutral": 0,
        "negative": 0
    }
    for result in texts:
        summary[result["label"].lower()] += 1
    return summary