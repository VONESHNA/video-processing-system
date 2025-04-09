from fastapi import APIRouter
from pymongo import MongoClient
from bson import ObjectId
from typing import List, Dict, Any

router = APIRouter()

# Define a function to convert BSON documents to JSON-compatible dictionaries
def bson_to_dict(bson_document):
    # Convert ObjectId to string and handle other BSON types if necessary
    document = bson_document.copy()  # Create a copy to avoid modifying the original
    document["_id"] = str(document["_id"])  # Convert ObjectId to string
    return document

@router.get("/api/people", response_model=List[Dict[str, Any]])
async def get_people():
    uri = "mongodb://localhost:27017"
    client = MongoClient(uri)
    database = client["video_processing_system"]
    collection = database["peopledetected"]
    #["videos"]

    found_all = collection.find()
    items = [bson_to_dict(item) for item in found_all]  # Convert each BSON document to a dict

    return items  # Return the list of dictionaries
