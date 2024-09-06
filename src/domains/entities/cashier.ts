import { User } from './user';

export class Cashier extends User {
  id: string;
  email: string;
  password: string;
  userId: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  public authAudience: Array<string> = ['cashier-auth'];

  constructor({
    id,
    email,
    password,
    userId,
    firstName,
    lastName,
    createdAt,
    updatedAt,
  }: {
    id: string;
    email: string;
    password: string;
    userId: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super({ id, email, password, createdAt, updatedAt });
    this.id = id;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
