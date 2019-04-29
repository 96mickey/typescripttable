import { UserList } from "./userlist";

let list = new UserList();

let button: HTMLElement = document.getElementById("changeColor");
let table: HTMLElement = document.getElementById("tablebody");

// loading data from userlist instance
let loadData = list.loadData;
button.onclick = loadData;

//general way for selecting elements to iterate over
export const callElements = (
  index: number | string,
  classprefix: string
): object => {
  let obj = {
    fname: document.getElementById(`${classprefix}fname_${index}`),
    lname: document.getElementById(`${classprefix}lname_${index}`),
    mname: document.getElementById(`${classprefix}mname_${index}`),
    email: document.getElementById(`${classprefix}email_${index}`),
    address: document.getElementById(`${classprefix}address_${index}`),
    number: document.getElementById(`${classprefix}number_${index}`)
  };

  return obj;
};
