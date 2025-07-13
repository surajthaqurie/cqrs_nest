export class CreateCommentCommand {
  constructor(
    public readonly userId: number,
    public readonly postId: number,
    public readonly content: string,
  ) {}
}
