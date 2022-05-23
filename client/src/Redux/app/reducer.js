import {
    SET_LOADING,
    SET_ERROR,
    SET_ALERT,
    SET_CONTRACT_INSTANCE,
    SET_WALLET,
    SET_WALLET_MODAL,
    SET_IS_AUTH
} from './actionTypes';

const initialState = {
    isLoading: false,
    isError: false,
    isAlert: { status: false, msg: "" },
    contract: {},
    wallet: {},
    walletModal: false,
    isAuth: false
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
        default:
            return state
    }
}

export { reducer }