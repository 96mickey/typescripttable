export interface UserHtmlElements {
  fname: HTMLInputElement;
  mname: HTMLInputElement;
  lname: HTMLInputElement;
  address: HTMLInputElement;
  number: HTMLInputElement;
  email: HTMLInputElement;
  role?: HTMLInputElement;
}

export interface UserItem {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  address: string;
  role?: number;
}
