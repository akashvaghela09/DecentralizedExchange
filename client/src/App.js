import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from './Components/Alert';
import { Error } from './Components/Error';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { Spinner } from './Components/Spinner';
import { AllRoutes } from './Routes/AllRoutes';
import commonWallet from "./Utils/commonWallet";
import { useEffect } from 'react';
import { setLoading, setTokenList } from "./Redux/app/actions";
import { ethers } from 'ethers';

function App() {
  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isAlert,
  } = useSelector(state => state.app)

  const getTokenData = async () => {
    dispatch(setLoading(true))

    try {
        let list = await commonWallet.getTokens();
        let tokenArray = []

        for(let i = 0; i < list.length; i++){
            let tokenObj = {}
            let ticker = ethers.utils.parseBytes32String(list[i].ticker)
            let lowerCase = ticker.toLowerCase()
            let tokenName = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
            
            tokenObj.name = tokenName;
            tokenObj.ticker = list[i].ticker;
            tokenObj.address = list[i].tokenAddress;
            tokenObj.balance = "0.00";

            tokenArray.push(tokenObj)
        }
        
        dispatch(setTokenList(tokenArray))
        dispatch(setLoading(false))
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getTokenData()
  }, [])

  return (
    <div className="bg-slate-900 h-screen max-h-screen">
      <Header />
      <AllRoutes />
      <Footer />
      {
        isLoading === true && <Spinner />
      }
      {
        isError === true && <Error />
      }
      {
        isAlert.status === true && <Alert />
      }
    </div>
  );
}

export default App;
