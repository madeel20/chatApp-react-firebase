import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.styles.scss";
import "./NewConversation.scss";
import Background from "../../../images/pencil.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '../../controls/buttons/Button';

const NewConversation = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <div id="new-message-container">
        <div>
          <h2>new group</h2>
        </div>
        <button onClick={() => setModalIsOpen(true)}>+</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setModalIsOpen(false)}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div class="container">
          <h1>
            Create New Group
            <small>Add a picture</small>
          </h1>
          <div class="avatar-upload">
            <div class="avatar-edit">
              <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" />

              <label
                style={{
                  backgroundImage: `url(${Background})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
                for="imageUpload"
              ></label>
            </div>
            <div class="avatar-preview">
              {/* <img src={require('../../../images')} */}
              <div
                id="imagePreview"
                style={{
                  backgroundImage: `url(http://i.pravatar.cc/500?img=7)`,
                }}
              ></div>
            </div>
          </div>
          <input type="text" className="g-name" placeholder="Group Name" /><br/>
          {/* <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
           */}
           <Button>Add Group</Button>
        </div>
      </Modal>
    </>
  );
};

export default NewConversation;
