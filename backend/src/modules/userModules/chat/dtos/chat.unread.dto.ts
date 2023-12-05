export class ChatUnreadDto {
  roomId: string;
  cursorLogId: string;
  direction: -1 | 1;
  count: number;
  constructor(roomId: string, cursorLogId: string, direction: -1 | 1, count: number) {
    this.roomId = roomId;
    this.cursorLogId = cursorLogId;
    this.direction = direction;
    this.count = count;
  }
}
