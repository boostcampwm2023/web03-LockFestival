import { UsersRoomsDetailsDto } from '@user/dtos/uesrs.rooms.details.dto';

export class SubscriberInfoDto {
  roomId: number;
  nickname: string;
  resolve: (value: UsersRoomsDetailsDto) => void;
  reject: (value: unknown) => void;
  timer: NodeJS.Timeout;

  constructor({
    roomId,
    nickname,
    resolve,
    reject,
    timer,
  }: {
    roomId: number;
    nickname: string;
    resolve: (value: any) => any;
    reject: (value: unknown) => void;
    timer: NodeJS.Timeout;
  }) {
    this.roomId = roomId;
    this.nickname = nickname;
    this.resolve = resolve;
    this.reject = reject;
    this.timer = timer;
  }
}
