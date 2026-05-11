from flask import Flask, request, jsonify, send_from_directory
import json
import os

app = Flask(__name__)

SCORE_FILE = 'score.json'


@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)



@app.route('/score', methods=['POST'])
def save_score():

    data = request.json

    if os.path.exists(SCORE_FILE):

        with open(SCORE_FILE, 'r') as f:
            scores = json.load(f)

    else:
        scores = []

    scores.append({
        'pseudo': data['pseudo'],
        'kills': data['kills']
    })

    # Trier du meilleur score au pire
    scores.sort(key=lambda x: x['kills'], reverse=True)

    # Garder top 10
    scores = scores[:10]

    with open(SCORE_FILE, 'w') as f:
        json.dump(scores, f)

    return jsonify({'ok': True})



@app.route('/score', methods=['GET'])
def get_score():

    if os.path.exists(SCORE_FILE):

        with open(SCORE_FILE, 'r') as f:
            return jsonify(json.load(f))

    return jsonify([])


if __name__ == '__main__':
    app.run(debug=True)