from flask import Blueprint, request, jsonify
from model.SentimentAnalysis import SentimentAnalyzer
from model.EmotionAnalysis import EmotionAnalyzer

sentiment_analysis_route = Blueprint('sentiment_analysis_route', __name__)
emotions_analysis_route = Blueprint('emotions_analysis_route', __name__)

sentimentAnalyzer = SentimentAnalyzer()
emotionAnalyzer = EmotionAnalyzer()

@sentiment_analysis_route.route('/', methods=['POST'])
def analyze():
    commentsMap = request.get_json()
    result = sentimentAnalyzer.analyzeSentiment(commentsMap)
    return jsonify(result)

@emotions_analysis_route.route('/', methods=['POST'])
def analyze():
    commentsMap = request.get_json()
    result = emotionAnalyzer.analyzeEmotions(commentsMap)
    return jsonify(result)