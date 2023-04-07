import * as celery from 'celery-node';
import {getCode} from './getCode';

const client = celery.createClient(
  "redis://localhost:6379/",
  "redis://localhost:6379/"
);

const task = client.createTask("tasks.add");

async function index(){

  var blockNumber = 16808344
  for(let n=0; n<100; n++){
    var codes = await getCode(blockNumber)
    blockNumber++
    if(codes != null){
      for (let i=0; i<codes.length; i++){
        let code = codes[i]     
        const result = task.applyAsync([code.contractAddress,code.byteCode,blockNumber]);
        var res = await result.get()
        console.log(res);          
      }
    }    
  }
  client.disconnect(); 
}

index()
