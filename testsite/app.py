from flask import Flask, render_template, request, jsonify
 
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_score', methods=['POST'])
def save_score():
    data = request.get_json()
    kills = data.get('kills')

    with open("scores.txt", "a") as file:
        file.write(f"{kills}\n")

    return jsonify({"status": "ok"})

@app.route('/scores')
def get_scores():
    try:
        with open("scores.txt", "r") as f:
            scores = f.readlines()
        scores = [int(s.strip()) for s in scores if s.strip().isdigit()]
    except:
        scores = []

    scores.sort(reverse=True)
    return jsonify(scores[:10])  # top 10

if __name__ == '__main__':
    app.run(debug=True)