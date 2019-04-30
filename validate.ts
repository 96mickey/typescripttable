// var validateform = index => {
//     let error = false;

//     if(!validate(index, "email") || !validate(index, "address") || !validate(index, "fname") || !validate(index, "lname") || !validate(index, "number"))
//     error = true;

//     return error;

// }

export const onInput = (e: TextEvent) => {
  validate(e.target as HTMLInputElement);
};

export const validate = (element: HTMLInputElement): boolean => {
  if (element.type === "email") {
    let email: HTMLElement = document.getElementById(element.id);
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        (<HTMLInputElement>email).value
      )
    ) {
      email.classList.remove("error");
      return true;
    } else {
      email.classList.add("error");
      return false;
    }
  } else if (element.type === "text") {
    let inputVal: HTMLElement = document.getElementById(element.id);
    if (
      !(<HTMLInputElement>inputVal).value ||
      (<HTMLInputElement>inputVal).value.trim() === ""
    ) {
      inputVal.classList.add("error");
      return false;
    } else {
      inputVal.classList.remove("error");
      return true;
    }
  } else if (element.type === "number") {
    let number: HTMLElement = document.getElementById(element.id);
    if (!(<HTMLInputElement>number).value || isNaN((<any>number).value)) {
      number.classList.add("error");
      return false;
    } else {
      number.classList.remove("error");
      return true;
    }
  }
  return true;
};
