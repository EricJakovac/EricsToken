//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//ERC20 branch

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract EricsToken is ERC20, Ownable {

    constructor(uint256 initialSupply, address initialOwner) ERC20("EricsToken", "ETK") Ownable(initialOwner) {
        _mint(initialOwner, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}