from flask import Flask

app = Flask(__name__)

from flask import render_template
from flask import request

@app.route("/")
def n1():
    return render_template(jeu.html)
@app.route("/reponse",methods = ['GET']
def pseudo():
    result=request.args
    nom=int(result['inputa'])


file=open("donne.txt","w")
file.write(nom,score)