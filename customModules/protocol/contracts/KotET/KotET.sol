pragma solidity 0.4.15;

contract KotET {
  address public king;
  uint public claimPrice = 100;
  address owner;
  event LogString(string str);
  event LogAddress(address sender);

  function KotET() payable {
    LogAddress(msg.sender);
    owner = msg.sender;
    king = msg.sender;
    if (msg.value < 1 ether) throw;
  }

  function() payable {
    LogString('Fallback');
    if (msg.value < claimPrice) throw;

    uint compensation = calculateCompensation();
    bool res = king.send(compensation);
    king = msg.sender;
    claimPrice = calculateNewPrice();
  }

  function sweepCommission(uint amount)  {
    bool res = owner.send(amount);
  }

  function calculateCompensation() private returns(uint) {
    return claimPrice+100;
  }

  function calculateNewPrice() private returns(uint) {
    return msg.value+200;
  }
}