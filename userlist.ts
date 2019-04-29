import { UserItem, UserHtmlElements } from "./types";
import { data } from "./data";
import { User } from "./user";
import { callElements } from "./app";
import { validate } from "./validate";

let button: HTMLElement = document.getElementById("changeColor");
let table: HTMLElement = document.getElementById("tablebody");

export class UserList {
  "users": UserItem[];

  constructor(init?: Partial<UserList>) {
    Object.assign(this, init);
  }

  loadData = () => {
    let items: UserItem[] = [...data] as UserItem[];

    let itemsToDisplay: string[] = this.makeLayout(items);

    table.innerHTML = itemsToDisplay.join("");

    button.innerText = "Refresh data";
    button.onclick = this.loadData;

    //adding event to add new user
    let submitnewuserbtn: HTMLElement = document.getElementById(
      "submitnewuser"
    );
    submitnewuserbtn.addEventListener("click", this.addUser);

    //adding event to validate user input
    let elements: object = callElements("new", "input_");

    Object.entries(elements).forEach(<T>(entry: T) => {
      entry[1].addEventListener("input", validate);
    });

    //addeventlisteners as ts do not handle onclick
    for (let i = 0; i < items.length; i++) {
      let editbtn: HTMLElement = document.getElementById(`edit_${i}`);
      let deletebtn: HTMLElement = document.getElementById(`delete_${i}`);
      editbtn.addEventListener("click", this.editRow);
      deletebtn.addEventListener("click", this.deleteRow);
    }
  };

  addUser = () => {
    let elements: any = callElements("new", "input_");

    let iterableSampleData = Object.entries(elements);

    let noError = false;

    for (let element of iterableSampleData) {
      noError = validate(element[1]);
      if (!noError) {
        alert(`${element[0]} is not valid.`);
        break;
      }
    }

    if (noError) {
      let user = new User({
        firstName: elements.fname.value,
        middleName: elements.mname.value,
        lastName: elements.lname.value,
        email: elements.email.value,
        phoneNumber: elements.number.value,
        address: elements.address.value
      });
      data.push(user);
      this.loadData();
    }
  };

  editRow = (e: MouseEvent): void => {
    let target = e.target as HTMLButtonElement;
    let index: object = /\d+/.exec(target.id);
    let elements: object = callElements(index[0], "");

    let editbtn = document.getElementById(`edit_wrapper_${index[0]}`);

    //hiding the elements of the table
    //and changing the row to input fields. setting up the initial value
    //and adding event to validate the input fields
    let regex = /\_(.*?)\_/;
    Object.entries(elements).forEach(<T>(entry: T) => {
      let type: string;
      if (/email/gi.test(entry[1].id)) {
        type = "email";
      } else if (/number/gi.test(entry[1].id)) type = "number";
      else type = "text";

      entry[1].children[0].classList.add("hide");
      let strforclass = regex.exec(entry[1].children[0].id);
      entry[1].innerHTML = `${
        entry[1].innerHTML
      } <input type=${type} value="${entry[1].children[0].innerText.trim()}" id="input_${
        strforclass[1]
      }_${index[0]}"></input>`;
      entry[1].children[1].addEventListener("input", validate);
    });

    let editbtnlistener: HTMLElement = document.getElementById(
      e.target["parentNode"].id
    );
    editbtnlistener.removeEventListener("click", this.editRow);

    //changing the button
    editbtn.innerHTML = `<button class="btn btn-outline-success" id="save_${
      index[0]
    }">Save</button><button id="cancel_${
      index[0]
    }" class="btn btn-outline-warning" >Cancel</button>`;
    let savebtn: HTMLElement = document.getElementById(`save_${index[0]}`);
    let cancelbtn: HTMLElement = document.getElementById(`cancel_${index[0]}`);
    savebtn.addEventListener("click", this.save);
    cancelbtn.addEventListener("click", this.cancel);
  };

  cancel = (e: MouseEvent): void => {
    let target = e.target as HTMLButtonElement;
    let index: object = /\d+/.exec(target.id);
    let cancelVal: object = callElements(index[0], "input_");

    //removing event listeners
    Object.entries(cancelVal).forEach(<T>(entry: T) => {
      entry[1].removeEventListener("input", validate);
      entry[1].parentNode.removeChild(entry[1]);
    });

    //removing hide class (to see the actualindex content)
    let removeHideClass: object = callElements(index[0], "value_");
    Object.entries(removeHideClass).forEach(<T>(entry: T) => {
      entry[1].classList.remove("hide");
    });

    //removing save and canccel button and event listeners
    let savebtn: HTMLElement = document.getElementById(`save_${index[0]}`);
    let cancelbtn: HTMLElement = document.getElementById(`cancel_${index[0]}`);
    savebtn.removeEventListener("click", this.save);
    cancelbtn.removeEventListener("click", this.cancel);
    //getting back the edit button
    document.getElementById(
      `edit_wrapper_${index[0]}`
    ).innerHTML = `<button class="btn btn-secondary" id="edit_${
      index[0]
    }">edit</button>`;

    let editbtn: HTMLElement = document.getElementById(`edit_${index}`);
    editbtn.addEventListener("click", this.editRow);
  };

  save = (e: MouseEvent): void => {
    let target = e.target as HTMLButtonElement;
    let index: object = /\d+/.exec(target.id);

    // document.getElementById(e.path[0].id).removeEventListener("click", deleteRow);
    let elements: object = callElements(index[0], "input_");
    let { fname, mname, lname, email, number, address } = <UserHtmlElements>(
      elements
    );

    //removing input fields and event listeners
    Object.entries(elements).forEach(<T>(entry: T) => {
      entry[1].removeEventListener("input", validate);
      entry[1].parentNode.removeChild(entry[1]);
    });

    //getting back the hidden data
    let removeHideClass: object = callElements(index[0], "value_");

    Object.entries(removeHideClass).forEach(<T>(entry: T) => {
      entry[1].classList.remove("hide");
    });

    let {
      fname: resetfname,
      lname: resetlname,
      mname: resetmname,
      email: resetemail,
      number: resetnumber,
      address: resetaddress
    } = <UserHtmlElements>removeHideClass;
    //replacing the value with new values on save
    resetfname.innerHTML = fname.value;
    resetlname.innerHTML = lname.value;
    resetmname.innerHTML = mname.value;
    resetemail.innerHTML = email.value;
    resetnumber.innerHTML = number.value;
    resetaddress.innerHTML = address.value;

    //modify the data
    data[index[0]]["firstName"] = fname.value;
    data[index[0]]["lastName"] = lname.value;
    data[index[0]]["middleName"] = mname.value;
    data[index[0]]["email"] = email.value;
    data[index[0]]["phoneNumber"] = number.value;
    data[index[0]]["address"] = address.value;

    //finally getting the edit button back
    document.getElementById(
      `edit_wrapper_${index}`
    ).innerHTML = `<button id="edit_${index}" class="btn btn-secondary" >edit</button>`;
    document
      .getElementById(`edit_${index}`)
      .addEventListener("click", this.editRow);
  };

  deleteRow = (e: MouseEvent): void => {
    let target = e.target as HTMLButtonElement;
    let index: object = /\d+/.exec(target.id);
    document
      .getElementById(target.id)
      .removeEventListener("click", this.deleteRow);
    let row: HTMLElement = document.getElementById(`row_${index[0]}`);
    row.parentNode.removeChild(row);
    data.splice(Number(index[0]), 1);
    this.loadData();
  };

  makeLayout = (items: object[]): string[] => {
    let itemsToDisplay: string[] = items.map((item: object, index: number) => {
      let user = new User({
        firstName: item["firstName"],
        middleName: item["middleName"],
        lastName: item["lastName"],
        email: item["Email"],
        phoneNumber: item["phoneNumber"],
        address: item["address"]
      });
      return `<tr key=${index} id="row_${index}">
                <td id="fname_${index}">
                <div id="value_fname_${index}">
                ${user["firstName"]}
                </div>
                </td>
                <td id="mname_${index}">
                <div id="value_mname_${index}">
                ${user["middleName"]}
                </div>
                </td>
                <td id="lname_${index}">
                <div id="value_lname_${index}">
                ${user["lastName"]}
                </div>
                </td>
                <td id="email_${index}">
                <div id="value_email_${index}">
                ${user["email"]}
                </div>
                </td>
                <td id="number_${index}">
                <div id="value_number_${index}">
                ${user["phoneNumber"]}
                </div>
                </td>
                <td id="address_${index}">
                <div id="value_address_${index}">
                ${user["address"]}
                </div>
                </td>
                <td id="edit_wrapper_${index}" ><button id="edit_${index}" class="btn btn-secondary")">edit</button></td>
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
      <td colspan=2><button class="btn btn-primary btn-block" type="button" id="submitnewuser" >Add</button></td>
      </tr>`;

    itemsToDisplay.push(inputelement);

    return itemsToDisplay;
  };
}
