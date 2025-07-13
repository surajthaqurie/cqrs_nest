export class UpdateCommentCommand {
  constructor(
    public readonly commentId: number,
    public readonly content: string,
  ) {}
}
