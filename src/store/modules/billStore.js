import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: "bill",
    initialState: {
        billList: []
    },
    reducers: {
        setBillList: (state, action) => {
            state.billList = action.payload; //payload 就是传递的数据
        }
    }
})

const { setBillList } = billStore.actions;

const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:8888/ka");
        dispatch(setBillList(res.data)); //调用setBillList函数，将数据传递给reducer
    }
};

const reducer = billStore.reducer;

export { getBillList };

export default reducer;