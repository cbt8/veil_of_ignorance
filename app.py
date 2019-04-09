#################################################
# Dependencies
#################################################
import pandas as pd
from flask import Flask, jsonify, render_template, redirect, url_for
import pymongo
import json
from urllib.request import urlopen
from bs4 import BeautifulSoup

#################################################
# Helper Functions
#################################################


def statescrape(state, stateID):

    source = 'https://www.census.gov/quickfacts/fact/table/' + \
        str(state) + '/PST045218'
    html = urlopen(source)
    soup = BeautifulSoup(html, 'html.parser')

    fulllist = []

    for i in soup.find_all('td'):
        fulllist.append(i.text)

    headinglist = []
    datalist = []

    for i in range(len(fulllist)):
        x = fulllist[i].strip('\n')
        formatted = x.strip('\ue840\ue83f\n')
        if i % 2 == 0:
            headinglist.append(formatted)
        else:
            datalist.append(formatted)

    truedict = dict(zip(headinglist, datalist))
    truedict['State'] = state
    truedict['StateID'] = stateID
    onestatedf = pd.DataFrame(truedict, index=[state])

    return onestatedf


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

# Set up Database
@app.route("/initdb")
def initdb():
    db.veilofignorance.drop()

    stateID = {'Arkansas': ['05', 'AR'],
               'California': ['06', 'CA'],
               'Illinois': ['17', 'IL'],
               'Kansas': ['20', 'KS'],
               'Mississippi': ['28', 'MS'],
               'Ohio': ['39', 'OH'],
               'Texas': ['48', 'TX'],
               'Alabama': ['01', 'AL'],
               'Iowa': ['19', 'IA'],
               'Louisiana': ['22', 'LA'],
               'Minnesota': ['27', 'MN'],
               'Missouri': ['9', 'MO'],
               'Nebraska': ['31', 'NE'],
               'Arizona': ['04', 'AZ'],
               'Colorado': ['08', 'CO'],
               'Indiana': ['18', 'IN'],
               'Michigan': ['26', 'MI'],
               'Montana': ['30', 'MT'],
               'New York': ['36', 'NY'],
               'Oregon': ['41', 'OR'],
               'Virginia': ['51', 'VA'],
               'Wyoming': ['56', 'WY'],
               'North Carolina': ['37', 'NC'],
               'Oklahoma': ['40', 'OK'],
               'Tennessee': ['47', 'TN'],
               'Wisconsin': ['55', 'WI'],
               'Alaska': ['02', 'AK'],
               'Vermont': ['50', 'VT'],
               'North Dakota': ['38', 'ND'],
               'Georgia': ['13', 'GA'],
               'Maine': ['23', 'ME'],
               'Rhode Island': ['44', 'RI'],
               'West Virginia': ['54', 'WV'],
               'Idaho': ['16', 'ID'],
               'South Dakota': ['46', 'SD'],
               'New Mexico': ['35', 'NM'],
               'Washington': ['53', 'WA'],
               'Pennsylvania': ['42', 'PA'],
               'Florida': ['12', 'FL'],
               'Utah': ['49', 'UT'],
               'Kentucky': ['21', 'KY'],
               'New Hampshire': ['33', 'NH'],
               'South Carolina': ['45', 'SC'],
               'Nevada': ['32', 'NV'],
               'Hawaii': ['15', 'HI'],
               'New Jersey': ['34', 'NJ'],
               'Connecticut': ['09', 'CT'],
               'Maryland': ['24', 'MD'],
               'Massachusetts': ['25', 'MA'],
               'Delaware': ['10', 'DE'],
               'District of Columbia': ['11', 'DC']
               }

    dflist = pd.DataFrame()

    count = 0
    for key, value in stateID.items():
        print(count, key, value)
        scraped_df = statescrape(value[1], value[0])
        dflist = dflist.append(scraped_df)
        count += 1
    records = dflist.to_dict(orient='records')

    # Creates a collection in the database and inserts documents
    db.veilofignorance.insert_many(records) 
    return

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
