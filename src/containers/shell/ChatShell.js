import React, { useEffect, useRef } from 'react';

import ConversationSearch from '../../components/conversation/conversation-search/ConversationSearch';
import NoConversations from '../../components/conversation/no-conversations/NoConversations';
import ConversationList from '../../components/conversation/conversation-list/ConversationList';
import NewConversation from '../../components/conversation/new-conversation/NewConversation';
import ChatTitle from '../../components/chat-title/ChatTitle';
import MessageList from '../message/MessageList';
import ChatForm from '../../components/chat-form/ChatForm';
import './ChatShell.scss';
import { useDispatch, useSelector } from 'react-redux';
import { conversationChanged ,conversationDeleted, getAllConversationsOfCurrentUser, setSelectedCategory} from '../../Store copy/Actions/ConversationActions';
import { getAllUsers } from '../../Store copy/Actions/UsersActions';
import { auth, firestore } from '../../firebase';

const ChatShell = () => {
    const dispatch = useDispatch();
    const stateProps = useSelector(state =>state)
    const {Conversations} = stateProps;
    const {conversations,selectedConversation} = Conversations;
   const intervalObj = useRef();
    useEffect(() => {
        firestore.collection(`chats`).where('memberIds','array-contains',auth.currentUser.uid).onSnapshot(function (res) {
            dispatch(getAllConversationsOfCurrentUser(res.docs));
        });
        firestore.collection(`users`).onSnapshot(function (res) {
            dispatch(getAllUsers(res.docs));
        });
    }, []);
    useEffect(() => {
        if(selectedConversation){
            dispatch(setSelectedCategory(conversations.find(conv =>conv.id === selectedConversation.id)));
        }
    }, [conversations])
    let conversationContent = (
        <>
            <NoConversations></NoConversations>
        </>
    );

    if (conversations.length > 0) {
        conversationContent = (
            <>
                <MessageList conversationId={selectedConversation?.id ||""}  />
            </>
        );
    }

    return (
        <div id="chat-container">
            <ConversationSearch conversations={conversations} />
            <ConversationList
                onConversationItemSelected={(id)=>dispatch(conversationChanged(id))}
                conversations={conversations}
                selectedConversation={selectedConversation} />
            <NewConversation />
            <ChatTitle 
                selectedConversation={selectedConversation}
                onDeleteConversation={()=>{}} />
            {conversationContent}
            <ChatForm 
                selectedConversation={selectedConversation}
                onMessageSubmitted={()=>{}} />
        </div>
    );
}



export default ChatShell;