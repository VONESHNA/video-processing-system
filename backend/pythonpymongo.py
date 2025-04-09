from main import app
from pymongo import MongoClient
uri = "mongodb://localhost:27017"
client = MongoClient(uri)
database = client["video_processing_system"]
collection  = database["videos"]
videoesDictionary = {
    "name" : "Karan",
    "age" : 20,
    "subject" : "mathematics"
}
#collection.insert_one(videoesDictionary)
#foundone = collection.find_one()
#print(foundone)
foundAll = collection.find()
#print(list(foundAll))
for item in foundAll:
    print(item)
