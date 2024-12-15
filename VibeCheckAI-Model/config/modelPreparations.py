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

QUANTIZED_MODEL_DIRECTORY_PATH = "./models/quantized_onnx_model"
QUANTIZED_MODEL_PATH = "./models/quantized_onnx_model/quantized_model.onnx"

os.makedirs(ORYGINAL_MODEL_DIRECTORY_PATH, exist_ok=True)
os.makedirs(OPTIMIZED_MODEL_DIRECTORY_PATH, exist_ok=True)
os.makedirs(QUANTIZED_MODEL_DIRECTORY_PATH, exist_ok=True)

model = ORTModelForSequenceClassification.from_pretrained(MODEL_NAME, export=True)
model.save_pretrained(ORYGINAL_MODEL_DIRECTORY_PATH)

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=False)
tokenizer.save_pretrained(ORYGINAL_MODEL_DIRECTORY_PATH)

optimizer = ORTOptimizer.from_pretrained(ORYGINAL_MODEL_DIRECTORY_PATH)
optimization_config = OptimizationConfig(optimization_level=2)
optimizer.optimize(
    save_dir=OPTIMIZED_MODEL_DIRECTORY_PATH,
    optimization_config=optimization_config
)

quantize_dynamic(
    model_input=OPTIMIZED_MODEL_PATH,
    model_output=QUANTIZED_MODEL_PATH,
    weight_type=QuantType.QUInt8,
)

os.replace(QUANTIZED_MODEL_PATH, OPTIMIZED_MODEL_PATH)

tokenizer.save_pretrained(OPTIMIZED_MODEL_DIRECTORY_PATH)
