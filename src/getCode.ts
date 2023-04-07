import  {web3} from "./provider"
import  {grab} from "./grab"

export async function getCode (blockNumber:number){
    const codes = []
    var arry = await grab(blockNumber)
    if( arry.length > 0){   
        var promises = arry.map(async (address) => {
            const byte_code = await web3.eth.getCode(address)
            codes.push({
                contractAddress:address,
                byteCode:byte_code
            })
        })
        await Promise.all(promises)   
        return codes
    }else{return null}
}
