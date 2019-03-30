#################################################
# Dependencies
#################################################
import pandas as pd 
from flask import Flask, jsonify, render_template, redirect
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
    # db = client.usedCarsDB

# Map collection (Table)
    # cars_collection = db.cars
    # trueCar_collection = db.trueCar


#################################################
# Flask Routes
#################################################

# Home Page
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return "Welcome to my 'Home' page!"


# About
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "Welcome to my 'About' page!"


if __name__ == "__main__":
    app.run(debug=True)