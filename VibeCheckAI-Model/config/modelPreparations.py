import os
from transformers import AutoTokenizer
from optimum.onnxruntime import ORTModelForSequenceClassification, ORTOptimizer
from optimum.onnxruntime.configuration import OptimizationConfig
from onnxruntime.quantization import quantize_dynamic, QuantType

MODEL_NAME = "cardiffnlp/twitter-xlm-roberta-base-sentiment"

ORYGINAL_MODEL_DIRECTORY_PATH = "./models/onnx_model"
ORYGINAL_MODEL_PATH = "./models/onnx_model/model.onnx"

OPTIMIZED_MODEL_DIRECTORY_PATH = "./models/optimized_onnx_model"
OPTIMIZED_MODEL_PATH = "./models/optimized_onnx_model/model_optimized.onnx"

os.makedirs(ORYGINAL_MODEL_DIRECTORY_PATH, exist_ok=True)
os.makedirs(OPTIMIZED_MODEL_DIRECTORY_PATH, exist_ok=True)

model = ORTModelForSequenceClassification.from_pretrained(MODEL_NAME, export=True)
model.save_pretrained(ORYGINAL_MODEL_DIRECTORY_PATH)

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=False)
tokenizer.save_pretrained(ORYGINAL_MODEL_DIRECTORY_PATH)

optimizer = ORTOptimizer.from_pretrained(ORYGINAL_MODEL_DIRECTORY_PATH)
optimization_config = OptimizationConfig(optimization_level=3)
optimizer.optimize(
    save_dir=OPTIMIZED_MODEL_DIRECTORY_PATH,
    optimization_config=optimization_config
)

tokenizer.save_pretrained(OPTIMIZED_MODEL_DIRECTORY_PATH)
