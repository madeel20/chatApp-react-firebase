import MessagesReducer from "./messages";
import ConversationsReducer from "./conversations";
import UserReducer from "./UserReducer";
import UsersReducer from "./UsersReducer";
export default {
    User: UserReducer,
    Messages: MessagesReducer,
    Conversations: ConversationsReducer,
    otherUsers: UsersReducer
}
