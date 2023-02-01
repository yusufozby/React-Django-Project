import { combineReducers } from "redux";
import { loginReducer } from "../reducers/loginReducer";

import AccountSlice from "../slices/AccountSlice";
import twitSlice from "../slices/twitSlice";
import LikeSlice from "../slices/LikeSlice";
import FollowingSlice from "../slices/FollowingSlice";
import { verifyReducer } from "../reducers/VerifyReducer";


const allReducers = combineReducers({
      loginReducer,
      AccountSlice,
      twitSlice,
      LikeSlice,
      FollowingSlice,
      verifyReducer
   
})

export default allReducers;