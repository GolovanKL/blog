import React from "react";
import { Route } from 'react-router-dom';

import Header from "../Header/Header";
import MainPage from "../MainPage/MainPage";
import Article from "../Article/Article";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import NewArticle from "../NewArticle/NewArticle";
import UserProfile from "../UserProfile/UserProfile";


import './App.scss';

function App() {

  return (
    <div className='wrapper'>
        <Header/>
        <main className="main">
          <Route path="/sign-in" exact component={SignIn}/>
          <Route path="/sign-up" exact component={SignUp}/>
          <Route path="/new-article" exact component={NewArticle}/>
          <Route path="/profile" exact component={UserProfile}/>
          <Route path={["/", "/articles/"]} exact component={MainPage}/>
          <Route path="/articles/:slug"
                 render={({match}) => {
                   const {slug} = match.params;
                   return <Article slug={slug}/>
                 }}
          />
        </main>
    </div>
  );
}

export default App;
