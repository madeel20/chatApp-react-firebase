import React from 'react';

import TrashIcon from '../controls/icons/trash-icon/TrashIcon';
import AddUser from '../controls/icons/add-user/AddUser'

import './ChatTitle.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ChatTitle = ({ selectedConversation, onDeleteConversation }) => {
    let chatTitleContents = null;

    if (selectedConversation) {
        chatTitleContents = (
            <>
                <span>{ selectedConversation.title }</span>
                <div onClick={ () => { onDeleteConversation(); } } title="Delete Conversation">
                <img width='30px' src={require("../../images/add-user.png")}/>
                  
                </div>
                <div></div>
                <div onClick={ () => { onDeleteConversation(); } } title="Delete Conversation">
                <TrashIcon />
                </div>
               
            </>
        );
    }

    return (
        <div id="chat-title">
            { chatTitleContents }
        </div>
    );
}

export default ChatTitle;