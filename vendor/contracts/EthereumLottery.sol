// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EthereumLottery {

    address payable[] public players;
    mapping(uint => address payable) public history;
    uint public currentLotteryIndex;
    address public admin;

    constructor(){
        currentLotteryIndex = 1;
        admin = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }

    function getBalance() public view returns (uint){
        return address(this).balance;
    }

    function random() internal view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function pickWinner() public {
        require(players.length >= 3, "Not enough players participating in the lottery");

        address payable winner;
        uint winnerIndex = random() % players.length;
        winner = players[winnerIndex];
        winner.transfer(getBalance());

        history[currentLotteryIndex] = players[winnerIndex];
        currentLotteryIndex++;

        players = new address payable[](0);
    }

    function getWinnerByLottery(uint lottery) public view returns (address payable) {
        return history[lottery];
    }
}
