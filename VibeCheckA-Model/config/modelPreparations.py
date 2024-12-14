from optimum.onnxruntime import ORTModelForSequenceClassification
from optimum.onnxruntime import ORTOptimizer
from optimum.onnxruntime.configuration import OptimizationConfig
from onnxruntime.quantization import quantize_dynamic, QuantType

MODEL_NAME = "cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual"

ORYGINAL_MODEL_DIRECTORY_PATH = "./onnx_model"
ORYGINAL_MODEL_PATH = "./onnx_model/model.onnx"

OPTIMIZED_MODEL_DIRECTORY_PATH = "./optimized_onnx_model"
OPTIMIZED_MODEL_PATH = "./optimized_onnx_model/model_optimized.onnx"

QUANTIZED_MODEL_DIRECTORY_PATH = "./quantized_onnx_model"
QUANTIZED_MODEL_PATH = "./quantized_onnx_model/quantized_model.onnx"

# model = ORTModelForSequenceClassification.from_pretrained(MODEL_NAME, export=True)
# model.save_pretrained(ORYGINAL_MODEL_DIRECTORY_PATH)

optimizer = ORTOptimizer.from_pretrained(ORYGINAL_MODEL_DIRECTORY_PATH)
optimization_config = OptimizationConfig(optimization_level=2)
optimizer.optimize(
    save_dir=OPTIMIZED_MODEL_DIRECTORY_PATH,
    optimization_config=optimization_config
)

quantize_dynamic(
    model_input=ORYGINAL_MODEL_PATH,
    model_output=QUANTIZED_MODEL_PATH,
    weight_type=QuantType.QUInt8,
)