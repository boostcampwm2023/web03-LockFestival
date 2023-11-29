export interface ChatLog {
  message: string;
  userId: string;
  type: 'message' | 'in' | 'out' | 'kick';
  time: Date;
}
