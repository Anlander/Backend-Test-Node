import React from 'react';
import MainRouter from './MainRouter';
import Home from './Components/Home';
import './App.css';

function App() {
  return (
   <MainRouter>
      <Home />
   </MainRouter>
  );
}

export default App;
