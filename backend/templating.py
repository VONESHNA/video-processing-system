from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="template")


@app.get("/", response_class=HTMLResponse)
def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html"
    )

# @app.get("/uploadvideo", response_class=HTMLResponse)
# def read_item(request: Request):
#     return templates.TemplateResponse(
#         request=request, name="videoupload.html"
#     )