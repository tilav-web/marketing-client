import { IUser } from "@/interfaces/user.interface";
import { userService } from "@/services/user.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: IUser | null | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: undefined,
  loading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  const data = await userService.findMe();
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
        state.user = null;
      });
  },
});
export const { setUser, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;
