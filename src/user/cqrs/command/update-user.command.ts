export class UpdateUserCommand {
  constructor(
    public readonly id: number,
    public readonly username?: string,
    public readonly email?: string,
    public readonly password?: string,
  ) {}
}
