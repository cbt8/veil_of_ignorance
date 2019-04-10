#################################################
# Dependencies
#################################################
import pandas as pd
from flask import Flask, jsonify, render_template, redirect, url_for
import pymongo
import json

#################################################
# Helper Functions
#################################################

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# Set up Mongo/PyMongo
conn = "mongodb://heroku_2rsv5d25:iktn3mgtq8k4qluqgmlhug6kp6@ds233228.mlab.com:33228/heroku_2rsv5d25"
client = pymongo.MongoClient(conn,
                             connectTimeoutMS=30000,
                             socketTimeoutMS=None,
                             socketKeepAlive=True)

# Map Database
db = client.heroku_2rsv5d25

# Map collection (Table)
veilofignorance = db.veilofignorance

#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return render_template("index.html")

# API
@app.route("/api/veilofignorance")
def allStates():
    data = db.veilofignorance.find()
    print(type(data))
    allStates = list(data)
    for state in data:
        allStates.append(state)
    # remove _id
    for state in allStates:
        state.pop("_id")

    return jsonify(allStates)

# About
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return render_template("about.html")

# User-friendly API
@app.route("/api")
def api():
    print("Server received request for 'API' page...")
    return render_template("api.html")

if __name__ == "__main__":
    app.run(debug=True)

