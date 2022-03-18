import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ auth, component: Component, ...rest}) => {
    const navigate = useNavigate()
  return (
    <Route {
        ...rest
    }
    render={(props) => {
        if(auth) return <Component {...props} />;
        if(!auth) return (
            <navigate to={{path:"/login", state: { from: props.location}}}/>
        )
    }}
    />
  );
};

export default ProtectedRoutes