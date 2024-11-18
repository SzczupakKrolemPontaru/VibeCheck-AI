from flask import Flask, request, jsonify
from sentiment_analysys import summarize_results

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    texts = data.get('texts', [])
    
    if not texts:
        return jsonify({"error": "No texts provided"}), 400

    summary = summarize_results(texts)

    response = {
        "summary": summary,
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)