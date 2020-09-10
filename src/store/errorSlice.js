import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice( {
  name: 'catchError',
  initialState: [],
  reducers: {
    catch( state, action ) {
      state.push( action.payload );
    },
    requestError( state, action ) {
      if ( !action.payload.handled ) {
        console.error( action.payload );
        state.push( 'A fetch error has occurred!' );
        action.payload.handled = true;
      }
    },
    clear( state, action ) {
      state.splice( 0, state.length );
    },
  },
} );

export default errorSlice;
