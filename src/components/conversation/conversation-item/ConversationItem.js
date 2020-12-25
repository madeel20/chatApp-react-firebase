import React from 'react';
import classNames from 'classnames';

import './ConversationItem.scss';

const ConversationItem = ({ conversation, isActive, onConversationItemSelected }) => {
    const className = classNames('conversation', {
        'active': isActive
    });
    return (
        <div key={conversation.id} className={className} onClick={() => onConversationItemSelected(conversation.id)}>
            <img src={require('../../../images/group-icon.png')} alt={conversation.imageAlt} />
            <div className="title-text">{conversation.name}</div>
            <div className="created-date">{conversation.createdAt}</div>
            <div className="conversation-message">
                {conversation.recentMessage}
            </div>
        </div>
    );
}

export default ConversationItem;