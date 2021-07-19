from flask import Flask, jsonify
from flask_pymongo import PyMongo


app = Flask(__name__)

mongo_db = "Spotifydb"
# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri=f'mongodb://localhost:27017/{mongo_db}')


@app.route("/songs")
def jsonified():
    songs = [i for i in mongo.db.Top200.find({})]

    for song in songs:
        song.pop("_id")
    
    response = jsonify(songs)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response
    
@app.route("/streamsByDate")
def jsonified2():
    streams_by_date = [i for i in mongo.db.StreamsByDate.find({})]

    for streams in streams_by_date:
        streams.pop("_id")

    response = jsonify(streams_by_date)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route("/streamsByArtist")
def jsonified3():
    streams_by_artist = [i for i in mongo.db.StreamsByArtist.find({})]

    for streams in streams_by_artist:
        streams.pop("_id")

    response = jsonify(streams_by_artist)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route("/streamsByTrack")
def jsonified4():
    streams_by_track = [i for i in mongo.db.StreamsByTrack.find({})]

    for streams in streams_by_track:
        streams.pop("_id")

    response = jsonify(streams_by_track)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route("/artist")
def jsonified5():
    artists = [i for i in mongo.db.SpotifyArtists.find({})]

    for artist in artists:
        artist.pop("_id")
    
    response = jsonify(artists)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    app.run(debug=True)
