//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract DCX {

    using SafeMath for uint;

    struct Token {
        bytes32 ticker;
        address tokenAddress;
    }

    enum Side {
        BUY,
        SELL
    }

    struct Order {
        uint256 id;
        address trader;
        Side side;
        bytes32 ticker;
        uint256 amount;
        uint256 filled;
        uint256 price;
        uint256 date;
    }

    event NewTrade(
        uint tradeId,
        uint orderId,
        bytes32 indexed ticker,
        address indexed trader1,
        address indexed trader2,
        uint amount,
        uint price,
        uint date
    );

    mapping(bytes32 => Token) public tokens;
    mapping(address => mapping(bytes32 => uint256)) public traderBalances;
    mapping(bytes32 => mapping(uint256 => Order[])) public orderBook;
    bytes32[] public tokenList;
    bytes32 constant DAI = bytes32("DAI");
    address public admin;
    uint256 public nextOrderId;
    uint256 public nextTradeId;

    constructor() public {
        admin = msg.sender;
    }

    function getOrders(
        bytes32 _ticker,
        Side _side
    ) external view returns (Order[] memory){
        return orderBook[_ticker][uint256(_side)];
    }

    function getTokens() external view returns(Token[] memory){
        Token[] memory _tokens = new Token[](tokenList.length);
        for(uint256 i = 0; i < tokenList.length; i++){
            _tokens[i] = Token(
                tokens[tokenList[i]].ticker,
                tokens[tokenList[i]].tokenAddress
            );
        }

        return _tokens;
    }

    function addToken (
        bytes32 _ticker,
        address _tokenAddress
    ) onlyAdmin() external {
        tokens[_ticker] = Token(_ticker, _tokenAddress);
        tokenList.push(_ticker);
    }

    function deposit (
        uint256 _amount,
        bytes32 _ticker
    ) tokenExist(_ticker) external {
        IERC20(tokens[_ticker].tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );

        traderBalances[msg.sender][_ticker] = traderBalances[msg.sender][_ticker].add(_amount);
    }

    function withdraw (
        uint256 _amount,
        bytes32 _ticker
    ) tokenExist(_ticker) external {
        require(traderBalances[msg.sender][_ticker] >= _amount);
        IERC20(tokens[_ticker].tokenAddress).transfer(msg.sender, _amount);
    }

    function createLimitOrder (
        bytes32 _ticker,
        uint256 _amount,
        uint256 _price,
        Side _side
    ) tokenExist(_ticker) tokenIsNotDai(_ticker) external {
        require(_ticker != DAI, "Can not trade Dai");

        if(_side == Side.SELL){
            require(traderBalances[msg.sender][_ticker] >= _amount, "Insufficient Funds");
        } else {
            require(traderBalances[msg.sender][DAI] >= _amount.mul(_price), "Dai  Balance Insufficient");
        }

        Order[] storage orders = orderBook[_ticker][uint256(_side)];

        orders.push(Order(nextOrderId, msg.sender, _side, _ticker, _amount, 0, _price, block.timestamp));

        uint256 i = orders.length > 0 ? orders.length - 1 : 0;
        while(i > 0){
            if(_side == Side.BUY && orders[i - 1].price > orders[i].price){
                break;
            }

            if(_side == Side.SELL && orders[i - 1].price < orders[i].price){
                break;
            }

            Order memory order = orders[i - 1];
            orders[i - 1] = orders[i];
            orders[i] = order;
            i--;
        }

        nextOrderId++;
    }

    function createMarketOrder (
        bytes32 _ticker,
        uint256 _amount,
        Side _side
    ) tokenExist(_ticker) tokenIsNotDai(_ticker) external {
        if(_side == Side.SELL){
            require(traderBalances[msg.sender][_ticker] >= _amount, "Insufficient Token!!");
        }

        Order[] storage orders = orderBook[_ticker][uint(_side == Side.BUY ? Side.SELL : Side.BUY)];
        uint i;
        uint remaining = _amount;

        while(i < orders.length && remaining > 0){
            uint available = orders[i].amount.sub(orders[i].filled);
            uint matched = (remaining > available) ? available : remaining;
            remaining = remaining.sub(matched);
            orders[i].filled = orders[i].filled.add(matched);

            emit NewTrade(
                nextTradeId,
                orders[i].id,
                _ticker,
                orders[i].trader,
                msg.sender,
                matched,
                orders[i].price,
                block.timestamp
            );

            if(_side == Side.SELL) {
                traderBalances[msg.sender][_ticker] = traderBalances[msg.sender][_ticker].sub(matched);
                traderBalances[msg.sender][DAI] = traderBalances[msg.sender][DAI].add(matched.mul(orders[i].price));
                traderBalances[orders[i].trader][_ticker] = traderBalances[orders[i].trader][_ticker].add(matched);
                traderBalances[orders[i].trader][DAI] = traderBalances[orders[i].trader][DAI].sub(matched.mul(orders[i].price));
            }

            if(_side == Side.BUY) {
                require(
                    traderBalances[msg.sender][DAI] >= matched * orders[i].price,
                    "Dai balance is Low"
                );

                traderBalances[msg.sender][_ticker] = traderBalances[msg.sender][_ticker].add(matched);
                traderBalances[msg.sender][DAI] = traderBalances[msg.sender][DAI].sub(matched.mul(orders[i].price));
                traderBalances[orders[i].trader][_ticker] = traderBalances[orders[i].trader][_ticker].sub(matched);
                traderBalances[orders[i].trader][DAI] = traderBalances[orders[i].trader][DAI].add(matched.mul(orders[i].price));
            }

            nextTradeId++;
            i++;
        }


        while(i < orders.length && orders[i].filled == orders[i].amount) {
            for(uint j = i; i < orders.length - 1; j++) {
                orders[j] = orders[j + 1];
            }
            orders.pop();
            i++;
        }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");

        _;
    }

    modifier tokenExist(bytes32 _ticker) {
        require(tokens[_ticker].tokenAddress != address(0), "Not Supported Right Now");

        _;
    }

    modifier tokenIsNotDai(bytes32 _ticker) {
        require(_ticker != DAI, "Cannot Trade DAI Tokens, try something else");
        
        _;
    }
}