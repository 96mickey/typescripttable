import { UserItem, UserHtmlElements } from "./types";
import { User } from "./user";
import { callElements } from "./app";
import { validate, onInput } from "./validate";

let button: HTMLElement = document.getElementById("changeColor");
let table: HTMLElement = document.getElementById("tablebody");

export class UserList {
  "users": UserItem[] = [];

  constructor(init?: UserItem[]) {
    Object.assign(this.users, init);
  }

  loadData = () => {
    let items: UserItem[] = [...this.users];

    let itemsToDisplay: string[] = this.makeLayout(items);

    table.innerHTML = itemsToDisplay.join("");

    button.innerText = "Refresh data";
    button.onclick = this.loadData;

    //adding event to add new user
    let submitnewuserbtn: HTMLButtonElement = document.getElementById(
      "submitnewuser"
    ) as HTMLButtonElement;
    submitnewuserbtn.addEventListener("click", this.addUser);

    //adding event to validate user input
    let elements: UserHtmlElements = callElements("new", "input_");

    Object.entries(elements).forEach(entry => {
      if (entry[1]) entry[1].addEventListener("input", onInput);
    });

    //addeventlisteners as ts do not handle onclick
    for (let i = 0; i < items.length; i++) {
      let editbtn: HTMLElement = document.getElementById(`edit_${i}`);
      let deletebtn: HTMLElement = document.getElementById(`delete_${i}`);
      deletebtn.addEventListener("click", this.deleteRow);
    }
  };

  addUser = () => {
    let elements: UserHtmlElements = callElements("new", "input_");

    let iterableSampleData = Object.entries(elements);

    let noError = false;

    for (let element of iterableSampleData) {
      // console.log(element[1]);
      noError = validate(element[1] as HTMLInputElement);
      if (!noError) {
        alert(`${element[0]} is not valid.`);
        break;
      }
    }

    if (noError) {
      let user = new User({
        firstName: (elements.fname as HTMLInputElement).value,
        middleName: (elements.mname as HTMLInputElement).value,
        lastName: (elements.lname as HTMLInputElement).value,
        email: (elements.email as HTMLInputElement).value,
        phoneNumber: Number((elements.number as HTMLInputElement).value),
        address: (elements.address as HTMLInputElement).value
      });
      user.role = Number((elements.role as HTMLInputElement).value);
      this.users.push(user);
      this.loadData();
    }
  };

  deleteRow = (e: MouseEvent): void => {
    let target = e.target as HTMLButtonElement;
    let index = /\d+/.exec(target.id);
    document
      .getElementById(target.id)
      .removeEventListener("click", this.deleteRow);
    let row: HTMLElement = document.getElementById(`row_${index[0]}`);
    row.parentNode.removeChild(row);
    this.users.splice(Number(index[0]), 1);
    this.loadData();
  };

  makeLayout = (items: object[]): string[] => {
    let itemsToDisplay: string[] = items.map((item: object, index: number) => {
      let itemObj = item as UserItem;
      let editlink = `http://localhost:8080/edit.html?fname=${
        itemObj.firstName
      }&mname=${itemObj.middleName}&lname=${itemObj.lastName}&number=${
        itemObj.phoneNumber
      }&email=${itemObj.email}&address=${itemObj.address}`;
      return `<tr key=${index} id="row_${index}">
                <td id="fname_${index}">
                <div id="value_fname_${index}">
                ${itemObj.firstName}
                </div>
                </td>
                <td id="mname_${index}">
                <div id="value_mname_${index}">
                ${itemObj.middleName}
                </div>
                </td>
                <td id="lname_${index}">
                <div id="value_lname_${index}">
                ${itemObj.lastName}
                </div>
                </td>
                <td id="email_${index}">
                <div id="value_email_${index}">
                ${itemObj.email}
                </div>
                </td>
                <td id="number_${index}">
                <div id="value_number_${index}">
                ${itemObj.phoneNumber}
                </div>
                </td>
                <td id="address_${index}">
                <div id="value_address_${index}">
                ${itemObj.address}
                </div>
                </td>
                <td id="role_${index}">
                <div id="value_role_${index}">
                ${Number(itemObj.role) === 0 ? "User" : "Admin"}
                </div>
                </td>
                <td id="edit_wrapper_${index}" >
                <a href="${editlink}">
                  <button id="edit_${index}" class="btn btn-secondary")">edit</button>
                </a>
                </td>
                <td ><button id="delete_${index}" class="btn btn-danger">delete</button></td>
                </tr>`;
    });

    let inputelement: string = `<tr>
      <td><input type="text" id="input_fname_new" placeholder="First name" ></td>
      <td><input type="text" id="input_mname_new" placeholder="Middle name" ></td>
      <td><input type="text" id="input_lname_new" placeholder="Last name" ></td>
      <td><input type="email" id="input_email_new" placeholder="Email" ></td>
      <td><input type="number" id="input_number_new" placeholder="Phone number" ></td>
      <td><input type="text" id="input_address_new" placeholder="Address" ></td>
      <td><select id="input_role_new">
        <option value=0>User</option>
        <option value=1>Admin</option>
        </select>
      </td>
      <td colspan=2><button class="btn btn-primary btn-block" type="button" id="submitnewuser" >Add</button></td>
      </tr>`;

    itemsToDisplay.push(inputelement);

    return itemsToDisplay;
  };
}
