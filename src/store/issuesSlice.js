import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const queryIssues = createAsyncThunk(
  'issues/query',
  async ( query, thunk ) => {
    const request = new Request( 'github' );
    const response = await fetch( request, query );
    return response.data;
  }
)

export default createSlice( {
  name: 'issues',
  initialState: [],
  reducers: {
    setIssues( state, action ) {

    },
  },
  extraReducers: {
    [ queryIssues.fulfilled ]: ( state, action ) => {
      state = action.payload;
    }
  }
} );