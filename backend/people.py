from main import app
from pymongo import MongoClient
uri = "mongodb://localhost:27017"
client = MongoClient(uri)
database = client["video_processing_system"]
collection  = database["videos"]

foundAll = collection.find()
for item in foundAll:
    print(item)