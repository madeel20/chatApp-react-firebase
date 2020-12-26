import React, { useState } from 'react';
import Modal from "react-modal";
import Button from '../controls/buttons/Button';
import Background from "../../images/pencil.png";
import ConversationList from '../../components/conversation/conversation-list/ConversationList';
import { conversationChanged, newMessageAdded, conversationDeleted, conversationsRequested } from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

import TrashIcon from '../controls/icons/trash-icon/TrashIcon';
import AddUser from '../controls/icons/add-user/AddUser'
// import "../conversation/new-conversation/modal.styles.scss";

import './ChatTitle.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    //   backgroundColor: theme.palette.background.paper,
    
    },
    ListItemText:{
        fontSize:'12px',
        fontStyle: 'italic'
    },
    ListItem:{
        marginBottom:'10px',
    }
  }));
const ChatTitle = ({ selectedConversation, onDeleteConversation }) => {
    let chatTitleContents = null;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

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
                <span>{ selectedConversation.title }</span>
                <div onClick={ () => { setModalIsOpen(true); } }>
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
        <>
        <div id="chat-title">
            { chatTitleContents }
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
        <List dense className={classes.root}>
      {[0, 1, 2, 3, 4, 5].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem classes={{root:classes.ListItem}} key={value} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText classes={{primary:classes.ListItemText}} id={labelId} primary={`User ${value + 1}`} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
        </div>
       
      </Modal>
        </>
    );
}

export default ChatTitle;