import React, { useState } from 'react';
import Modal from 'react-modal'
import { auth } from '../../../firebase';

import './NewConversation.scss';

const NewConversation = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return (
        <>
            <div id="new-message-container" className="">
                <div><h2>New Chat</h2></div>
                <button className="c-button" onClick={() => setModalIsOpen(true)}>+</button>
                <button onClick={()=>auth.signOut()} className="c-logout">Logout</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => setModalIsOpen(false)}
                style={{

                    overlay: {
                        backgroundColor: 'grey',
                        // position:'absolute',
                        zIndex: 9999
                    },

                }}>
                <h1>test</h1>
            </Modal>
                
        </>
    );
}

export default NewConversation;