from main import app
from api import people, peopledetection, pyfileupload, detectedvideos, getvideo, getdetectedatabyvideo, getvideodetail
app.include_router(people.router)
app.include_router(getvideo.router)
app.include_router(peopledetection.router)
app.include_router(pyfileupload.router)
app.include_router(detectedvideos.router)
app.include_router(getdetectedatabyvideo.router)
app.include_router(getvideodetail.router)
from fastapi.middleware.cors import CORSMiddleware
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

