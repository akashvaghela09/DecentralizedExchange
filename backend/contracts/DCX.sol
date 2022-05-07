//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// import "openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DCX {
    struct Token {
        bytes32 ticker;
        address tokenAddress;
    }

    mapping(bytes32 => Token) public tokens;
    mapping(address => mapping(bytes32 => uint256)) public traderBalances;
    bytes32[] public tokenList;
    address public admin;

    constructor() public {
        admin = msg.sender;
    }

    function addToken (
        bytes32 _ticker,
        address _tokenAddress
    ) onlyAdmin() external {
        tokens[_ticker] = Token(_ticker, _tokenAddress);
        tokenList.push(_ticker);
    }

    function deposite (
        uint256 _amount,
        bytes32 _ticker
    ) tokenExist(_ticker) external {
        IERC20(tokens[_ticker].tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );

        traderBalances[msg.sender][_ticker] += _amount;
    }

    function withdraw (
        uint256 _amount,
        bytes32 _ticker
    ) tokenExist(_ticker) external {
        require(traderBalances[msg.sender][_ticker] >= _amount);
        IERC20(tokens[_ticker].tokenAddress).transfer(msg.sender, _amount);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");

        _;
    }

    modifier tokenExist(bytes32 _ticker) {
        require(tokens[_ticker].tokenAddress != address(0), "Not Supported Right Now");

        _;
    }
}