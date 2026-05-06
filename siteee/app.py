from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # permet à ton jeu JS d’envoyer des requêtes

# =======================
# SAUVEGARDE SCORE
# =======================
@app.route("/save-score", methods=["POST"])
def save_score():
    data = request.get_json()

    nom = data.get("nom")
    score = data.get("score")

    if not nom or score is None:
        return "Données invalides", 400

    # écrire dans un fichier texte
    with open("scores.txt", "a", encoding="utf-8") as f:
        f.write(f"Nom: {nom} | Score: {score}\n")

    return "Score sauvegardé !"

# =======================
# OPTIONNEL : voir les scores
# =======================
@app.route("/scores", methods=["GET"])
def get_scores():
    try:
        with open("scores.txt", "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return "Aucun score encore"

# =======================
# LANCEMENT DU SERVEUR
# =======================
if __name__ == "__main__":
    app.run(debug=True)