pragma solidity 0.4.15;

contract KotET2 {
  address public king;
  uint public claimPrice = 100;
  address owner;

  function KotET2() {
    owner = msg.sender;
    king = msg.sender;
  }

  function() payable {
    if (msg.value < claimPrice) throw;

    uint compensation = calculateCompensation();
    if (!king.call.value(compensation)()) throw;
    king = msg.sender;
    claimPrice = calculateNewPrice();
  }

  function sweepCommission(uint amount)  {
    bool res = owner.send(amount);
  }

  function calculateCompensation() private returns(uint) {
    return claimPrice+100;
  }

  function calculateNewPrice()  private returns(uint) {
    return claimPrice+200;
  }
}