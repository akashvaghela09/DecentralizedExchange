import { 
    SET_LOADING,
    SET_ERROR, 
    SET_ALERT, 
    SET_CONTRACT_INSTANCE,
    SET_WALLET,
    SET_WALLET_MODAL,
    SET_IS_AUTH
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

export { 
    setLoading,
    setError,
    setAlert,
    setContractInstance,
    setWallet,
    setWalletModal,
    setIsAuth
}