import './App.css';
import { useSelector } from 'react-redux';
import { Alert } from './Components/Alert';
import { Error } from './Components/Error';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { Spinner } from './Components/Spinner';
import { AllRoutes } from './Routes/AllRoutes';

function App() {
  const {
    isError,
    isLoading,
    isAlert,
  } = useSelector(state => state.app)

  return (
    <div className="bg-slate-400 h-screen max-h-screen">
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
