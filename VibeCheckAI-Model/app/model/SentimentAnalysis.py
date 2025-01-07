import onnxruntime
import torch
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
import gc

TOKENIZER_NAME = "tabularisai/multilingual-sentiment-analysis"
MODEL_PATH = "./models/sentimentAnalysis/model_optimized.onnx"
MAX_COMMENT_LENGTH = 256

class SentimentAnalyzer:
    def __init__(self):
        self.labels = {0: "VERY_NEGATIVE", 1: "NEGATIVE", 2: "NEUTRAL", 3: "POSITIVE", 4: "VERY_POSITIVE"}
        self.tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_NAME)
        session_options = onnxruntime.SessionOptions()
        session_options.enable_mem_pattern = False
        self.model = onnxruntime.InferenceSession(
            MODEL_PATH, 
            sess_options=session_options, 
            providers=['CUDAExecutionProvider','CPUExecutionProvider']
        )

    def analyzeSentiment(self, comments):
        inputs = self.tokenizer(
            comments,
            padding=True,
            truncation=True,
            return_tensors="pt",
            max_length=MAX_COMMENT_LENGTH
        )

        inputs = self.tokenizer(
            comments,
            padding=True,
            truncation=True,
            return_tensors="np",
            max_length=MAX_COMMENT_LENGTH
        )

        with torch.no_grad():
            outputs = self.model.run(None, {key: np.array(value, dtype=np.int64) for key, value in inputs.items()})
            probabilities = softmax(outputs[0], axis=1)

        results = []
        for prob in probabilities:
            max_idx = np.argmax(prob)
            results.append({
                "label": self.labels[max_idx],
            })

        torch.cuda.empty_cache()
        gc.collect()

        return results