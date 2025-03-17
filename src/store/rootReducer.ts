import { combineReducers } from "redux";
import auth from "@/store/reducers/authenSlice";

const rootReducer = combineReducers({ auth });

export default rootReducer;
