import os
from transformers import AutoTokenizer
from optimum.onnxruntime import ORTModelForSequenceClassification, ORTOptimizer
from optimum.onnxruntime.configuration import OptimizationConfig

def optimize_model(model_name, output_dir, optimization_level=2, disable_layer_norm_fusion=True):
    """
    Function to optimize a model and save it along with its tokenizer.
    
    Args:
        model_name (str): The name of the pre-trained model.
        output_dir (str): The directory where the optimized model and tokenizer will be saved.
        optimization_level (int): Optimization level (default 2 for advanced optimizations).
        disable_layer_norm_fusion (bool): Whether to disable the layer normalization fusion (default True).
    """
    os.makedirs(output_dir, exist_ok=True)

    model = ORTModelForSequenceClassification.from_pretrained(model_name, export=True)
    tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=False)

    optimizer = ORTOptimizer.from_pretrained(model)
    optimization_config = OptimizationConfig(
        optimization_level=optimization_level,
        disable_embed_layer_norm_fusion=disable_layer_norm_fusion
    )

    optimizer.optimize(
        save_dir=output_dir,
        optimization_config=optimization_config
    )

    tokenizer.save_pretrained(output_dir)
    print(f"Model {model_name} has been optimized and saved in: {output_dir}")

sentiment_analysis_model = "tabularisai/multilingual-sentiment-analysis"
emotion_analysis_model = "cardiffnlp/twitter-roberta-base-emotion-multilabel-latest"
sentiment_analysis_output_dir = "./models/sentimentAnalysis"
emotion_analysis_output_dir = "./models/emotionAnalysis"

optimize_model(sentiment_analysis_model, sentiment_analysis_output_dir, optimization_level=99)
optimize_model(emotion_analysis_model, emotion_analysis_output_dir, optimization_level=99)
