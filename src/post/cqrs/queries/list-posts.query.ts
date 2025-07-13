export class ListPostsQuery {
  constructor(
    public readonly userId?: number,
    public readonly title?: string,
  ) {}
}
