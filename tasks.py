import os
from dotenv import load_dotenv
from celery import Celery
from pymongo import MongoClient

load_dotenv()

client = MongoClient(
    host =os.getenv('END_POINT'), # <-- IP and port go here
    serverSelectionTimeoutMS = 3000, # 3 second timeout
    username=os.getenv('MONGO_USER_ID'),
    password=os.getenv('MONGO_USER_PASSWORD'),
)

db = client["Test"]

col = db["address-bytecode"]

app = Celery('tasks', broker='redis://localhost:6379/',backend='redis://localhost:6379/')
app.conf.task_serializer = 'json'
@app.task
def add(address, bytecode, block):
    mydict = {        
        "_id":"mainnet-"+address,
        "chain_id":"mainnet",
        "address":address,
        "name":"TestProxy",
        "is_contract":"true",
        "block_number":block,
        "standard":"null",
        "erc20":"null",
        "bytecode":bytecode
    }
    x = col.insert_one(mydict)
    print(x.inserted_id,x.acknowledged)
    return mydict