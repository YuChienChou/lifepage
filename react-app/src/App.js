import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import DefaultHome from "./components/Home/defaultHome";
import UserHome from "./components/User/userHome";
import UserPorfile from "./components/User/UserProfile";
import SinglePost from "./components/SinglePost/SinglePost";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/user'>
            <UserHome />
          </Route>
          {/* <Route exact path ='/user/:userId'>
            <UserPorfile />
          </Route> */}
          <Route exact path ='/user/:userId/:page'>
            <UserPorfile />
          </Route>
          <Route exact path='/posts/:postId'>
            <SinglePost />
          </Route>
          <Route exact path='/'>
            <DefaultHome />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
