export interface UserHtmlElements {
  fname: HTMLElement;
  mname: HTMLElement;
  lname: HTMLElement;
  address: HTMLElement;
  number: HTMLElement;
  email: HTMLElement;
  role?: HTMLElement;
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

export interface DataTransfer {
  fname: string[];
  mname: string[];
  lname: string[];
  email: string[];
  number: string[];
  address: string[];
}
