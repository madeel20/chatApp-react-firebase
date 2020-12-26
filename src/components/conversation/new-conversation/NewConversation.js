import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.styles.scss";
import "./NewConversation.scss";
import Background from "../../../images/pencil.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '../../controls/buttons/Button';
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from 'react-toast-notifications';
import { createNewConversation, getAllConversationsOfCurrentUser } from "../../../store/Actions/ConversationActions";
import { sendMessage } from "../../../store/Actions/MessagesActions";
const NewConversation = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name,setName] = useState("");
  const { addToast } = useToasts();
  const state = useSelector(({otherUsers}) => {return {...otherUsers}});
  const {data} = state;
  let currentUser = data.find(it=>it.email===auth.currentUser.email);
  const handleSubmit = (e)=>{
      e.preventDefault();
      setModalIsOpen(false)
      if(name===""){
        addToast("Group Name is required!", {
          appearance: 'error',
          autoDismiss: true,
        });
        return
      }
      dispatch(createNewConversation({
        name,
        memberIds:[auth.currentUser.uid],
        memberInfo:{[auth.currentUser.uid]:{name:currentUser.name,email:currentUser.email,token:""}},
        readStatus:{},
        recentMessage:currentUser.name+ ' created this group!',
        recentSender:auth.currentUser.uid,
        recentTimeStmap:new Date().toUTCString()
      },(id)=>{
        if(id){
          dispatch(sendMessage(id,{senderId:auth.currentUser.uid,text:currentUser.name+ ' created this group!',timestamp:new Date().toUTCString()},()=>{
            // dispatch(getAllConversationsOfCurrentUser())
          }))
        }
      }))
      }

  return (
    <>
      <div id="new-message-container">
        <div >
          <h2>new group</h2>
        </div>
        <button className="c-button" onClick={() => setModalIsOpen(true)}>+</button>
        <button className="c-logout" onClick={() => auth.signOut()}>Log Out</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setModalIsOpen(false)}
        className="Modal"
        overlayClassName="Overlay"
      >
        <form onSubmit={handleSubmit} class="container">
          <h1>
            Create New Group
            <small>Add a picture</small>
          </h1>
          <div class="avatar-upload">
            {/* <div class="avatar-edit">
              <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" />

              <label
                style={{
                  backgroundImage: `url(${Background})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
                for="imageUpload"
              ></label>
            </div> */}
            <div class="avatar-preview">
              {/* <img src={require('../../../images')} */}
              <div
                id="imagePreview"
                style={{
                  backgroundImage: `url(${require('../../../images/group-icon.png')})`,
                }}
              ></div>
            </div>
          </div>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} className="g-name" placeholder="Group Name" /><br/>
          {/* <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
           */}
           <Button>Add Group</Button>
        </form>
      </Modal>
    </>
  );
};

export default NewConversation;
