const ethereumLotteryAbi = [{"inputs": [], "stateMutability": "nonpayable", "type": "constructor"}, {
    "inputs": [],
    "name": "admin",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "currentLotteryIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "endLottery",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {"inputs": [], "name": "enter", "outputs": [], "stateMutability": "payable", "type": "function"}, {
    "inputs": [],
    "name": "getBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "getLotteryHistory",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getPlayers",
    "outputs": [{"internalType": "address payable[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getTimeLeft",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "history",
    "outputs": [{"internalType": "address payable", "name": "winner", "type": "address"}, {
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "totalParticipant", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "totalBalance",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "players",
    "outputs": [{"internalType": "address payable", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}]
const ethereumLotteryContract = web3 => {
    return new web3.eth.Contract(
        ethereumLotteryAbi,
        "0xe5133595C0dcc2d8488b8225a28a101f37dE5449"
    )
}

export default ethereumLotteryContract
