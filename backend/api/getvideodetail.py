from fastapi import APIRouter, Response, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from typing import List, Dict, Any
import os

router = APIRouter()

# Define a function to convert BSON documents to JSON-compatible dictionaries
def bson_to_dict(bson_document):
    # Convert ObjectId to string and handle other BSON types if necessary
    document = bson_document.copy()  # Create a copy to avoid modifying the original
    document["_id"] = str(document["_id"])  # Convert ObjectId to string
    return document

@router.get("/api/getvideodetail/{id}", response_model=List[Dict[str, Any]])
async def get_videodetail(id: str):  # Change the type to str
    uri = "mongodb://localhost:27017"
    client = MongoClient(uri)
    database = client["video_processing_system"]
    collection = database["videos"]

    try:
        # Convert the string id to ObjectId
        object_id = ObjectId(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid ObjectId format")

    # Query the collection for documents with the specified _id
    detected_documents = list(collection.find({"_id": object_id}))

    if not detected_documents:
        raise HTTPException(status_code=404, detail="No documents found for the given video ID")

    # Convert the BSON documents to JSON-compatible dictionaries
    result = [bson_to_dict(doc) for doc in detected_documents]

    return result
