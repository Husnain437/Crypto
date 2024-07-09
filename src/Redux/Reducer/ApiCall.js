import { createSlice} from "@reduxjs/toolkit";

const initialState={
    details:[]
}

export const cryptSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers:{
        addCryptoItem:(state, action)=>{
            const data = action.payload
            state.details.push(data)
           
        },
        resetState: state => initialState,
        CryptoNews:(state,action)=>{
            console.log(action.payload,'news payload');
            const newsData = action.payload
            state.details.push(newsData);
        },
        
        
        
    }
})

export const {addCryptoItem,resetState,CryptoNews} = cryptSlice.actions
export default cryptSlice.reducer


