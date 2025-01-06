import onnxruntime
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax

TOKENIZER_NAME = "cardiffnlp/twitter-xlm-roberta-base-sentiment"
MODEL_PATH = "./models/sentimentAnalysis/model_optimized.onnx"
MAX_COMMENT_LENGTH = 512
BATCH_SIZE = 1024

class SentimentAnalyzer:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_NAME, model_max_length=MAX_COMMENT_LENGTH)

        providers = onnxruntime.get_available_providers()
        if "CUDAExecutionProvider" in providers:
            print("GPU (CUDA) dostępne. Model zostanie załadowany na GPU.")
            self.ort_session = onnxruntime.InferenceSession(
                MODEL_PATH, 
                providers=["CUDAExecutionProvider", "CPUExecutionProvider"]
            )
        else:
            print("GPU (CUDA) niedostępne. Model zostanie załadowany na CPU.")
            self.ort_session = onnxruntime.InferenceSession(
                MODEL_PATH, 
                providers=["CPUExecutionProvider"]
            )

        self.labels = {0: "NEGATIVE", 1: "NEUTRAL", 2: "POSITIVE"}

    def analyzeSentiment(self, commentsWithIds):
        results = []

        commentsWithIds = list(commentsWithIds.values())
        ids = list(commentsWithIds.keys())

        for i in range(0, len(commentsWithIds), BATCH_SIZE):
            batch = commentsWithIds[i:i + BATCH_SIZE]
            batch_ids = ids[i:i + BATCH_SIZE]
            inputs = self.tokenizer(
                batch,
                padding=True,
                truncation=True,
                return_tensors="np",
                max_length=MAX_COMMENT_LENGTH
            )

            ort_inputs = {
                key: np.array(value, dtype=np.int64) for key, value in inputs.items()
            }

            ort_outputs = self.ort_session.run(None, ort_inputs)

            probabilities = softmax(ort_outputs[0], axis=1)

            for j, text in enumerate(batch):
                max_idx = np.argmax(probabilities[j])
                results.append({
                    "id": batch_ids[j],
                    "text": text,
                    "label": self.labels[max_idx],
                    "score": round(float(probabilities[j][max_idx]), 4)
                })

        return results
