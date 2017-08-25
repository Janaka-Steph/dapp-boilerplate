pragma solidity 0.4.15;
//*** Exercice 2 ***//
// You can buy voting rights by sending ether to the contract.
// You can vote for the value of your choice.
contract VoteTwoChoices {
    mapping(address => uint) public votingRights;
    mapping(address => uint) public votesCast;
    mapping(bytes32 => uint) public votesReceived;

    /// @dev Get 1 voting right per ETH sent.
    function buyVotingRights() payable {
        votingRights[msg.sender] += msg.value / (1 ether);
    }

    /** @dev Vote with nbVotes for a proposition.
     *  @param _nbVotes The number of votes to cast.
     *  @param _proposition The proposition to vote for.
     */
    function vote(uint _nbVotes, bytes32 _proposition) {
        require(_nbVotes + votesCast[msg.sender] <= votingRights[msg.sender]); // Check you have enough voting rights.

        votesCast[msg.sender] += _nbVotes;
        votesReceived[_proposition] += _nbVotes;
    }
}