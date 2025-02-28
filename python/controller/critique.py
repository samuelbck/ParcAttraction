import request.request as req

def add_critique(data):
    print(data, flush=True)
    
    if (not "attractionId" in data or data["attractionId"] is None):
        return False

    if (not "note" in data or data["note"] is None):
        return False

    if (not "texte" in data or data["texte"] == ""):
        return False

    if ("id" in data and data["id"]):
        requete = f"UPDATE critiques SET attractionId={data['attractionId']}, nom={data['nom']}, prenom={data['prenom']}, note={data['note']}, texte='{data['texte']}' WHERE id = {data['id']}"
        req.insert_in_db(requete)
        id = data['id']
    else:
        requete = "INSERT INTO critiques (attractionId, nom, prenom, texte, note) VALUES (?, ?, ?, ?, ?);"
        id = req.insert_in_db(requete, (data["attractionId"], data["nom"], data["prenom"], data["texte"], data["note"]))

    return id

def get_critiques():
    json = req.select_from_db("SELECT * FROM critiques")
    return json

def get_critiques_id(attraction_id):
    if (not attraction_id):
        return False
    json = req.select_from_db("SELECT * FROM critiques WHERE attractionId = ?", (attraction_id,))

    if len(json) > 0:
        return json[0]
    else:
        return []


def get_attraction(id):
    if (not id):
        return False

    json = req.select_from_db("SELECT * FROM attraction WHERE attraction_id = ?", (id,))

    if len(json) > 0:
        return json[0]
    else:
        return []