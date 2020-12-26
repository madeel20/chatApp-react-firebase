import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MessageList.scss';
import Message from '../../components/message/Message';
import ReactLoading from 'react-loading';
import { auth, firestore } from '../../firebase';
import { getMessagesOfCurrentConversation } from '../../Store copy/Actions/MessagesActions';

const MessageList = ({ conversationId, getMessagesForConversation, loadMessages }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const stateProps = useSelector(({ Messages, otherUsers }) => {
        return { Messages, otherUsers }
    });
    const { data } = stateProps.Messages;
    let messageItems = null;
    useEffect(() => {
        
        if(conversationId){
            setLoading(true);
        firestore.collection(`chats/${conversationId}/messages`).orderBy('timestamp', 'desc').onSnapshot(function (res) {
            dispatch(getMessagesOfCurrentConversation(res));
            setLoading(false)
        });
        }
    }, [conversationId])

    if (data && data.length > 0) {
        messageItems = data.map((message, index) => {
            return <Message
                key={message.id}
                isMyMessage={message.senderId === auth.currentUser.uid}
                message={message}
                sender={stateProps.otherUsers.data.find(it => it.id === message.senderId)}
            />;
        });
    }
    if (loading) {
        return <div className="d-flex flex-grow-1 justify-content-center align-items-center"><ReactLoading type="spin" width={50} color={'#0048AA'} /></div>
    }
    return (
        <div id="chat-message-list">
            {messageItems}
        </div>
    );
}

export default MessageList