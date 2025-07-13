export class UpdateByCompletedCommand {
  id: number;
  completed: boolean;

  constructor(id: number, completed: string | boolean) {
    this.id = id;
    this.completed = completed === 'true' ? true : false;
  }
}
