import React, { useState } from 'react';
import Modal from "react-modal";
import Button from '../controls/buttons/Button';
import Background from "../../images/pencil.png";
import ConversationList from '../../components/conversation/conversation-list/ConversationList';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import ReactLoading from 'react-loading';
import TrashIcon from '../controls/icons/trash-icon/TrashIcon';
import AddUser from '../controls/icons/add-user/AddUser'
// import "../conversation/new-conversation/modal.styles.scss";

import './ChatTitle.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import firebase from 'firebase'
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //   backgroundColor: theme.palette.background.paper,

  },
  ListItemText: {
    fontSize: '12px',
    fontStyle: 'italic'
  },
  ListItem: {
    marginBottom: '10px',
  }
}));
const ChatTitle = ({ selectedConversation, onDeleteConversation }) => {
  let chatTitleContents = null;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const stateProps = useSelector(({ otherUsers }) => { return { ...otherUsers } });
  const { data } = stateProps;
  const { addToast } = useToasts();
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  if (selectedConversation) {
    chatTitleContents = (
      <>
        <div onClick={() => { setModalIsOpen(true); }}>
          <img width='30px' src={require("../../images/add-user.png")} />
        </div>
        <div></div>
        {/* <div onClick={ () => { onDeleteConversation(); } } title="Delete Conversation">
                <TrashIcon />
                </div> */}

      </>
    );
  }
  const handleAdd = () => {
    if (checked.length === 0) {
      addToast("Select a user first!", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    setLoading(true);
    firebase.firestore().collection('chats').doc(selectedConversation.id).update({
      memberIds: firebase.firestore.FieldValue.arrayUnion(...checked)
    }).then(() => {
      setLoading(false);
      addToast('User added Successfully!',{
        appearance: 'success',
        autoDismiss: true,
      });
      setChecked([]);
      setModalIsOpen(false);
    }).catch(err=>{console.log(err); setLoading(false)});
  }

  let memberIds = selectedConversation && selectedConversation.memberIds ? selectedConversation.memberIds : [];
  let filteredUsers = data.filter(user => memberIds.indexOf(user.id) === -1 && user.id !== auth.currentUser.uid);
  return (
    <>
      <div id="chat-title">
        <h2>{selectedConversation?.name}</h2>
        {chatTitleContents}
      </div>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setModalIsOpen(false)}
        className="modall"
        overlayClassName="overlayy"
      >
        <div>
          <div className="heading">
            <h2 >Add Members</h2></div>
          {loading ?
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
              <ReactLoading type="spin" width={25} color={'#0048AA'} />
            </div> :
            <>
            {filteredUsers.length>0 ? <>
              <List dense className={classes.root}>
                {filteredUsers.map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <ListItem classes={{ root: classes.ListItem }} key={value.id} button>
                      <ListItemAvatar>
                        <Avatar>{value.name[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText classes={{ primary: classes.ListItemText }} id={labelId} primary={value.name} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(value.id)}
                          checked={checked.indexOf(value.id) !== -1}
                          inputProps={{ 'aria-labelledby': labelId }}
                          color="primary"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
              <button onClick={handleAdd} className="primary-button">Add</button>
              </>: <p>No more users.</p>}
            </>
          }
        </div>

      </Modal>
    </>
  );
}

export default ChatTitle;