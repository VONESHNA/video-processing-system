from main import app

from fastapi import  Request, Body, File, UploadFile, Form

from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
templates = {}

@app.get("/", response_class=HTMLResponse)
def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html"
    )


@app.post("/postdata")
def handleForm(videofile:str = Form(...)):
    print(videofile)
