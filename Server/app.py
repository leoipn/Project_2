from flask import Flask, jsonify
from flask_pymongo import PyMongo


app = Flask(__name__)

mongo_db = "Spotifydb"
# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri=f'mongodb://localhost:27017/{mongo_db}')

# hello_dict = {"Hello": "World!"}

@app.route("/songs")
def jsonified():
    #songs = mongo.db.destinations.find({})
    #print(songs)
    print([i for i in mongo.db.Top200.find({})])
    songs = [i for i in mongo.db.Top200.find({})]
    
    for song in songs:
        song.pop("_id")
    
    
    return jsonify(songs)
    #return jsonify([i for i in mongo.db.destinations.find({})])


if __name__ == "__main__":
    app.run(debug=True)
