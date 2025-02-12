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