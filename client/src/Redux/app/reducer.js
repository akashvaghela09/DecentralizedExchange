import {
    SET_LOADING,
    SET_ERROR,
    SET_ALERT,
    SET_CONTRACT_INSTANCE,
    SET_WALLET,
    SET_WALLET_MODAL,
    SET_IS_AUTH,
    SET_TRADE_TOKEN,
    SET_TOKEN_BALANCE,
    SET_DAI_BALANCE,
    SET_WALLET_TX_TYPE,
    SET_TRADE_TX_SIDE,
    SET_ORDER_TX_TYPE,
    SET_TOKEN_LIST
} from './actionTypes';

const initialState = {
    isLoading: false,
    isError: false,
    isAlert: { status: false, msg: "" },
    contract: {},
    wallet: {},
    walletModal: false,
    isAuth: false,
    tradeToken: "Bat",
    tokenList: [],
    tokenBalance: "0.00",
    daiBalance: "0.00",
    walletTxType: "Deposit",
    tradeTxSide: "Buy",
    orderTxType: "Market"
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        case SET_ERROR:
            return {
                ...state,
                isError: payload
            }
        case SET_ALERT:
            return {
                ...state,
                isAlert: payload
            }
        case SET_CONTRACT_INSTANCE:
            return {
                ...state,
                contract: payload
            }
        case SET_WALLET:
            return {
                ...state,
                wallet: payload
            }
        case SET_WALLET_MODAL:
            return {
                ...state,
                walletModal: payload
            }
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: payload
            }
        case SET_TRADE_TOKEN:
            return {
                ...state,
                tradeToken: payload
            }
        case SET_TOKEN_BALANCE:
            return {
                ...state,
                tokenBalance: payload
            }
        case SET_DAI_BALANCE:
            return {
                ...state,
                daiBalance: payload
            }
        case SET_WALLET_TX_TYPE:
            return {
                ...state,
                walletTxType: payload
            }
        case SET_TRADE_TX_SIDE:
            return {
                ...state,
                tradeTxSide: payload
            }
        case SET_ORDER_TX_TYPE:
            return {
                ...state,
                orderTxType: payload
            }
        case SET_TOKEN_LIST:
            return {
                ...state,
                tokenList: payload
            }
        default:
            return state
    }
}

export { reducer }