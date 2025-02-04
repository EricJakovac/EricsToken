
const contractAddress = "0x2194d24398f01686904F9137C2E1b8FF49CB5f9e"; 
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Burn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const web3 = new Web3("http://127.0.0.1:8545");
const contract = new web3.eth.Contract(abi, contractAddress);

web3.eth.getAccounts()
    .then(accounts => console.log("Accounts:", accounts))
    .catch(error => console.error("Error connecting to Ganache:", error));

async function getBalance() {
    const address = document.getElementById("balanceAddress").value;
    const balance = await contract.methods.balanceOf(address).call();
    document.getElementById("balanceResult").innerText = `Stanje: ${balance}`;
}

async function transferTokens() {
    const to = document.getElementById("transferTo").value;
    const amount = document.getElementById("transferAmount").value;
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0]; 

    await contract.methods.transfer(to, amount).send({ from: sender });
    document.getElementById("transferResult").innerText = "Prijenos uspješan!";
}

async function mintTokens() {
    const amount = document.getElementById("mintAmount").value;
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0]; 

    await contract.methods.mint(amount).send({ from: owner });
    document.getElementById("mintResult").innerText = "Mintanje uspješno!";
}

async function burnTokens() {
    const amount = document.getElementById("burnAmount").value;
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];

    await contract.methods.burn(amount).send({ from: owner });
    document.getElementById("burnResult").innerText = "Burnanje uspješno!";
}

async function displayOwner() {
    const owner = await contract.methods.owner().call();
    document.getElementById("ownerAddress").innerText = `Owner: ${owner}`;
}

window.onload = function() {
    displayOwner();
};
