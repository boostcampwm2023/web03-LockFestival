export class ChatUnreadDto {
  roomId: string;
  startLogId: string;
  direction: -1 | 1;
  count: number;
}
