import { createSlice } from "@reduxjs/toolkit";

export const PromptReducer = createSlice({
    name: "prompt",
    initialState: {
        value: "",
    },
    reducers: {
        changePrompt: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { changePrompt } = PromptReducer.actions;

export default PromptReducer.reducer;