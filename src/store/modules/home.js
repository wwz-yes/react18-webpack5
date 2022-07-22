import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    counter: 0,
    title: "redux toolkit pre",
}

export const counterSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setCounter: (state, {payload}) => {
            state.counter = payload.counter;
        }
    }
});

// 导出 reducers 方法
export const { setCounter } = counterSlice.actions;

// 默认导出
export default counterSlice.reducer;