import React from "react";

import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import './App.css';

function App() {
  return (
    <div className='wrapper'>
      <Header/>
      <main className="main">
        <Posts/>
      </main>
    </div>
  );
}

export default App;
