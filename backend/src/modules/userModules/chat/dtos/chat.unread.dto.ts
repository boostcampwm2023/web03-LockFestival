export class ChatUnreadDto {
  roomId: string;
  cursorLogId: string;
  direction: -1 | 1;
  count: number;
}
