pragma solidity 0.4.15;
//*** Exercice 9 ***//
// You can store ETH in this contract and redeem them.
contract Vault {
    mapping(address => uint) public balances;
    event LogBool(bool res);

    /// @dev Store ETH in the contract.
    function store() payable {
        balances[msg.sender] += msg.value;
    }

    /// @dev Redeem your ETH.
    function redeem() {
        bool res = msg.sender.call.value(balances[msg.sender])();
        LogBool(res);
        balances[msg.sender] = 0;
    }
}