pragma solidity 0.4.15;

contract Bob {
  uint public count;

  function unseatKing(address king, uint w) {
    bool res = king.call.value(w)();
  }

  function() payable {
    count++;
  }
}