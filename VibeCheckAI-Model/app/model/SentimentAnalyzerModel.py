import onnxruntime
from transformers import AutoTokenizer
import numpy as np

TOKENIZER_NAME = "cardiffnlp/twitter-xlm-roberta-base-sentiment"

ORIG_MODEL_PATH = "./models/onnx_model/model.onnx"
OPTIMIZED_MODEL_PATH = "./models/optimized_onnx_model/model_optimized.onnx"

class SentimentAnalyzer:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_NAME, model_max_length=1024)

        providers = onnxruntime.get_available_providers()
        if "CUDAExecutionProvider" in providers:
            print("GPU (CUDA) dostępne. Model zostanie załadowany na GPU.")
            self.ort_session = onnxruntime.InferenceSession(
                OPTIMIZED_MODEL_PATH, 
                providers=["CUDAExecutionProvider", "CPUExecutionProvider"]
            )
        else:
            print("GPU (CUDA) niedostępne. Model zostanie załadowany na CPU.")
            self.ort_session = onnxruntime.InferenceSession(
                OPTIMIZED_MODEL_PATH, 
                providers=["CPUExecutionProvider"]
            )

    def analyze_sentiment(self, comments, batch_size=256):
        sentiments = []
        for i in range(0, len(comments), batch_size):
            batch = comments[i:i + batch_size]
            inputs = self.tokenizer(batch, padding=True, truncation=True, return_tensors="np")

            ort_inputs = {
                "input_ids": inputs["input_ids"].astype(np.int64),
                "attention_mask": inputs["attention_mask"].astype(np.int64),
            }

            ort_outputs = self.ort_session.run(None, ort_inputs)
            predictions = np.argmax(ort_outputs[0], axis=1)

            sentiments.extend(predictions.tolist())

        return sentiments