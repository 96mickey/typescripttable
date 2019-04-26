export class User {
  "First Name": string;
  "Middle Name": string;
  "Last Name": string;
  "Email": string;
  "Phone Number": number;
  "Address": string;
  "Role"?: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
