import {getCollection} from "../../firebase/helpers";
import Users from "../Constants/Users";
import {convertToArray} from "../../utils/helpers";
export const getAllUsers = (data,CB) => async (dispatch) => {
    dispatch({type:Users.GET_ALL_USERS,payload:{ loading:false,data:convertToArray(data) }})
    //  await getCollection('users').then(res=>{
    //     dispatch({type:Users.GET_ALL_USERS,payload:{loading:false, data:convertToArray(res) }});
    //     CB && CB(); })
    //     .catch((error) => {
    //         console.log(error);
    //         dispatch({ type: Users.GET_ALL_USERS, loading: false });
    //     });
};