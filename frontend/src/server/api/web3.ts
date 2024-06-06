//Initialize web3
import Web3 from 'web3';
import artifact from "~/artifacts/contracts/RealEstateNFT.sol/RealEstateNFT.json"
//Initialize web3
export const web3 = new Web3("http://127.0.0.1:8545");

//Initialize contract
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const contract = new web3.eth.Contract(artifact.abi, contractAddress);


