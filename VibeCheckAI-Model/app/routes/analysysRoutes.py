from flask import Blueprint, request, jsonify
from model.SentimentAnalysis import SentimentAnalyzer
from model.EmotionAnalysis import EmotionAnalyzer

sentiment_analysis_route = Blueprint('sentiment_analysis_route', __name__)
emotions_analysis_route = Blueprint('emotions_analysis_route', __name__)

@sentiment_analysis_route.route('/', methods=['POST'])
def analyze_sentiment():
    sentimentAnalyzer = SentimentAnalyzer()
    data = request.get_json()
    comments = data.get('comments')
    result = sentimentAnalyzer.analyzeSentiment(comments)
    
    label_counts = {}
    for item in result:
        label = item['label']
        if label in label_counts: 
            label_counts[label] += 1
        else:
            label_counts[label] = 1

    return jsonify(label_counts)

@emotions_analysis_route.route('/', methods=['POST'])
def analyze_emotions():
    emotionAnalyzer = EmotionAnalyzer()
    data = request.get_json()
    comments = data.get('comments')
    result = emotionAnalyzer.analyzeEmotions(comments)
    
    label_counts = {}
    for item in result:
        label = item['label']
        if label in label_counts:
            label_counts[label] += 1
        else:
            label_counts[label] = 1

    return jsonify(label_counts)