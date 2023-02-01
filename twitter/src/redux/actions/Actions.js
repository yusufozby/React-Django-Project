import { LOGIN, LOGOUT } from "../constants/Constants"


export const login = (payload) => {
    return {type:LOGIN,payload}
}
export const logout = () => {
    return {type:LOGOUT};
}

export const success = () => {
    return {type:"SUCCESS"}
};
export const failed = () => {
    return {type:"FAILED"};
}