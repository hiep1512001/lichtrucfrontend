import * as type from '../../constant/index'
var defaultState = true;
const taskIsShowLichTruc = (state = defaultState, action) => {
    switch (action.type) {
        case type.SHOWBANGLICHTRUC:
            return false;
        case type.SHOWLICHTRUCTHANG:
            return true;
        default:
            return state;
    }
};
export default taskIsShowLichTruc;