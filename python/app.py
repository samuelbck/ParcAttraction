from flask import Flask, jsonify, request
from flask_cors import CORS

import request.request as req
import controller.auth.auth as user
import controller.attraction as attraction
import controller.critique as critique

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, Docker!'

# Attraction
@app.post('/attraction')
def addAttraction():
    checkToken = user.check_token(request)
    if checkToken != True:
        return checkToken

    json = request.get_json()
    retour = attraction.add_attraction(json)
    if retour:
        return jsonify({"message": "Element ajouté.", "result": retour}), 200
    return jsonify({"message": "Erreur lors de l'ajout.", "result": retour}), 500

@app.get('/attraction')
def getAllAttraction():
    result = attraction.get_all_attraction()
    return result, 200

@app.get('/attraction/<int:index>')
def getAttraction(index):
    result = attraction.get_attraction(index)
    return result, 200

@app.delete('/attraction/<int:index>')
def deleteAttraction(index):
    checkToken = user.check_token(request)
    if checkToken != True:
        return checkToken

    if attraction.delete_attraction(index):
        return jsonify({"message": "Element supprimé."}), 200
    return jsonify({"message": "Erreur lors de la suppression."}), 500

# Critique 
@app.get('/critiques')
def getCritiquesAll():
    result = critique.get_critiques()
    return jsonify(result), 200

@app.post('/critiques')
def postCritique():
    
    json = request.get_json()
    result = critique.add_critique(json)
    if result:
        return jsonify({"message": "Element ajouté.", "result": result}), 200
    return jsonify({"message": "Erreur lors de l'ajout.", "result": result}), 500