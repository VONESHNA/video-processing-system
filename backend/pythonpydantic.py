from main import app

from pydanic import BaseModel

class Person(BaseModel):
    name:str
    age:int
    email:str

person  =   Person()
person.name =   "ram"
print(person.name)