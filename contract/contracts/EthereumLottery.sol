// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EthereumLottery {
    struct Lottery {
        address payable winner;
        uint256 date;
        uint256 totalParticipant;
        uint256 totalBalance;
    }

    Lottery lottery;
    address payable[] public players;
    mapping(uint256 => Lottery) public history;
    uint public currentLotteryIndex;
    address public admin;
    uint _end;
    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }
    constructor(){
        currentLotteryIndex = 1;
        admin = msg.sender;
        _end = block.timestamp + 600;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }


    function getBalance() public view returns (uint){
        return address(this).balance;
    }

    function getTimeLeft() public view returns (uint){
        if (block.timestamp >= _end) {
            return 0;
        }
        return _end - block.timestamp;
    }

    function random() internal view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function endLottery() public isAdmin {
        address payable winner;
        uint winnerIndex = random() % players.length;
        winner = players[winnerIndex];
        history[currentLotteryIndex] = Lottery(players[winnerIndex], block.timestamp, players.length, getBalance());

        winner.transfer(getBalance());

        currentLotteryIndex++;
        _end = block.timestamp + 600;

        players = new address payable[](0);
    }

    function getLotteryHistory(uint256 index) public view returns (address, uint256, uint256, uint256) {
        return (history[index].winner, history[index].date, history[index].totalParticipant, history[index].totalBalance);
    }
}
