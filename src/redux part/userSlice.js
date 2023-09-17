import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {
        id:'',
        name:'',
        email:'',
        password:'',
        entries:'',
        joined:''
      }
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loadUser(state, action){
            state.user = action.payload
        },
        userEntries(state, action){
            state.user.entries= action.payload
        }
    }
})

export const {loadUser, userEntries} = userSlice.actions;
export default userSlice.reducer;