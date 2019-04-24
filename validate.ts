// var validateform = index => {
//     let error = false;

//     if(!validate(index, "email") || !validate(index, "address") || !validate(index, "fname") || !validate(index, "lname") || !validate(index, "number"))
//     error = true;

//     return error;

// }

export const validate = (e: any): boolean => {
  if (e.target.type === "email") {
    let email: HTMLElement = document.getElementById(e.target.id);
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test((<any>email).value)
    ) {
      email.classList.remove("error");
      return true;
    } else {
      email.classList.add("error");
      return false;
    }
  } else if (e.target.type === "text") {
    let inputVal: HTMLElement = document.getElementById(e.target.id);
    if (!(<any>inputVal).value || (<any>inputVal).value.trim() === "") {
      inputVal.classList.add("error");
      return false;
    } else {
      inputVal.classList.remove("error");
      return true;
    }
  } else if (e.target.type === "number") {
    let number: HTMLElement = document.getElementById(e.target.id);
    if (!(<any>number).value || isNaN((<any>number).value)) {
      number.classList.add("error");
      return false;
    } else {
      number.classList.remove("error");
      return true;
    }
  }
};
