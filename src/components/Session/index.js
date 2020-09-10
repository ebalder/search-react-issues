import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sessionSlice, { getToken } from '../../store/sessionSlice';

export default function Session() {
  const session = useSelector( state => state.session );
  const dispatch = useDispatch();

  useEffect( () => {
    if ( !session.logged ) {
      const token = localStorage.getItem('auth');
  
      if ( token ) {
        dispatch( sessionSlice.actions.logIn( token ) );
      } else {
        // if this was an authorization callback, fetch the user token
        const queryString = window.location.search;
        const queryParams = new URLSearchParams( queryString );
        const authCode = queryParams.get("code");
        const state = queryParams.get("state");
      
        if ( state !== process.env.REACT_APP_STATE ) {
          // handle error
          return <Fragment />;
        }
        if ( authCode ) {
          dispatch( getToken( { code: authCode } ) );
        }
      }
    }  
  }, [ session.logged, dispatch ] );
  
  return <Fragment />;
};