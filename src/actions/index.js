import * as type from "../constant/index"
export const showLichTrucThang = () => {
    return {
        type: type.SHOWLICHTRUCTHANG,
    };
};
export const showBangLichTruc = () => {
    return {
        type: type.SHOWBANGLICHTRUC,
    };
};
export const setArrLichTruc = (arrNgayTrucs) => {
    return {
        arrNgayTrucs: arrNgayTrucs,
        type: type.SETARRLICHTRUC,
    };
};
export const setTypeMenu = (typeMenu) => {
    return {
        typeMenu: typeMenu,
        type: type.SETYPEPMENU,
    };
}
export const setDSNhanVien = (arr) => {
    return {
        type: type.SETDSNHANVIEN,
        arr: arr
    }
}
export const setShowTool = (value) => {
    return {
        type: type.SETSHOWTOOL,
        value: value
    }
}