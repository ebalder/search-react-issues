import { configureStore } from '@reduxjs/toolkit';
import issuesSlice from './issuesSlice';

export default configureStore({
  reducer: {
    issues: issuesSlice,
  },
});
