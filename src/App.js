import React from 'react';
import DenseAppBar from './components/Nappbar';
import Slider from './components/Slider';
import BasicTable from './components/Table';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoinDetails from './components/CoinDetails';
import Homepage from './Pages/Homepage';
import './App.css'; // Import the CSS file

const App = () => {
  const [currency, setCurrency] = React.useState('inr');
  const [symbol, setSymbol] = React.useState("₹");

  React.useEffect(() => {
    if (currency === "inr") setSymbol("₹");
    else if (currency === "usd") setSymbol("$");
  }, [currency]);

  return (
    <Router>
      <div className='app'>
        <DenseAppBar currency={currency} setCurrency={setCurrency} symbol={symbol} />
        <Routes>
          <Route path="/coins/:id" element={<CoinDetails currency={currency} symbol={symbol} />} />
          <Route path="/" element={<Homepage currency={currency} symbol={symbol} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
