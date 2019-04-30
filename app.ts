import { UserList } from "./userlist";
import { User } from "./user";
import { data } from "./data";
import { UserItem, UserHtmlElements } from "./types";
import { parseURLParams } from "./edit";

// console.log(parseURLParams(window.location.href));

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
    number: document.getElementById(`${classprefix}number_${index}`),
    role: document.getElementById(`${classprefix}role_${index}`)
  };

  return obj;
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

let urlParams: any = parseURLParams(window.location.href);
if (!urlParams) init();
else {
  let inputelem: any = callElements("", "input");
  inputelem.fname.value = urlParams.fname[0];
  inputelem.mname.value = urlParams.mname[0];
  inputelem.lname.value = urlParams.lname[0];
  inputelem.email.value = urlParams.email[0];
  inputelem.number.value = urlParams.number[0];
  inputelem.address.value = urlParams.address[0];
}
