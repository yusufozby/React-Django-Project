import { LOGIN, LOGOUT } from "../constants/Constants";


const authedUser =  JSON.parse(localStorage.getItem("user"))
const initialState = {
    user:  authedUser ? authedUser : null,

    }


export const loginReducer = (state=initialState,action) => {
    switch (action.type) {
        case  LOGIN:
            return {...state,user:authedUser }
        case LOGOUT:
          return {...state,user:null};  
        default:
            return state;
    }
}