import React,{useState} from 'react';
import Modal from 'react-modal'

import './NewConversation.scss';

const NewConversation = () => {
    const [modalIsOpen,setModalIsOpen]=useState(false)
    return (
        <>
        <div id="new-message-container">
            <div><h2>new group</h2></div>
            <button onClick={()=>setModalIsOpen(true)}>+</button>
        </div>
        <Modal
        isOpen={modalIsOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={false}
        onRequestClose={()=>setModalIsOpen(false)}
        style={{
            
            overlay:{
                backgroundColor:'grey',
                // position:'absolute',
                zIndex:9999
            },

        }}>
            <h1>test</h1>
        </Modal>
        </>
    );
}

export default NewConversation;