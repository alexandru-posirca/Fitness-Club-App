const steps = document.querySelectorAll(".stp");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const valuesInputs = document.querySelectorAll("#name, #email, #phone");
const bttnDisable = document.getElementById("bttn-step-1");

let currentStep = 1;
let currentCircle = 0;

steps.forEach((step) => {
    const nextBtn = step.querySelector(".next-stp");
    const prevBtn = step.querySelector(".prev-stp");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        document.querySelector(`.step-${currentStep}`).style.display = "none";
        currentStep--;
        console.log(currentStep + " step steps");
        document.querySelector(`.step-${currentStep}`).style.display = "flex";
        circleSteps[currentCircle].classList.remove("active");
        currentCircle--;
        console.log(currentCircle + " circle steps");
      });
    }
    nextBtn.addEventListener("click", () => {
      document.querySelector(`.step-${currentStep}`).style.display = "none";
      if (currentStep < 5) {
        currentStep++;
        console.log(currentStep + " step");
        currentCircle++;
        console.log(currentCircle + " circle");
        setTotal();
      }
      document.querySelector(`.step-${currentStep}`).style.display = "flex";
  
      circleSteps[currentCircle].classList.add("active");
      const stepOne = document.getElementById("step-1");
      stepOne.style.display = "none";
    });
  });

const validateForm = () => {
  valuesInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
      const valueInput = input.value;
      if (input == emailField) {
        if (
          !valueInput.match(
            /^[A-Za-z\._\-0-9]{1,36}[@][A-Za-z]{1,36}[\.][a-z]{2,4}$/
          )
        ) {
          emailError.style.display = "block";
          if (valueInput == null || valueInput == "") {
            emailError.style.display = "none";
            return false;
          }
          return false;
        }
        emailError.style.display = "none";
      } else if (input == nameField) {
        if (
          !valueInput.match(
            /^(?=.{1,47}$)[A-Z\u0100-\u0218a-z\u0103-\u0219]+(?: [A-Z\u0100-\u0218a-z\u0103-\u0219]+)+$/
          ) ||
          valueInput.match(/^\s*$/)
        ) {
          nameError.style.display = "block";
          if (valueInput == null || valueInput == "") {
            nameError.style.display = "none";
            return false;
          }
          return false;
        }
        nameError.style.display = "none";
      } else if (input == phoneField) {
        if (
          !valueInput.match(
            /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/
          )
        ) {
          phoneError.style.display = "block";
          if (valueInput == null || valueInput == "") {
            phoneError.style.display = "none";
            return false;
          }
          return false;
        }
        phoneError.style.display = "none";
      }
      return true;
    });
  });
};

validateForm();


const checkDisable = () => {
  valuesInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
      const value = input.value;
      if (
        value === "" ||
        phoneError.style.display == "block" ||
        nameError.style.display == "block" ||
        emailError.style.display == "block"
      ) {
        bttnDisable.disabled = true;
        bttnDisable.classList.add("disable");
      } else {
        bttnDisable.disabled = false;
        bttnDisable.classList.remove("disable");
      }
    });
  });
};

checkDisable();