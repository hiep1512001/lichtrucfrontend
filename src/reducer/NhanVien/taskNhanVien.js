
import * as type from '../../constant/index'
var defaultState = []
const taskNhanVien = (state = defaultState, action) => {
    switch (action.type) {
        case type.SETDSNHANVIEN:
            return defaultState = action.arr
        default:
            return state;
    }
};
export default taskNhanVien;