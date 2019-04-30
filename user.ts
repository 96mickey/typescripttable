enum Role {
  user,
  admin
}
export class User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  address: string;
  private _role?: Role = Role.user;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  set role(role: number) {
    this._role = role;
  }

  get role() {
    return this._role;
  }
}
