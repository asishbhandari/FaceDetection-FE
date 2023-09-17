import { createSlice } from "@reduxjs/toolkit";

const initialState={
    initial: {
        input:"",
        ImageUrl: "",
        box:[],
        route:"signin",
        issignedin: false,
    }
}

const initialUserSlice= createSlice({
    name: 'initialUser',
    initialState,
    reducers:{
        getInput(state, action){
            state.initial.input = action.payload
        },
        getImageUrl(state, action){
            state.initial.ImageUrl= action.payload
        },
        getBox(state, action){
            state.initial.box= action.payload
        },
        getRoute(state, action){
            state.initial.route= action.payload
        },
        getIsSignedIn(state, action){
            state.initial.issignedin= action.payload
        }
    }
})

export const {getIsSignedIn, getRoute, getBox, getImageUrl, getInput}= initialUserSlice.actions;
export default initialUserSlice.reducer;