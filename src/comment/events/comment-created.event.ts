export class CommentCreatedEvent {
  constructor(
    public readonly commentId: number,
    public readonly userId: number,
    public readonly postId: number,
    public readonly content: string,
  ) {}
}
