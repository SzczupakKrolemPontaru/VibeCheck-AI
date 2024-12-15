from transformers import AutoTokenizer, pipeline
from optimum.onnxruntime import ORTModelForSequenceClassification

MODEL_NAME = "cardiffnlp/twitter-xlm-roberta-base-sentiment"
OPTIMIZED_MODEL_PATH = "./models/optimized_onnx_model"
ORYGINAL_MODEL_DIRECTORY_PATH = "./models/onnx_model"

class SentimentAnalyzer:
    def __init__(self):
        self.model = ORTModelForSequenceClassification.from_pretrained(ORYGINAL_MODEL_DIRECTORY_PATH)
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        self.nlp_pipeline = pipeline("sentiment-analysis", model=self.model, tokenizer=self.tokenizer)

    def analyze_sentiment(self, texts, batch_size=32):
        results = self.nlp_pipeline(texts, batch_size=batch_size)
        formatted_results = [{
            "text": text, 
            "label": result["label"], 
            "score": round(result["score"], 4)
        } for text, result in zip(texts, results)]
        
        return formatted_results