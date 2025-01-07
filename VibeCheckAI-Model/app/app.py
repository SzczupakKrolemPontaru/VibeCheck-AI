from flask import Flask
from routes.analysysRoutes import sentiment_analysis_route, emotions_analysis_route

app = Flask(__name__)
app.register_blueprint(sentiment_analysis_route, url_prefix='/sentimentAnalysis')
app.register_blueprint(emotions_analysis_route, url_prefix='/emotionAnalysis')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5172)
    