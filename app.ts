import { UserList } from "./userlist";
import { User } from "./user";
import { data } from "./data";
import { UserItem, UserHtmlElements } from "./types";

// console.log(parseURLParams(window.location.href));

//general way for selecting elements to iterate over
export const callElements = (
  index: number | string,
  classprefix: string
): UserHtmlElements => {
  return {
    fname: document.getElementById(`${classprefix}fname_${index}`),
    lname: document.getElementById(`${classprefix}lname_${index}`),
    mname: document.getElementById(`${classprefix}mname_${index}`),
    email: document.getElementById(`${classprefix}email_${index}`),
    address: document.getElementById(`${classprefix}address_${index}`),
    number: document.getElementById(`${classprefix}number_${index}`),
    role: document.getElementById(`${classprefix}role_${index}`)
  };
};

export function init() {
  let arr: UserItem[] = [];
  for (let i = 0; i < data.length; i++) {
    let user = new User({
      firstName: data[i]["firstName"],
      middleName: data[i]["middleName"],
      lastName: data[i]["lastName"],
      email: data[i]["email"],
      phoneNumber: data[i]["phoneNumber"],
      address: data[i]["address"]
    });
    arr.push(user);
  }

  let list = new UserList(arr);

  let button: HTMLElement = document.getElementById("changeColor");
  let table: HTMLElement = document.getElementById("tablebody");

  // loading data from userlist instance
  let loadData = list.loadData;
  button.onclick = loadData;
}

init();
