export class PaginationMetaDto {
  restCount: number;
  nextCursor: number | string | undefined;
  constructor(restCount: number, nextCursor: number | string | undefined) {
    this.restCount = restCount;
    this.nextCursor = nextCursor;
  }
}
