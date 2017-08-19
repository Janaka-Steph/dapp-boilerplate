pragma solidity 0.4.15;

import '../../../../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol';

contract SimpleTheDAO {
  using SafeMath for uint;
  mapping (address => uint) public credit;
  event LogString(string value);

  function donate(address to) payable {
    credit[to] += msg.value;
  }

  function withdraw(uint amount) {
    LogString('First Triggered!!');
    if (credit[msg.sender]>= amount) {
      bool res = msg.sender.call.value(amount)();
      credit[msg.sender]-=amount;
      LogString('Last Triggered!!');
    }
  }

   function withdrawSafeMath(uint amount) {
      LogString('First Triggered!!');
      if (credit[msg.sender]>= amount) {
        bool res = msg.sender.call.value(amount)();
        credit[msg.sender] = credit[msg.sender].sub(amount);
        LogString('Last Triggered!!');
      }
    }

  function queryCredit(address to) returns (uint){
    return credit[to];
  }
}