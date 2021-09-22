import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import PostBody from "../../PostBody/PostBody";
import SignIn from "../SignIn/SignIn";


import './App.scss';

function App() {

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Header/>
        <main className="main">
          <Route path="/" exact component={SignIn}/>
          <Route path="/posts/" exact component={Posts}/>
          <Route path="/posts/:slug"
                 render={({match}) => {
                   const {slug} = match.params;
                   return <PostBody slug={slug}/>
                 }}
          />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
