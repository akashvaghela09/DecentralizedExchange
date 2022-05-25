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
    SET_ORDER_TX_TYPE
} from './actionTypes';

const setLoading = (payload) => {
    return {
        type: SET_LOADING,
        payload
    }
}

const setError = (payload) => {
    return {
        type: SET_ERROR,
        payload
    }
}

const setAlert = (payload) => {
    return {
        type: SET_ALERT,
        payload
    }
}

const setContractInstance = (payload) => {
    return {
        type: SET_CONTRACT_INSTANCE,
        payload
    }
}

const setWallet = (payload) => {
    return {
        type: SET_WALLET,
        payload
    }
}

const setWalletModal = (payload) => {
    return {
        type: SET_WALLET_MODAL,
        payload
    }
}

const setIsAuth = (payload) => {
    return {
        type: SET_IS_AUTH,
        payload
    }
}

const setTradeToken = (payload) => {
    return {
        type: SET_TRADE_TOKEN,
        payload
    }
}

const setTokenBalance = (payload) => {
    return {
        type: SET_TOKEN_BALANCE,
        payload
    }
}

const setDaiBalance = (payload) => {
    return {
        type: SET_DAI_BALANCE,
        payload
    }
}

const setWalletTxType = (payload) => {
    return {
        type: SET_WALLET_TX_TYPE,
        payload
    }
}

const setTradeTxSide = (payload) => {
    return {
        type: SET_TRADE_TX_SIDE,
        payload
    }
}

const setOrderTxType = (payload) => {
    return {
        type: SET_ORDER_TX_TYPE,
        payload
    }
}

export { 
    setLoading,
    setError,
    setAlert,
    setContractInstance,
    setWallet,
    setWalletModal,
    setIsAuth,
    setTradeToken,
    setTokenBalance,
    setDaiBalance,
    setWalletTxType,
    setTradeTxSide,
    setOrderTxType
}