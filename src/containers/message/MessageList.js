import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { messagesRequested } from '../../store/actions';
import './MessageList.scss';
import Message from '../../components/message/Message';
import ReactLoading from 'react-loading';
import { auth, firestore } from '../../firebase';
import { getMessagesOfCurrentConversation } from '../../Store copy/Actions/MessagesActions';

const MessageList = ({ conversationId, getMessagesForConversation, loadMessages }) => {
    const dispatch = useDispatch();
    const stateProps = useSelector(({Messages}) => {
        return {...Messages}
    } );
    const {data,loading}=  stateProps;
    const messageDetails = [];
    const messages = messageDetails ? messageDetails.messages: null;
    let messageItems = null;
    useEffect(() => {
        dispatch(getMessagesOfCurrentConversation(conversationId));
        if (!messageDetails) {
            loadMessages(conversationId, null);
        }
    }, [conversationId])

    if (data && data.length > 0) {
        messageItems = data.map((message, index) => {
            return <Message 
                key={index}
                isMyMessage={message.senderId === auth.currentUser.uid}
                message={message} />;
        });
    }
    if(loading){
        return <div className="d-flex flex-grow-1 justify-content-center align-items-center"><ReactLoading type="spin" width={50} color={'#0048AA'} /></div> 
    }
    return (
        <div id="chat-message-list">
            {messageItems}
        </div>
    );
}

export default MessageList