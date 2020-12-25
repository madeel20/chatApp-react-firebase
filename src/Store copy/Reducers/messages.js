import Messages from '../Constants/Messages';

const initialState = {
    messageDetails: {
        '2': [
            {
                id: '1',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Ok fair enough. Well good talking to you.',
                createdAt: 'Oct 20',
                isMyMessage: true
            },
            {
                id: '2',
                imageUrl: require('../../images/profiles/kim.jpeg'),
                imageAlt: 'Kim O\'Neil',
                messageText: `
                    Not sure exactly yet. It will be next year sometime. Probably late.
                `,
                createdAt: 'Oct 20',
                isMyMessage: false
            },
            {
                id: '3',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Yeah I know. But oh well. So when is the big date?',
                createdAt: 'Oct 19',
                isMyMessage: true
            },
            {
                id: '4',
                imageUrl: require('../../images/profiles/kim.jpeg'),
                imageAlt: 'Kim O\'Neil',
                messageText: `
                    Well I know you like doing that stuff. But honestly I think
                    you are already really talented. It's a shame you haven't found
                    what you are looking for yet.
                `,
                createdAt: 'Oct 19',
                isMyMessage: false
            },
            {
                id: '5',
                imageUrl: null,
                imageAlt: null,
                messageText: `
                    I'm doing ok. Just working on building some applications to
                    bulk up my resume, so I can get a better job.
                `,
                createdAt: 'Oct 19',
                isMyMessage: true
            },
            {
                id: '6',
                imageUrl: require('../../images/profiles/kim.jpeg'),
                imageAlt: 'Kim O\'Neil',
                messageText: `
                    I've just been really busy at work myself, looking to get
                    married sometime next year too. How are you going?
                `,
                createdAt: 'Oct 19',
                isMyMessage: false
            },
            {
                id: '7',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Yes it has been a little while',
                createdAt: 'Oct 19',
                isMyMessage: true
            },
            {
                id: '8',
                imageUrl: require('../../images/profiles/kim.jpeg'),
                imageAlt: 'Kim O\'Neil',
                messageText: 'Hey!!!! Have not spoken to you for a while',
                createdAt: 'Oct 19',
                isMyMessage: false
            },
            {
                id: '9',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi Kim?',
                createdAt: 'Oct 19',
                isMyMessage: true
            }
        ],
        '3': [
            {
                id: '1',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ],
        '4': [
            {
                id: '1',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ],
        '5': [
            {
                id: '1',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ],
        '6': [
            {
                id: '1',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ],
        '7': [
            {
                id: '1',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ],
        '8': [
            {
                id: '1',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ],
        '9': [
            {
                id: '1',
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ]
    },
    data:[],
    loading:false,
}

const messagesReducer = (state = initialState, action) => {
    switch(action.type) {
        case Messages.LOAD_MESSAGES:
            return {...state, ...action.payload}
        case 'MESSAGES_LOADED':
            const { conversationId, messages, hasMoreMessages, lastMessageId } = action.payload;
            const currentConversationMapEntry = state.messageDetails[conversationId];
            const newConversationMapEntry = { hasMoreMessages, lastMessageId, messages: [] };

            if (currentConversationMapEntry) {
                newConversationMapEntry.messages = [...currentConversationMapEntry.messages];
            }

            newConversationMapEntry.messages = [...newConversationMapEntry.messages, ...messages];

            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[conversationId] = newConversationMapEntry;

            return { messageDetails: newMessageDetails };
        default: 
            return state;
    }
}

export default messagesReducer;