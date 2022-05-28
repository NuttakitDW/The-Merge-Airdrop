(async () => {
    try {
        // import ethers.js
        const ethers = require('ethers')
        // provider: Infura or Etherscan will be automatically chosen
        const provider = new ethers.providers.JsonRpcProvider("https://rpc.kiln.themerge.dev")
        // Sender private key: // correspondence address 0xb985d345c4bb8121cE2d18583b2a28e98D56d04b
        let privateKey = 'YOUR_PRIVATEKEY'
        // Create a wallet instance
        let wallet = new ethers.Wallet(privateKey, provider)
        // Receiver Address which receives Ether
        let receiverAddress = '0xC986A3a527aBC086d1C5bE4F26f06491413D36b0'
        // Ether amount to send
        let amountInEther = '0.0000001'
        // Create a transaction object
        let tx = {
                to: receiverAddress,
                // Convert currency unit from ether to wei
                value: ethers.utils.parseEther(amountInEther),
                gasLimit: 21000,
                gasPrice: 183052689275
            }
        for(let i=0; i < 3; i++) {
            // Send a transaction
            let result = await wallet.sendTransaction(tx).then((txObj) => {
                console.log('txHash', txObj.hash, i+1)
                })
            
        }
        console.log('DONE')

        
    } catch (e) {
        console.log(e.message)
    }
  })()
