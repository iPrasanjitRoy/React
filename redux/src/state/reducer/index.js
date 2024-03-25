import { combineReducers } from "redux";
import amounteducer from "./amountreducer";
const reducer =  combineReducers({
    amount : amounteducer
})
export default reducer