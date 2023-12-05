import { UserInfo } from 'types/chat';

const mockUserData: UserInfo[] = [
  {
    userId: 'user_1',
    profileImg: 'https://i.ibb.co/6RfQQLF/image.jpg',
    nickname: '이우리',
    isLeader: false,
    isLeave: false,
    isMe: true,
    lastChatLogId: '',
  },
  {
    userId: 'user_2',
    profileImg: 'https://i.ibb.co/tcgMMq6/image.png',
    nickname: '고인물방장가보자',
    isLeader: true,
    isLeave: false,
    isMe: false,
    lastChatLogId: '',
  },
  {
    userId: 'user_3',
    profileImg: 'https://i.ibb.co/tcgMMq6/image.png',
    nickname: '방린이',
    isLeader: false,
    isLeave: true,
    isMe: false,
    lastChatLogId: '',
  },
  {
    userId: 'user_4',
    profileImg: 'https://i.ibb.co/tcgMMq6/image.png',
    nickname: '100방러',
    isLeader: false,
    isLeave: false,
    isMe: false,
    lastChatLogId: '',
  },
  {
    userId: 'user_5',
    profileImg: '',
    nickname: '노쇼러',
    isLeader: false,
    isLeave: false,
    isMe: false,
    lastChatLogId: '',
  },
];

export default mockUserData;
