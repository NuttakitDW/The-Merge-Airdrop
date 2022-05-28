
export const deploy = async (contractName: string, arguments: Array<any>, from?: string) => {    
    
    console.log(`deploying ${contractName}`)
    // Note that the script needs the ABI which is generated from the compilation artifact.
    // Make sure contract is compiled and artifacts are generated
    const artifactsPath = `browser/contracts/artifacts/${contractName}.json` // Change this for different path

    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
    // 'web3Provider' is a remix global variable object
    //const signer = (new ethers.providers.Web3Provider(web3Provider)).getSigner()
    // Use your wallet's private key to deploy the contract

    const provider = new ethers.providers.JsonRpcProvider("https://rpc.kiln.themerge.dev")
    const privateKey = 'YOUR_PRIVATEKEY'

    const wallet = new ethers.Wallet(privateKey, provider)


    let factory = new ethers.ContractFactory(metadata.abi, metadata.data.bytecode.object, wallet);

    let contract
    if (from) {
        contract = await factory.connect(from).deploy(...arguments);
    } else {
        contract = await factory.deploy(...arguments);
    }    

    // The contract is NOT deployed yet; we must wait until it is mined
    await contract.deployed()
    return contract
    
}: Promise<any>
