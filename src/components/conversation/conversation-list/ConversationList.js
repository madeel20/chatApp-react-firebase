import React from 'react';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import ConversationItem from '../conversation-item/ConversationItem';
import './ConversationList.scss';

const ConversationList = ({ conversations, selectedConversation, onConversationItemSelected }) => {
    const state = useSelector(({Conversations}) => Conversations);
    const {loading} = state;
    const conversationItems = conversations.map((conversation) => {
        const conversationIsActive = selectedConversation && conversation.id === selectedConversation.id;
        return <ConversationItem 
            onConversationItemSelected={ onConversationItemSelected }
            isActive={ conversationIsActive }
            conversation={ conversation } />;
    });
    if(loading){
        return <div className="d-flex flex-grow-1 justify-content-center align-items-center"><ReactLoading type="spin" width={25} color={'#0048AA'} /></div> 

    }
    return (
        <div id="conversation-list">
            {conversationItems}
        </div>
    );
}

export default ConversationList;