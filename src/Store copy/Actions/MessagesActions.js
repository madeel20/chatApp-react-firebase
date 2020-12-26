import { firestore } from "../../firebase";
import { convertToArray } from "../../utils/helpers";
import Messages from "../Constants/Messages";

export const sendMessage = (conversationId,payload,CB) => async (dispatch) => {
    dispatch({type:Messages.SEND_MESSAGE,payload:{ loading:true }})
    firestore.collection(`chats/${conversationId}/messages`).add(payload).then(res=>{
        dispatch({type:Messages.SEND_MESSAGE,payload:{loading:false}});
        CB && CB();
    }).catch((error) => {
        console.log(error);
        dispatch({ type: Messages.SEND_MESSAGE, payload:{ loading: false } });
    });
};

export const getMessagesOfCurrentConversation = (messages,CB) => async (dispatch) => {
    dispatch({type:Messages.LOAD_MESSAGES,payload:{ data: convertToArray(messages.docs) }})
    //     firestore.collection(`chats/${conversationId}/messages`).get().then(res=>{
    //     dispatch({type:Messages.LOAD_MESSAGES,payload:{loading:false, data:convertToArray(res.docs)}});
    //     CB && CB();
    //  })
        // .catch((error) => {
        //     console.log(error);
        //     dispatch({ type: Messages.LOAD_MESSAGES, payload:{ loading: false } });
        // });
};