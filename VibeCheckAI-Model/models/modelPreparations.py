import os
from transformers import AutoTokenizer
from optimum.onnxruntime import ORTModelForSequenceClassification, ORTOptimizer
from optimum.onnxruntime.configuration import OptimizationConfig

# Sentiment Analysis model
SENTIMENT_ANALYSIS_MODEL = "cardiffnlp/twitter-xlm-roberta-base-sentiment"
OPTIMIZED_SENTIMENT_ANALYSIS_MODEL_DIRECTORY_PATH = "./models/sentimentAnalysis"

os.makedirs(OPTIMIZED_SENTIMENT_ANALYSIS_MODEL_DIRECTORY_PATH, exist_ok=True)

sentimentAnalysisModel = ORTModelForSequenceClassification.from_pretrained(SENTIMENT_ANALYSIS_MODEL, export=True)
sentimentAnalysisTokenizer = AutoTokenizer.from_pretrained(SENTIMENT_ANALYSIS_MODEL, use_fast=False)

optimizer = ORTOptimizer.from_pretrained(sentimentAnalysisModel)
optimization_config = OptimizationConfig(optimization_level=99, disable_embed_layer_norm_fusion=True)
optimizer.optimize(
    save_dir=OPTIMIZED_SENTIMENT_ANALYSIS_MODEL_DIRECTORY_PATH,
    optimization_config=optimization_config
)

sentimentAnalysisTokenizer.save_pretrained(OPTIMIZED_SENTIMENT_ANALYSIS_MODEL_DIRECTORY_PATH)

# Emotion Analysis model
EMOTION_ANALYSIS_MODEL = "cardiffnlp/twitter-roberta-base-emotion-multilabel-latest"
OPTIMIZED_EMOTION_ANALYSIS_MODEL_DIRECTORY_PATH = "./models/emotionAnalysis"

os.makedirs(OPTIMIZED_EMOTION_ANALYSIS_MODEL_DIRECTORY_PATH, exist_ok=True)

emotionAnalysisModel = ORTModelForSequenceClassification.from_pretrained(EMOTION_ANALYSIS_MODEL, export=True)
emotionAnalysisTokenizer = AutoTokenizer.from_pretrained(EMOTION_ANALYSIS_MODEL, use_fast=False)

optimizer = ORTOptimizer.from_pretrained(emotionAnalysisModel)
optimization_config = OptimizationConfig(optimization_level=99, disable_embed_layer_norm_fusion=True)
optimizer.optimize(
    save_dir=OPTIMIZED_EMOTION_ANALYSIS_MODEL_DIRECTORY_PATH,
    optimization_config=optimization_config
)

emotionAnalysisTokenizer.save_pretrained(OPTIMIZED_EMOTION_ANALYSIS_MODEL_DIRECTORY_PATH)
