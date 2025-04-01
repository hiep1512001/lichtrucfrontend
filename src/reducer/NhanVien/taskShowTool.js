
import * as type from '../../constant/index'
var defaultState = "0"
const taskShowTool = (state = defaultState, action) => {
    switch (action.type) {
        case type.SETSHOWTOOL:
            return action.value
        default:
            return state;
    }
};
export default taskShowTool;