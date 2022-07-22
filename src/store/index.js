import {configureStore} from "@reduxjs/toolkit";
import * as reducer from './modules';

const store = configureStore({
    reducer :{
        ...reducer,
    }
})

export default store;