import { configureStore } from '@reduxjs/toolkit';
import billReducer from './modules/billStore';

const store = configureStore({
    reducer: {
        bill: billReducer, // 这里的bill是billSlice.js中定义的
    }
})

export default store;