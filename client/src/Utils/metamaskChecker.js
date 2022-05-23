import { ethers } from "ethers";

const metaMaskChecker = async () => {
    if (window.ethereum !== undefined && await metamask.isUnlocked() === false) {
        return {
            status: false,
            msg: "MetaMask is Locked !!"
        }
    } else if (window.ethereum !== undefined && await metamask.isConnected() === false) {
        return {
            status: false,
            msg: "MetaMask Not Connected !!"
        }
    } else if (window.ethereum === undefined) {
        return {
            status: false,
            msg: "MetaMask Not Found !! \n Please Continue as a Guest"
        }
    }

    return { status: true }
}

const metamask = {
    requestAccounts: async () => {
        let accountArr = window.ethereum.request({ method: 'eth_requestAccounts' })
        return accountArr;
    },
    getBalance: async (para = 0) => {
        let acc = await window.ethereum.request({ method: 'eth_requestAccounts' })
        let _balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [acc[para], 'latest']
        })

        return ethers.utils.formatEther(_balance)
    },
    chainId: async () => {
        let chainHex = window.ethereum.request({ method: 'eth_chainId' })
        return chainHex;
    },
    isConnected: async () => {
        let connectStatus = window.ethereum.isConnected()
        return connectStatus;
    },
    isUnlocked: async () => {
        let locked = window.ethereum._metamask.isUnlocked()
        return locked
    }
}

export { metaMaskChecker, metamask }