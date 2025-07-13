export class UpdatePostCommand {
  constructor(
    public readonly postId: number,
    public readonly title?: string,
    public readonly content?: string,
  ) {}
}
