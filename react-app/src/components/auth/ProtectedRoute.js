import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  // console.log("current user in the protected route: ", user);
  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/login' />}
    </Route>
  )
};


export default ProtectedRoute;
