from .router import router
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import  Request, Body, File, UploadFile, Form
from starlette.formparsers import MultiPartParser
import os
from fastapi.responses import JSONResponse
from pymongo import MongoClient
import uuid
from datetime import datetime
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import cv2
from ultralytics import YOLO
# Get the current date and time
now = datetime.now()



uri = "mongodb://localhost:27017"
client = MongoClient(uri)
database = client["video_processing_system"]
collection  = database["videos"]
collection2  = database["peopledetected"]
# Create the uploads directory if it doesn't exist
UPLOADS_DIR = "uploads"
os.makedirs(UPLOADS_DIR, exist_ok=True)




@router.post("/api/uploadvideo")
#def readfile(request: Request):
#    JSONResponse({"filename": "test", "message": "File uploaded successfully!"})
async def upload_file(file: UploadFile = File(...)):
    # You can access the file's content and metadata here
    contents = await file.read()  # Read the file content
    filename = file.filename  # Get the filename
    unique_filename = f"{uuid.uuid4()}_{filename}"
    content_type = file.content_type  # Get the content type
    # Define the path to save the file
    file_path = os.path.join(UPLOADS_DIR, unique_filename)

    # Save the file to the uploads directory
    with open(file_path, "wb") as f:
        f.write(contents)
    videoesDictionary ={
                'timestamp': now,
                'video_filename': unique_filename
            }
    savedVideo=collection.insert_one(videoesDictionary)
    video_id = str(savedVideo.inserted_id)  # Convert ObjectId to string for JSON response

    
    # Load a pre-trained YOLO model (e.g., YOLOv8n)
    model = YOLO('yolov8n.pt')  # You can also use 'yolov8s.pt', 'yolov8m.pt', etc.

    # Open the video file
    video_path = 'uploads/'+unique_filename
    cap = cv2.VideoCapture(video_path)



    # Initialize a list to store results
    results = []
    frame_number = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        # Perform inference
        detections = model(frame)
        # Extract information
        for result in detections:
            boxes = result.boxes  # Get bounding boxes
            # Get the detected objects
            # Count the number of detected objects
            object_count = len(boxes)
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]  # Bounding box coordinates
                confidence = box.conf[0]  # Confidence score
                timestamp = cap.get(cv2.CAP_PROP_POS_MSEC)  # Get timestamp in milliseconds
                object_count = len(detections)
        

#storing at database
                detectionDictionary ={
                    'frame_number': frame_number,
                    'object_count': object_count,
                    'bounding_box': (x1.item(), y1.item(), x2.item(), y2.item()),  # Convert to Python float
                    'confidence': confidence.item(),  # Convert to Python float
                    'timestamp': timestamp,
                    'video_id': video_id
                }
                    # Perform inference
                detections = model(frame)


                collection2.insert_one(detectionDictionary)


            

        frame_number += 1
                # Append the information to results
    results.append({
                'frame_number': frame_number,
                'object_count': object_count,
                'bounding_box': (x1.item(), y1.item(), x2.item(), y2.item()),  # Convert to Python float
                'confidence': confidence.item(),  # Convert to Python float
                'timestamp': timestamp,
                'video_id': video_id
            })
    cap.release()

# Print or process the results
    for result in results:
        print(result)
    # cap = cv2.VideoCapture(video_path)
    # print('video path')
    # print(video_path)
    print(video_id)
    return {
        "ok":True,
        "success":True,
        "content_type": content_type,
        "message": "File uploaded successfully!",   
    }


