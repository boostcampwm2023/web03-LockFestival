import { TotalChatLog } from 'types/chat';

const mockChatLogData: TotalChatLog = {
  '1': new Map([
    [
      'log1',
      {
        message: 'Message 1',
        userId: 'user_1',
        type: 'message',
        time: new Date('2023-11-29T02:00:00'),
      },
    ],
    [
      'log2',
      {
        message: 'Message 2',
        userId: 'user_1',
        type: 'message',
        time: new Date('2023-11-29T03:00:00'),
      },
    ],
    [
      'log3',
      { message: 'Message 4', userId: 'user_2', type: 'in', time: new Date('2023-11-29T03:13:00') },
    ],
    [
      'log4',
      {
        message: 'Message 5',
        userId: 'user_4',
        type: 'message',
        time: new Date('2023-11-29T03:40:00'),
      },
    ],
    [
      'log5',
      {
        message: 'Message 6',
        userId: 'user_4',
        type: 'message',
        time: new Date('2023-11-29T03:51:00'),
      },
    ],
    [
      'log6',
      {
        message: 'Message 7',
        userId: 'user_4',
        type: 'message',
        time: new Date('2023-11-29T04:12:00'),
      },
    ],
    [
      'log7',
      {
        message: 'Message 8',
        userId: 'user_1',
        type: 'out',
        time: new Date('2023-11-29T04:15:00'),
      },
    ],
    [
      'log8',
      {
        message: 'Message 9',
        userId: 'user_4',
        type: 'message',
        time: new Date('2023-11-29T04:40:00'),
      },
    ],
    [
      'log9',
      {
        message: 'Message 10',
        userId: 'user_5',
        type: 'message',
        time: new Date('2023-11-29T05:22:00'),
      },
    ],
    [
      'log10',
      {
        message: 'Message 11',
        userId: 'user_5',
        type: 'message',
        time: new Date('2023-11-29T05:45:00'),
      },
    ],
    [
      'log11',
      {
        message: 'Message 12',
        userId: 'user_1',
        type: 'in',
        time: new Date('2023-11-29T06:02:00'),
      },
    ],
    [
      'log12',
      {
        message: 'Message 13',
        userId: 'user_1',
        type: 'message',
        time: new Date('2023-11-29T06:34:00'),
      },
    ],
    [
      'log13',
      {
        message: 'Message 14',
        userId: 'user_1',
        type: 'message',
        time: new Date('2023-11-29T06:55:00'),
      },
    ],
    [
      'log14',
      {
        message: 'Message 15',
        userId: 'user_4',
        type: 'message',
        time: new Date('2023-11-29T07:12:00'),
      },
    ],
    [
      'log15',
      {
        message: 'Message 16',
        userId: 'user_4',
        type: 'out',
        time: new Date('2023-11-29T07:28:00'),
      },
    ],
    [
      'log16',
      {
        message: 'Message 17',
        userId: 'user_2',
        type: 'message',
        time: new Date('2023-11-29T08:00:00'),
      },
    ],
    [
      'log17',
      {
        message: 'Message 18',
        userId: 'user_2',
        type: 'message',
        time: new Date('2023-11-29T08:18:00'),
      },
    ],
    [
      'log18',
      {
        message: 'Message 19',
        userId: 'user_1',
        type: 'message',
        time: new Date('2023-11-29T08:32:00'),
      },
    ],
    [
      'log19',
      {
        message: 'Message 20',
        userId: 'user_1',
        type: 'message',
        time: new Date('2023-11-29T09:00:00'),
      },
    ],
    [
      'log20',
      {
        message: 'Message 21',
        userId: 'user_1',
        type: 'in',
        time: new Date('2023-11-29T09:05:00'),
      },
    ],
    [
      'log21',
      {
        message: 'Message 22',
        userId: 'user_4',
        type: 'message',
        time: new Date('2023-11-29T09:14:00'),
      },
    ],
    [
      'log22',
      {
        message: 'Message 23',
        userId: 'user_4',
        type: 'message',
        time: new Date('2023-11-29T09:30:00'),
      },
    ],
    [
      'log23',
      {
        message: 'Message 24',
        userId: 'user_4',
        type: 'message',
        time: new Date('2023-11-29T09:36:00'),
      },
    ],
    [
      'log24',
      {
        message: 'Message 25',
        userId: 'user_1',
        type: 'out',
        time: new Date('2023-11-29T10:00:00'),
      },
    ],
    [
      'log25',
      {
        message: 'Message 26',
        userId: 'user_2',
        type: 'message',
        time: new Date('2023-11-29T10:05:00'),
      },
    ],
    [
      'log26',
      {
        message: 'Message 27',
        userId: 'user_2',
        type: 'message',
        time: new Date('2023-11-29T10:13:00'),
      },
    ],
    [
      'log27',
      {
        message: 'Message 28',
        userId: 'user_5',
        type: 'message',
        time: new Date('2023-11-29T11:11:00'),
      },
    ],
    [
      'log28',
      {
        message: 'Message 29',
        userId: 'user_5',
        type: 'message',
        time: new Date('2023-11-30T01:12:00'),
      },
    ],
    [
      'log29',
      {
        message: 'Message 30',
        userId: 'user_1',
        time: new Date('2023-11-30T01:33:00'),
        type: 'message',
      },
    ],
  ]),
};

export default mockChatLogData;
