// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EricsToken {
    string public name = "EricsToken";
    string public symbol = "ETK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public owner;
    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[owner] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public onlyOwner returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        require(_to != address(0), "Invalid address");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }


    function mint(uint256 _value) public onlyOwner returns (bool success) {
        uint256 valueToMint = _value * 10 ** uint256(decimals);
        totalSupply += valueToMint;
        balanceOf[owner] += valueToMint;

        emit Mint(owner, valueToMint);
        return true;
    }

    function burn(uint256 _value) public onlyOwner returns (bool success) {
        uint256 valueToBurn = _value * 10 ** uint256(decimals);
        require(balanceOf[owner] >= valueToBurn, "Insufficient balance to burn");

        totalSupply -= valueToBurn;
        balanceOf[owner] -= valueToBurn;

        emit Burn(owner, valueToBurn);
        return true;
    }
}
