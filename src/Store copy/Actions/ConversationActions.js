import { firestore } from "../../firebase";
import { getCollection } from "../../firebase/helpers";
import { convertToArray } from "../../utils/helpers";
import Conversations from "../Constants/Conversations";

export const getAllConversationsOfCurrentUser = (data,CB) => async (dispatch) => {
    // dispatch({type:Conversations.GET_ALL_CONVERSATIONS_OF_CURRENT_USER,payload:{ loading:true }})
    //  await getCollection('chats').then(res=>{
        dispatch({type:Conversations.GET_ALL_CONVERSATIONS_OF_CURRENT_USER,payload:{loading:false, conversations:convertToArray(data)}});
        // CB && CB(); })
        // .catch((error) => {
            // console.log(error);
            // dispatch({ type: Conversations.GET_ALL_CONVERSATIONS_OF_CURRENT_USER, payload:{ loading: false } });
        // });
};
export const setSelectedCategory = (conversation,CB) => async (dispatch) => {
        dispatch({type:Conversations.SET_SELECTED_CATEGORY,payload:{selectedConversation: conversation}});   
};
export const createNewConversation = (payload,CB) => async (dispatch) => {
    dispatch({type:Conversations.CREATE_NEW_CONVERSATION,payload:{ loading:true }})
    firestore.collection('chats').add(payload).then(res=>{
        dispatch({type:Conversations.CREATE_NEW_CONVERSATION,payload:{loading:false}});
        CB && CB(res.id);
    }).catch((error) => {
        console.log(error);
        dispatch({ type: Conversations.CREATE_NEW_CONVERSATION, payload:{ loading: false } });
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