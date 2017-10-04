pragma solidity 0.4.15;

contract Greeter {
    // variable
    string greeting;
    // event
    event Change(address indexed from, string value);

    function modify(string _greeting) public {
        greeting = _greeting;
        Change(msg.sender, _greeting);
    }

    function greet() constant returns (string) {
        return greeting;
    }
}