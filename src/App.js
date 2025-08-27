import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Companies from './pages/Companies';
import News from './pages/News';
import MarketMood from './pages/MarketMood';
import TradingSignals from './pages/TradingSignals';
import About from './pages/About';
import StockDetail from './pages/StockDetail';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/news" element={<News />} />
          <Route path="/market-mood" element={<MarketMood />} />
          <Route path="/trading-signals" element={<TradingSignals />} />
          <Route path="/about" element={<About />} />
          <Route path="/stock/:symbol" element={<StockDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;