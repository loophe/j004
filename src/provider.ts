const Web3 = require( 'web3' )
// require('dotenv').config()
const HTTP_PROVIDER_LINK = 'http://localhost:21301'
// const WS_PROVIDER_LINK = process.env.ARBITRUM_MAIN_LINK//arbitrum-one node end-point

const options = {
    timeout: 30000, // ms
  
    // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
    // headers: {
    //   authorization: 'Basic username:password'
    // },
  
    clientConfig: {
      // Useful if requests are large
      maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
      maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
  
      // Useful to keep a connection alive
      keepalive: true,
      keepaliveInterval: 60000 // ms
    },
  
    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false
    }
};
  
export const web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER_LINK, options))
