import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommentCreatedEvent } from '../comment-created.event';

@EventsHandler(CommentCreatedEvent)
export class CommentCreatedHandler implements IEventHandler<CommentCreatedEvent> {
  handle(event: CommentCreatedEvent) {
    console.log('CommentCreatedEvent received:', event);
    // Here you can add side-effects like:
    // - send notification
    // - update read models
    // - trigger analytics
  }
}
