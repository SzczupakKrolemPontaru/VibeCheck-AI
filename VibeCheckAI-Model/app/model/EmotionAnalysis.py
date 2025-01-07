import onnxruntime
import torch
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
import gc

TOKENIZER_NAME = "cardiffnlp/twitter-roberta-base-emotion-multilabel-latest"
MODEL_PATH = "./models/emotionAnalysis/model_optimized.onnx"
MAX_COMMENT_LENGTH = 256

class EmotionAnalyzer:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_NAME)
        session_options = onnxruntime.SessionOptions()
        session_options.enable_mem_pattern = False
        self.model = onnxruntime.InferenceSession(
            MODEL_PATH, 
            sess_options=session_options, 
            providers=['CUDAExecutionProvider','CPUExecutionProvider']
        )

        self.labels = {
            0: "ANGER", 
            1: "ANTICIPATION", 
            2: "DISGUST", 
            3: "FEAR", 
            4: "JOY", 
            5: "LOVE", 
            6: "OPTIMISM", 
            7: "PESSIMISM", 
            8: "SADNESS", 
            9: "SURPRISE", 
            10: "TRUST"
        }

    def analyzeEmotions(self, comments):
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