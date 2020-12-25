import Orders from '../Constants/Orders';
const iState = {
    loading: false,
    data: [],
};
const UserReducer = (state = iState, action = {}) => {
    switch (action.type) {
        case Orders.LOAD_ORDERS:
            return {...state, ...action.payload};
        default:
            return state;
    }
};
export default UserReducer;
