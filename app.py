from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    # Lecture du fichier texte
    with open('data.txt', 'r', encoding='utf-8') as f:
        contenu = f.read()

    # Envoi du contenu au template HTML
    return render_template('index.html', texte=contenu)

if __name__ == '__main__':
    app.run(debug=True)