import { createSlice } from '@reduxjs/toolkit';

export default createSlice( {
  name: 'issues',
  initialState: {
    query: {
      string: '',
    },
  },
  reducers: {
    setQuery( state, action ) {
      state.query = { ...action.payload };
    },
  },
} );