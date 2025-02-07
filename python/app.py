from flask import Flask, jsonify, request
from flask_cors import CORS

import request.request as req
import controller.auth.auth as user
import controller.attraction as attraction
import controller.critique as critique  # Import du contrôleur critique

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

@app.post('/attraction/<int:attraction_id>/critique')
def addCritique(attraction_id):
    checkToken = user.check_token(request)
    if checkToken != True:
        return checkToken

    json = request.get_json()
    json['attractionId'] = attraction_id
    retour = critique.add_critique(json)
    if retour:
        return jsonify({"message": "Critique ajoutée.", "result": retour}), 200
    return jsonify({"message": "Erreur lors de l'ajout de la critique.", "result": retour}), 500

@app.get('/critiques')
def getCritiquesAll():
    result = critique.get_critiques()
    return jsonify(result), 200

@app.get('/attraction/<int:attraction_id>/critique')
def getCritiques(attraction_id):
    result = critique.get_critiques_by_attraction_id(attraction_id)
    return jsonify(result), 200

@app.delete('/attraction/<int:attraction_id>/critique/<int:critique_id>')
def deleteCritique(attraction_id, critique_id):
    checkToken = user.check_token(request)
    if checkToken != True:
        return checkToken

    if critique.delete_critique(critique_id):
        return jsonify({"message": "Critique supprimée."}), 200
    return jsonify({"message": "Erreur lors de la suppression de la critique."}), 500

if __name__ == '__main__':
    app.run(debug=True)