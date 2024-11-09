import React from 'react';
import Header from './header/header';
import Information from './components/Information';
import Transaction from './components/Transaction';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Information />
      <Transaction />
    </div>
  );
}

export default App;
