import { configureStore } from '@reduxjs/toolkit';

import pixelsArtReducer from './pixelsArtSlice';

export const store = configureStore({
  reducer: pixelsArtReducer
});
