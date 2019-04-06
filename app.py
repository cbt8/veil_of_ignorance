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
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# Map Database
db = client.veilofignorancedb

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

if __name__ == "__main__":
    app.run(debug=True)