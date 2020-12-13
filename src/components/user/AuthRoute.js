import React from 'react';
import {Route,Redirect} from 'react-router-dom';

function AuthRoute({children,...rest}){
    return(
        <Route
            {...rest}
            render={({location})=>
            sessionStorage.getItem('isLogin')==='true'?(
                children
            ):(
                <Redirect
                    to={{pathname:'/login',state:{from:location}}}/>
            )
            }
        />
    )
}
export default AuthRoute;