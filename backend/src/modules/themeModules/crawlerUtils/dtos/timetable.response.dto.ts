export class TimeTableDto {
  time: string;
  possible: boolean;

  constructor(time: string, possible: boolean) {
    this.time = time;
    this.possible = possible;
  }
}
