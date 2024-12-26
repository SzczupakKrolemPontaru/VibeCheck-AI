from flask import Flask, request, jsonify
from model.sentiment_analysys import summarize_results
from model.SentimentAnalyzerModel import SentimentAnalyzer

app = Flask(__name__)
analyzer = SentimentAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    texts = data.get('texts', [])

    if not texts:
        return jsonify({"error": "No texts provided"}), 400

    result = analyzer.analyze_sentiment(texts)
    return jsonify(result)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5172)