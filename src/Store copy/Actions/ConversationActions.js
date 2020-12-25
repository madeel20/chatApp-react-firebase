import { getCollection } from "../../firebase/helpers";
import { convertToArray } from "../../utils/helpers";
import Conversations from "../Constants/Conversations";

export const getAllConversationsOfCurrentUser = (CB) => async (dispatch) => {
    dispatch({type:Conversations.GET_ALL_CONVERSATIONS_OF_CURRENT_USER,payload:{ loading:true }})
     await getCollection('chats').then(res=>{
        dispatch({type:Conversations.GET_ALL_CONVERSATIONS_OF_CURRENT_USER,payload:{loading:false, conversations:convertToArray(res) }});
        CB && CB(); })
        .catch((error) => {
            console.log(error);
            dispatch({ type: Conversations.GET_ALL_CONVERSATIONS_OF_CURRENT_USER, payload:{ loading: false } });
        });
};
export const conversationChanged = conversationId => ({
    type: 'SELECTED_CONVERSATION_CHANGED',
    conversationId
});

export const conversationsRequested = () => ({
    type: 'CONVERSATIONS_REQUESTED'
});

export const conversationDeleted = () => ({
    type: 'DELETE_CONVERSATION'
});

export const newMessageAdded = textMessage => ({
    type: 'NEW_MESSAGE_ADDED',
    textMessage
});

export const messagesRequested = (conversationId, numberOfMessages, lastMessageId) => ({
    type: 'MESSAGES_REQUESTED',
    payload: {
        conversationId,
        numberOfMessages,
        lastMessageId
    }
});

export const messagesLoaded = (conversationId, messages, hasMoreMessages, lastMessageId) => ({
    type: 'MESSAGES_LOADED',
    payload: {
        conversationId,
        messages,
        hasMoreMessages,
        lastMessageId
    }
});