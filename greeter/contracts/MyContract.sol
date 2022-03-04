// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MyContract {
    string value;
    
    constructor() {
        value = "Myvalue";
    }
    
    function get() public view returns(string memory) {
        return value;
    }
    
    function set(string memory _value) public {
        value = _value;
    }
    
}