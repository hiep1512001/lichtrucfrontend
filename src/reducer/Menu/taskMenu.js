
import * as type from '../../constant/index'
var defaultState = type.MENUTINHLICHTRUC
const taskMenu = (state = defaultState, action) => {
    switch (action.type) {
        case type.SETYPEPMENU:
            return action.typeMenu
        default:
            return state;
    }
};
export default taskMenu;