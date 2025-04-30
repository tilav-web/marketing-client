import { configureStore } from "@reduxjs/toolkit";
import userReduser from "@/features/user.slice";
import contentReduser from "@/features/content.slice";

export const store = configureStore({
  reducer: {
    user: userReduser,
    contents: contentReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
