from main import app
import cv2
from ultralytics import YOLO
from pymongo import MongoClient

uri = "mongodb://localhost:27017"
client = MongoClient(uri)
database = client["video_processing_system"]
collection  = database["videos"]


# Load a pre-trained YOLO model (e.g., YOLOv8n)
model = YOLO('yolov8n.pt')  # You can also use 'yolov8s.pt', 'yolov8m.pt', etc.

# Open the video file
video_path = 'uploads/b7e8781b-7460-4b4c-b7fc-fbf27b032f77_teacher.mp4'
cap = cv2.VideoCapture(video_path)

# Get video ID (you can use the filename or any unique identifier)
video_id = video_path.split('/')[-1]

# Initialize a list to store results
results = []

# Process the video frame by frame
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
            videoesDictionary ={
                'frame_number': frame_number,
                'object_count': object_count,
                'bounding_box': (x1.item(), y1.item(), x2.item(), y2.item()),  # Convert to Python float
                'confidence': confidence.item(),  # Convert to Python float
                'timestamp': timestamp,
                'video_id': video_id
            }

            collection.insert_one(videoesDictionary)

#storing at database
            # Append the information to results
            results.append({
                'frame_number': frame_number,
                'object_count': object_count,
                'bounding_box': (x1.item(), y1.item(), x2.item(), y2.item()),  # Convert to Python float
                'confidence': confidence.item(),  # Convert to Python float
                'timestamp': timestamp,
                'video_id': video_id
            })
            
    frame_number += 1

# Release the video capture object
cap.release()

# Print or process the results
for result in results:
    print(result)



