import { firestore } from "../../firebase";
import { convertToArray } from "../../utils/helpers";
import Messages from "../Constants/Messages";


export const getMessagesOfCurrentConversation = (conversationId,CB) => async (dispatch) => {
    dispatch({type:Messages.LOAD_MESSAGES,payload:{ loading:true }})
        firestore.collection(`chats/${conversationId}/messages`).get().then(res=>{
        dispatch({type:Messages.LOAD_MESSAGES,payload:{loading:false, data:convertToArray(res.docs)}});
        CB && CB();
     })
        .catch((error) => {
            console.log(error);
            dispatch({ type: Messages.LOAD_MESSAGES, payload:{ loading: false } });
        });
};