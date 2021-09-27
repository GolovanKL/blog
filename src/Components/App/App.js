import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import Article from "../Article/Article";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import NewArticle from "../NewArticle/NewArticle";
import UserProfile from "../UserProfile/UserProfile";


import './App.scss';

function App() {

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Header/>
        <main className="main">
          <Route path="/sign-in" exact component={SignIn}/>
          <Route path="/sign-up" exact component={SignUp}/>
          <Route path="/new-article" exact component={NewArticle}/>
          <Route path="/profile" exact component={UserProfile}/>
          <Route path={["/", "/articles/"]} exact component={Posts}/>
          <Route path="/articles/:slug"
                 render={({match}) => {
                   const {slug} = match.params;
                   return <Article slug={slug}/>
                 }}
          />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
