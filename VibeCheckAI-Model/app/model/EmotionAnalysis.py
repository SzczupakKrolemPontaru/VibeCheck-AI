import onnxruntime
from transformers import AutoTokenizer
import numpy as np

TOKENIZER_NAME = "cardiffnlp/twitter-roberta-base-emotion-multilabel-latest"
MODEL_PATH = "./models/emotionAnalysis/model_optimized.onnx"
MAX_COMMENT_LENGTH = 256

class EmotionAnalyzer:
    def __init__(self, session_options):
        self.tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_NAME)
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

        self.warm_up()

    def warm_up(self):
        """Perform warm-up by running the model on dummy data."""
        dummy_data = ["This is a warm-up sentence."] * 64
        inputs = self.tokenizer(
            dummy_data,
            padding=True,
            truncation=True,
            return_tensors="np",
            max_length=MAX_COMMENT_LENGTH
        )

        _ = self.model.run(None, {key: np.array(value, dtype=np.int64) for key, value in inputs.items()})

    def analyzeEmotions(self, comments):
        BATCH_SIZE = 64 
        results = []

        for i in range(0, len(comments), BATCH_SIZE):
            batch = comments[i:i + BATCH_SIZE] 
            inputs = self.tokenizer(
                batch,
                padding=True,
                truncation=True,
                return_tensors="np",
                max_length=MAX_COMMENT_LENGTH
            )

            outputs = self.model.run(None, {key: np.array(value, dtype=np.int64) for key, value in inputs.items()})
            probabilities = np.argmax(outputs[0], axis=1)

            for prob in probabilities:
                max_idx = np.argmax(prob)
                results.append({
                    "label": self.labels[max_idx],
                })

            del inputs, outputs, probabilities

        return results