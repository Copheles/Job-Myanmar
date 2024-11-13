import { createSlice } from "@reduxjs/toolkit";

type State = {
  open: boolean;
  type: string | null;
  header: string | null;
  bodyText?: string | null;
  id?: string | null;
};

const initialState: State = {
  open: false,
  type: null,
  header: null,
  bodyText: null,
  id: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type;
      state.open = true;
      state.header = action.payload.header;
      state.bodyText = action.payload.bodyText || null;
      state.id = action.payload.id || null;
    },
    closeModal: (state) => {
      state.type = null;
      state.open = false;
      state.header = null;
      state.bodyText = null;
      state.id = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
