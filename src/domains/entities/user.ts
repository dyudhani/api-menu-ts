export class User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  public authAudience: Array<string> = [];

  constructor({
    id,
    email,
    password,
    createdAt,
    updatedAt,
  }: {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class AccessToken {
  id: string;
  sub: string;
  createdAt: Date;
  expiresAt: Date;

  constructor({
    id,
    sub,
    createdAt,
    expiresAt,
  }: {
    id: string;
    sub: string;
    createdAt: Date;
    expiresAt: Date;
  }) {
    this.id = id;
    this.sub = sub;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
  }
}

export class RefreshToken {
  id: string;
  accessTokenId: string;
  createdAt: Date;
  expiresAt: Date;

  constructor({
    id,
    accessTokenId,
    createdAt,
    expiresAt,
  }: {
    id: string;
    accessTokenId: string;
    createdAt: Date;
    expiresAt: Date;
  }) {
    this.id = id;
    this.accessTokenId = accessTokenId;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
  }
}

export class JWT {
  auth_token: string;
  refresh_token: string;
}
