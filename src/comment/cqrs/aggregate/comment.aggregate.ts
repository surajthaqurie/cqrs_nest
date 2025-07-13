import { AggregateRoot } from '@nestjs/cqrs';
import { CommentCreatedEvent } from 'src/comment/events/comment-created.event';

export class CommentAggregate extends AggregateRoot {
  constructor(
    private readonly commentId: number,
    private readonly userId: number,
    private readonly postId: number,
    private readonly content: string,
  ) {
    super();
  }

  create() {
    this.apply(new CommentCreatedEvent(this.commentId, this.userId, this.postId, this.content));
  }
}
