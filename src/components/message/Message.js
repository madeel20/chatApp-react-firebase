import React from 'react';
import classNames from 'classnames';
import {getFormattedDate} from '../../utils/helpers'
import './Message.scss';

const Message = ({ isMyMessage, message }) => {
    const messageClass = classNames('message-row', {
        'you-message': !isMyMessage,
        'other-message': isMyMessage
    });
    
    const imageThumbnail = isMyMessage ? null : <img src={message.imageUrl} alt={message.imageAlt} />;

    return (
        <div className={messageClass}>
            <div className="message-content">
                {imageThumbnail}
                <div className="message-text">
                    {message.text}
                </div>
                <div className="message-time">{getFormattedDate(message.timestamp)}</div>
            </div>
        </div>
    );
}

export default Message;