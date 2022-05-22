//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Rep is ERC20 {
  constructor() ERC20('REP', 'Rep token') {}

  function faucet(address _to, uint _amount) external {
    _mint(_to, _amount);
  }
}
