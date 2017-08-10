pragma solidity ^0.4.11;

contract ProofOfExistence {
  struct Proof {
    address owner;
    uint time;
  }
  mapping (bytes32 => Proof) myProof;

  function notarize(string document) {
    bytes32 proof = calculateProof(document);
    myProof[proof].owner = msg.sender;
    myProof[proof].time = block.timestamp;
  }

  function calculateProof(string document) constant returns (bytes32) {
    return sha256(document);
  }

  function verifyProof(string document) constant returns (address, uint) {
      return (myProof[sha256(document)].owner, myProof[sha256(document)].time);
  }
}