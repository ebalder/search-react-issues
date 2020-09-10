import { configureStore } from '@reduxjs/toolkit';
import errorSlice from './errorSlice';
import issuesSlice from './issuesSlice';
import sessionSlice from './sessionSlice';

export default configureStore({
  reducer: {
    issues: issuesSlice.reducer,
    session: sessionSlice.reducer,
    error: errorSlice.reducer,
  },
});
