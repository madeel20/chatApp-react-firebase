import React from 'react';

import './ConversationSearch.scss';
import NewConversation from '../new-conversation/NewConversation'

const ConversationSearch = ({ conversations }) => {
    let searchInput = null;

    if (conversations && conversations.length > 0) {
        searchInput = <input type="text" placeholder="Search" />;
    }

    return (
        <div id="search-container">
        <div >
           <h1>Chat App</h1>
        </div>
        {/* <div>
            <NewConversation/> */}
            {/* <img src={require("../../../images/add-user-male.png")}/> */}
        {/* </div> */}
        </div>
        // <div id="search-container">
        //     { searchInput }
        // </div>
    );
}

export default ConversationSearch;