from fastapi import APIRouter, Response
from pymongo import MongoClient
from bson import ObjectId
from typing import List, Dict, Any
from fastapi.responses import FileResponse
import os
router = APIRouter()

# Define a function to convert BSON documents to JSON-compatible dictionaries
def bson_to_dict(bson_document):
    # Convert ObjectId to string and handle other BSON types if necessary
    document = bson_document.copy()  # Create a copy to avoid modifying the original
    document["_id"] = str(document["_id"])  # Convert ObjectId to string
    return document

@router.get("/api/getvideo/{videofile}", response_model=List[Dict[str, Any]])
async def get_video(videofile: str):
    #items = [bson_to_dict(item) for item in found_all]  # Convert each BSON document to a dict
    video_path = "uploads/"+videofile  # Update with your video file path
    if os.path.exists(video_path):
        return FileResponse(video_path)
    #return items  # Return the list of dictionaries
    return Response(content="Video not found", status_code=404)
