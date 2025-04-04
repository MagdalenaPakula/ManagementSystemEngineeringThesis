from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chat import get_response

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return render_template("base.html")


@app.route("/predict", methods=["POST"])
def predict():
    text = request.json.get("message")
    response = get_response(text)
    return jsonify({"answer": response})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
