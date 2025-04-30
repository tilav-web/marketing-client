// src/store/slices/contentSlice.ts
import { IContent } from "@/interfaces/content.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContentState {
  contents: IContent[];
}

const initialState: ContentState = {
  contents: [],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContents: (state, action: PayloadAction<IContent[]>) => {
      state.contents = action.payload;
    },
    addContent: (state, action: PayloadAction<IContent>) => {
      state.contents.push(action.payload);
    },
    updateContent: (state, action: PayloadAction<IContent>) => {
      const index = state.contents.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.contents[index] = action.payload;
      }
    },
    deleteContent: (state, action: PayloadAction<string>) => {
      state.contents = state.contents.filter((c) => c._id !== action.payload);
    },
  },
});

export const { setContents, addContent, updateContent, deleteContent } =
  contentSlice.actions;

export default contentSlice.reducer;
