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
        },
        logoutUser(state){
            state.user.id=''
            state.user.name=''
            state.user.email=''
            state.user.password=''
            state.user.entries=''
            state.user.joined=''
        }
    }
})

export const {loadUser, userEntries, logoutUser} = userSlice.actions;
export default userSlice.reducer;