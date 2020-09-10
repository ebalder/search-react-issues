import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getToken = createAsyncThunk(
  'session/getToken',
  async ( payload, thunkApi ) => {
    const env = process.env;

    const response = await fetch( 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: env.REACT_APP_CLIENT_ID,
        client_secret: env.REACT_APP_CLIENT_SECRET,
        code: payload.code,
        redirect_uri: "http://localhost:3000",
        state: env.REACT_APP_STATE,
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    } );

    const json = await response.json();
    thunkApi.dispatch( sessionSlice.actions.logIn( `bearer ${json.access_token}` ) );

    return true;
  }
);

const sessionSlice = createSlice( {
  name: 'session',
  initialState: {},
  reducers: {
    logIn( state, action ) {
      state.logged = true;
      state.token = action.payload;
      localStorage.setItem( 'auth', action.payload );
    },
  },
  extraReducers: {
    [ getToken.fulfilled ]: ( state, action ) => {
      window.location.href = window.location.origin + window.location.pathname;
    },
  }
} );

export default sessionSlice;

export {
  getToken,
};