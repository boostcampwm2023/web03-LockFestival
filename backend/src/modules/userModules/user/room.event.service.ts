import { SEC_TO_MILLI } from '@constants/time.converter';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { UsersRoomsDetailsDto } from '@user/dtos/uesrs.rooms.details.dto';
import { SubscriberInfoDto } from '@user/dtos/subscriber.info.dto';

export class RoomEventService {
  subscribeMap: Map<number, SubscriberInfoDto[]>;
  constructor(@Inject(UserService) private userService: UserService) {
    this.subscribeMap = new Map<number, SubscriberInfoDto[]>();
  }

  TIMEOUT_DURATION = 5 * SEC_TO_MILLI;

  addSubscribes(subscriber: SubscriberInfoDto) {
    const list: SubscriberInfoDto[] = this.subscribeMap.get(subscriber.roomId) || [];
    list.push(subscriber);
    this.subscribeMap.set(subscriber.roomId, list);
  }

  waitUpdate(roomId: number, nickname: string) {
    return new Promise((resolve, reject) => {
      const timer: NodeJS.Timeout = setTimeout(() => {
        const index = this.subscribeMap.get(roomId).findIndex((subscriber) => {
          return subscriber.roomId == roomId && subscriber.nickname === nickname;
        });
        if (index !== -1) {
          this.subscribeMap.get(roomId).splice(index, 1);
          reject(new HttpException('timeout', HttpStatus.REQUEST_TIMEOUT));
        }
      }, this.TIMEOUT_DURATION);

      this.addSubscribes(new SubscriberInfoDto({ roomId, nickname, resolve, reject, timer }));
    });
  }

  async notifyUpdate(roomId: number) {
    const subscribers: SubscriberInfoDto[] = this.subscribeMap.get(roomId);
    this.subscribeMap.set(roomId, []);
    await Promise.all(
      subscribers.map(
        async ({
          timer,
          resolve,
          nickname,
        }: {
          timer: NodeJS.Timeout;
          resolve: (value: any) => any;
          nickname: string;
        }) => {
          clearTimeout(timer);
          const data: UsersRoomsDetailsDto = await this.userService.getGroupInfo(roomId, nickname);
          resolve(data);
        }
      )
    );
  }
}
