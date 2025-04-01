import { combineReducers } from "redux";
import taskIsShowLichTruc from "./LichTruc/taskIsShowLichTruc";
import taskLichTruc from "./LichTruc/taskLichTruc";
import taskMenu from "./Menu/taskMenu";
import taskNhanVien from './NhanVien/taskNhanVien'
import taskShowTool from "./NhanVien/taskShowTool"
const appReducer = combineReducers({
    taskIsShowLichTruc: taskIsShowLichTruc,
    taskLichTruc: taskLichTruc,
    taskMenu: taskMenu,
    taskNhanVien: taskNhanVien,
    taskShowTool: taskShowTool
});
export default appReducer;
