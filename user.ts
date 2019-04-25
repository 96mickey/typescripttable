export class User {
  "First Name": string;
  "Middle Name": string;
  "Last Name": string;
  "Email": string;
  "Phone Number": number;
  "Address": string;
  "Role": string;

  constructor(
    firstname: string,
    middlename: string,
    lastname: string,
    email: string,
    phonenumber: number,
    address: string
  ) {
    this["First Name"] = firstname;
    this["Middle Name"] = middlename;
    this["Last Name"] = lastname;
    this["Email"] = email;
    this["Phone Number"] = phonenumber;
    this["Address"] = address;
  }
}
