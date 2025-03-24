import * as type from '../../constant/index'
var defaultState = [{
    thu: "",
    ngayTruc: "",
    tenNguoiTruc: "",
    maNguoiTruc: ""
}];
const taskLichTruc = (state = defaultState, action) => {
    switch (action.type) {
        case type.SETARRLICHTRUC:
            return action.arrNgayTrucs;
        default:
            return state;
    }
};
export default taskLichTruc;