from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask import request
from flask import Response
import pandas as pd
import dateutil

app = Flask(__name__)

mongo_db = "Spotifydb"
mongo = PyMongo(app, uri=f'mongodb://localhost:27017/{mongo_db}')

# This function receives some parameters that will be used to group by and summarize the data 
def group_data(data,column,value,headers):
    data_df = pd.DataFrame(data)
    grouped = data_df.groupby(column).sum().sort_values(by=[value],ascending=False).reset_index()
    grouped = grouped[headers]

    response = Response(grouped.to_json(orient="records"), mimetype='application/json')
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


# Function that retrieves parameters from end point and uses them to create an array of objects that will be used to filter data from Mongo
def filter_data():
    filters={}
    date_filter={}
    args = request.args
    for k, v in args.items():
        
        if(v != "" and k != 'Group_by'): 
            if(k == 'datefrom' or k == 'dateto'): 
                if(k == 'datefrom'):
                    date_filter['$gte'] = dateutil.parser.parse(v)
                    filters["Date"] = date_filter
                if(k == 'dateto'):
                    date_filter['$lt'] = dateutil.parser.parse(v)
                    filters["Date"] = date_filter
            else:
                filters[k] = v
    
    return filters



@app.route("/songs")
def jsonified():

    group = request.args.get("Group_by")
    print(filter_data())

    songs = [i for i in mongo.db.Top200byCountry.find(filter_data())]    
    for song in songs: song.pop("_id")

    # This is commented only for testing
    # response = jsonify(songs)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    # return response

    return group_data(songs, group,"Streams",[group,"Streams"]) 

@app.route("/streamsbydate")
def jsonified2():

    group = request.args.get("Group_by")

    songs = [i for i in mongo.db.Top200byCountry.find(filter_data())]    
    for song in songs: song.pop("_id")

    data_df = pd.DataFrame(songs)
    grouped = data_df.groupby(group).sum().reset_index()
    grouped["MonthYear"] = (grouped['MonthYear'].dt.strftime('%b')).astype(str)+" "+(pd.DatetimeIndex(grouped['MonthYear']).year).astype(str)
    
    response = Response(grouped.to_json(orient="records"), mimetype='application/json')
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    app.run(debug=True)