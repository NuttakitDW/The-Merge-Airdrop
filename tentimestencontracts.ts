
// This script can be used to deploy the "Storage" contract using ethers.js library.
// Please make sure to compile "./contracts/1_Storage.sol" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './ethers.ts'

(async () => {
    try {
        let contracts = [];
        for(let i=0; i < 11; i++){
            
            const result = await deploy('Storage', [{gasLimit: 91000, gasPrice: 859699588269}] )
            console.log(`address: ${result.address}: ${i+1}`)
            contracts.push(result)
        }
        // Add 1 time to prevent failure
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                await contracts[i].store(1).then(tx => tx.wait());
                console.log(i+1, j+1);
    }
  }
    } catch (e) {
        console.log(e.message)
    }
  })()
