const EthereumLottery = artifacts.require("EthereumLottery");

module.exports = function (deployer) {
    deployer.deploy(EthereumLottery);
};
