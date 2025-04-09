from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import  Request, Body, File, UploadFile, Form
from starlette.formparsers import MultiPartParser
import shutil
import os
import uuid

from api import people, peopledetection, pyfileupload, detectedvideos, getvideo, getdetectedatabyvideo, getvideodetail
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(people.router)
app.include_router(getvideo.router)
app.include_router(peopledetection.router)
app.include_router(pyfileupload.router)
app.include_router(detectedvideos.router)
app.include_router(getdetectedatabyvideo.router)
app.include_router(getvideodetail.router)
app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="template")


origins = [
    "http://localhost:3000",  # React app running on this port
    "http://127.0.0.1:3000",  # React app running on this port
    "http://localhost:5173"   # React app running on this port
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, you can specify a list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
def Home():
    return "Hi Home"    

@app.get("/blog/{userName}")
def Blogpage(userName):
    return {"page":"blog page", "User Name":userName}

@app.get("/uploadvideo", response_class=HTMLResponse)
def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="videoupload.html"
    )

# Define the directory where you want to save the uploaded files
UPLOAD_DIRECTORY = "uploads"

# Create the uploads directory if it doesn't exist
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.post("/savevideo")

async def upload_file(videofile: UploadFile = File(...)):
    unique_filename = f"{uuid.uuid4()}_{videofile.filename}"
    file_location = os.path.join(UPLOAD_DIRECTORY, unique_filename)
    
    # Save the uploaded file
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(videofile.file, buffer)
    
    return {"info": f"file '{videofile.filename}' saved at '{file_location}'"}


# async def handleForm(videofile:UploadFile = File(...)):
#     contentvideofile = await videofile.read()
#     print(contentvideofile)
#     return {"filename": videofile.filename, "content_type": videofile.content_type, "size": len(contentvideofile)}

# async def handlFile(request: Request):
#     async for data in request.stream():
#         print(data)