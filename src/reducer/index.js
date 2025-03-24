import { combineReducers } from "redux";
import taskIsShowLichTruc from "./LichTruc/taskIsShowLichTruc";
import taskLichTruc from "./LichTruc/taskLichTruc";
import taskMenu from "./Menu/taskMenu";
const appReducer = combineReducers({
    taskIsShowLichTruc: taskIsShowLichTruc,
    taskLichTruc: taskLichTruc,
    taskMenu: taskMenu
});
export default appReducer;
