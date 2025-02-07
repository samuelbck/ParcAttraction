import request.request as req

def add_critique(data):
    print(data, flush=True)
    
    if (not "attractionId" in data or data["attractionId"] is None):
        return False

    if (not "userId" in data or data["userId"] is None):
        return False

    if (not "rating" in data or data["rating"] is None):
        return False

    if (not "review" in data or data["review"] == ""):
        return False

    if ("id" in data and data["id"]):
        requete = f"UPDATE critiques SET attractionId={data['attractionId']}, userId={data['userId']}, rating={data['rating']}, review='{data['review']}' WHERE id = {data['id']}"
        req.insert_in_db(requete)
        id = data['id']
    else:
        requete = "INSERT INTO critiques (attractionId, userId, rating, review) VALUES (?, ?, ?, ?);"
        id = req.insert_in_db(requete, (data["attractionId"], data["userId"], data["rating"], data["review"]))

    return id

def get_critiques():
    json = req.select_from_db("SELECT * FROM critiques")
    return json

def get_critiques_by_attraction_id(attraction_id):
    if (not attraction_id):
        return False
    
    json = req.select_from_db("SELECT * FROM critiques WHERE attractionId = ?", (attraction_id,))
    return json

def delete_critique(id):
    if (not id):
        return False

    req.delete_from_db("DELETE FROM critiques WHERE id = ?", (id,))
    return True
