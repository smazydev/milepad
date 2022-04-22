import { configureStore } from '@reduxjs/toolkit';
import EditorSlice from './EditorSlice';

export const store = configureStore({
  reducer: {
    editor: EditorSlice,
  },
});
