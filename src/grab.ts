import {web3} from "./provider"

export async function grab(blockNumber:number){
    
    const addresses = []

    var data = await web3.eth.getBlock(blockNumber)    
    var promises = data.transactions.map(async (transactionHash) => {
        
        let transaction = await web3.eth.getTransaction(transactionHash);
        let str = transaction.input.substring(0,8)
        if (str === '0x608060'){        
            var receipt = await web3.eth.getTransactionReceipt(transactionHash);        
            addresses.push(receipt.contractAddress)    
        } 
    })  

    await Promise.all(promises)   
    return addresses
}
