
# coding: utf-8

# In[7]:


# Dependencies
import pymongo
import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen
import pandas as pd


# In[8]:


conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db=client.veilofignorancedb
db.veilofignorance.drop()


# In[9]:


stateID = {'Arkansas':['05','AR'], 'California':['06','CA'], 'Illinois':['17','IL'], 'Kansas':['20','KS'], 'Mississippi':['28','MS'], 'Ohio':['39','OH'], 
           'Texas':['48','TX'], 'Alabama':['01','AL'], 'Iowa':['19','IA'], 'Louisiana':['22','LA'],'Minnesota':['27','MN'], 'Missouri':['9','MO'], 
           'Nebraska':['31','NE'], 'Arizona':['04','AZ'], 'Colorado':['08','CO'], 'Indiana':['18','IN'], 'Michigan':['26','MI'],
           'Montana':['30','MT'], 'New York':['36','NY'], 'Oregon':['41','OR'], 'Virginia':['51','VA'], 'Wyoming':['56','WY'],'North Carolina':['37','NC'], 
           'Oklahoma':['40','OK'], 'Tennessee':['47','TN'], 'Wisconsin':['55','WI'], 'Alaska':['02','AK'], 'Vermont':['50','VT'], 'North Dakota':['38','ND'],
           'Georgia':['13','GA'], 'Maine':['23','ME'], 'Rhode Island':['44','RI'], 'West Virginia':['54','WV'], 'Idaho':['16','ID'],'South Dakota':['46','SD'],
           'New Mexico':['35','NM'], 'Washington':['53','WA'], 'Pennsylvania':['42','PA'], 'Florida':['12','FL'], 'Utah':['49','UT'], 'Kentucky':['21','KY'],
           'New Hampshire':['33','NH'], 'South Carolina':['45','SC'], 'Nevada':['32','NV'], 'Hawaii':['15','HI'], 'New Jersey':['34','NJ'],'Connecticut':['09','CT']
           , 'Maryland':['24','MD'], 'Massachusetts':['25','MA'], 'Delaware':['10','DE'], 'District of Columbia':['11','DC']}


# In[10]:


def statescrape(state, stateID):

    source = 'https://www.census.gov/quickfacts/fact/table/' + str(state)+ '/PST045218'
    html = urlopen(source)
    soup = BeautifulSoup(html, 'html.parser')

    fulllist = []

    for i in soup.find_all('td'):
    
        fulllist.append(i.text)
     
    headinglist = []
    datalist = []

    for i in range(len(fulllist)):
        if i%2 == 0:
        
            x = fulllist[i].strip('\n')
            formatted = x.strip('\ue840\ue83f\n')
            headinglist.append(formatted)
        
        else:
        
            x = fulllist[i].strip('\n')
            formatted = x.strip('\ue840\ue83f\n') 
            datalist.append(formatted)    

    truedict = dict(zip(headinglist, datalist))  
    truedict['State'] = state
    truedict['StateID'] = stateID
    statedf = pd.DataFrame(truedict, index = [state])
    onestatedf = statedf
    
    return onestatedf


# In[13]:



dflist = pd.DataFrame()
count = 0
for key, value in stateID.items():
    
    #print(count, key, value)
    
    scraped_df = statescrape(value[1], value[0])
    
    dflist = dflist.append(scraped_df)
    count +=1
    
    

records = dflist.to_dict(orient = 'records')    


# In[12]:


db.veilofignorance.insert_many(records)

