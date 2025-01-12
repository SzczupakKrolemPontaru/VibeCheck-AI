from flask import Blueprint, request, jsonify
import onnxruntime
from model.SentimentAnalysis import SentimentAnalyzer
from model.EmotionAnalysis import EmotionAnalyzer

sentiment_analysis_route = Blueprint('sentiment_analysis_route', __name__)
emotions_analysis_route = Blueprint('emotions_analysis_route', __name__)

session_options = onnxruntime.SessionOptions()
session_options.intra_op_num_threads = 4
session_options.inter_op_num_threads = 4
session_options.enable_mem_pattern = True
session_options.execution_mode = onnxruntime.ExecutionMode.ORT_SEQUENTIAL
session_options.graph_optimization_level = onnxruntime.GraphOptimizationLevel.ORT_ENABLE_ALL

sentimentAnalyzer = SentimentAnalyzer(session_options)
emotionAnalyzer = EmotionAnalyzer(session_options)

@sentiment_analysis_route.route('/sentimentAnalysis', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    comments = data.get('comments')
    result = sentimentAnalyzer.analyzeSentiment(comments)

    return jsonify(summarize_results(result))

@emotions_analysis_route.route('/emotionAnalysis', methods=['POST'])
def analyze_emotions():
    data = request.get_json()
    comments = data.get('comments')
    result = emotionAnalyzer.analyzeEmotions(comments)

    return jsonify(summarize_results(result))

def summarize_results(results):
    label_counts = {}
    for item in results:
        label = item['label']
        if label in label_counts:
            label_counts[label] += 1
        else:
            label_counts[label] = 1

    return label_counts