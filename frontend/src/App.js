import React, { useState, useEffect }from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import FrontPageSpots from './components/Spots';
import * as spotActions from "./store/spots";
import SpotDetails from './components/Spots/spotDetails';
import MySpots from './components/Spots/mySpots';
import MakeFormForSpot from './components/Spots/CreateSpot';
import UpdateASpot from './components/Spots/EditFormSpot';
import MyReviews from "./components/Reviews/myReviews";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotActions.getAllSpots())
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} />
    { isLoaded && (
     <Switch>
      <Route exact path="/">
        <FrontPageSpots />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route exact path = "/spots/new">
        <MakeFormForSpot />
      </Route>
      <Route path="/spots/:spotId">
        <SpotDetails />
      </Route>
      <Route path="/user/reviews">
        <MyReviews />
      </Route>
      <Route path="/user/edit/:spotId">
        <UpdateASpot/>
      </Route>
      <Route exact path="/user/spots">
        <MySpots />
      </Route>

    </Switch>
    )}
    </>
  );
}

export default App;
