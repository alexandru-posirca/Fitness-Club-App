import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const steps = document.querySelectorAll(".stp");
const circleSteps = document.querySelectorAll(".step");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const valuesInputs = document.querySelectorAll("#name, #email, #phone");
const bttnDisable = document.getElementById("bttn-step-1");
const bttnTwoDisable = document.getElementById("bttn-step-2");
const plans = document.querySelectorAll(".plan-card");
const planPrice = document.querySelector(".plan-price");
const total = document.querySelector(".total b");
const switcher = document.querySelector(".switch");
const addons = document.querySelectorAll(".box");
const closeModalBtn = document.querySelectorAll("[data-close-button]");

let time;
let currentStep = 1;
let currentCircle = 0;
const obj = {
  plan: null,
  kind: null,
  price: null,
};

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
    summary(obj);
  });
});

closeModalBtn.forEach((button) => { 
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      button.addEventListener("click", () => {
        currentStep = 1;
        currentCircle = 0;
      });
    }
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

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    const planName = plan.querySelector("b");
    const planPrice = plan.querySelector(".plan-priced");
    obj.plan = planName;
    obj.price = planPrice;
    handleClick(plan);
  });
});

const summary = (obj) => {
  const planName = document.querySelector(".plan-name");
  const planPrice = document.querySelector(".plan-price");
  console.log(planName.innerHTML);
  console.log(planPrice.innerHTML);
  if (obj.plan !== null) {
    planName.innerHTML = `${obj.plan.innerText} (${
      obj.kind ? "yearly" : "monthly"
    })`;
  }
  if (obj.price !== null) {
    planPrice.innerHTML = `${obj.price.innerText}`;
  }
};

const handleClick = (elemClicked) => {
  plans.forEach((plan) => {
    if (plan === elemClicked) {
      plan.classList.add("selected");
    } else {
      plan.classList.remove("selected");
    }
  });
  bttnTwoDisable.disabled = false;
  bttnTwoDisable.classList.remove("disable");
};

switcher.addEventListener("click", () => {
  const val = switcher.querySelector("input").checked;
  if (val) {
    console.log(val);
    document.querySelector(".monthly").classList.remove("sw-active");
    document.querySelector(".yearly").classList.add("sw-active");
  } else {
    document.querySelector(".monthly").classList.add("sw-active");
    document.querySelector(".yearly").classList.remove("sw-active");
  }
  switchPrice(val);
  obj.kind = val;
});

const switchPrice = (checked) => {
  const yearlyPrice = [90, 120, 150];
  const monthlyPrice = [9, 12, 15];
  const prices = document.querySelectorAll(".plan-priced");

  if (checked) {
    prices[0].innerHTML =
      `<span>$${yearlyPrice[0]}</span>` +
      `<span class="plan-per"> - Yearly </span>`;
    prices[1].innerHTML =
      `<span>$${yearlyPrice[1]}</span>` +
      `<span class="plan-per"> - Yearly </span>`;
    prices[2].innerHTML =
      `<span>$${yearlyPrice[2]}</span>` +
      `<span class="plan-per"> - Yearly </span>`;
    setTime(true);
  } else {
    prices[0].innerHTML =
      `<span>$${monthlyPrice[0]}</span>` +
      `<span class="plan-per"> - Monthly </span>`;
    prices[1].innerHTML =
      `<span>$${monthlyPrice[1]}</span>` +
      `<span class="plan-per"> - Monthly </span>`;
    prices[2].innerHTML =
      `<span>$${monthlyPrice[2]}</span>` +
      `<span class="plan-per"> - Monthly </span>`;
    setTime(false);
  }
};

closeModalBtn.forEach((button) => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      button.addEventListener("click", () => {
        document.querySelector(".monthly").classList.add("sw-active");
        document.querySelector(".yearly").classList.remove("sw-active");

        const checkbox = document.querySelector(
          ".switch input[type='checkbox']"
        );
        checkbox.checked = false;

        const monthlyPrice = [9, 12, 15];
        const prices = document.querySelectorAll(".plan-priced");
        prices[0].innerHTML =
          `<span>$${monthlyPrice[0]}</span>` +
          `<span class="plan-per"> - Monthly </span>`;
        prices[1].innerHTML =
          `<span>$${monthlyPrice[1]}</span>` +
          `<span class="plan-per"> - Monthly </span>`;
        prices[2].innerHTML =
          `<span>$${monthlyPrice[2]}</span>` +
          `<span class="plan-per"> - Monthly </span>`;
        obj.kind = false;
        setTime(false);
      });
    }
  });
});

addons.forEach((addon) => {
  addon.addEventListener("click", (e) => {
    const addonSelect = addon.querySelector("input");
    const ID = addon.getAttribute("data-id");
    if (addonSelect.checked) {
      addonSelect.checked = false;
      addon.classList.remove("ad-selected");
      showAddon(ID, false);
    } else {
      addonSelect.checked = true;
      addon.classList.add("ad-selected");
      showAddon(addon, true);
      e.preventDefault();
    }
  });
});

const showAddon = (ad, val) => {
  const temp = document.getElementsByTagName("template")[0];
  const clone = temp.content.cloneNode(true);
  const serviceName = clone.querySelector(".service-name");
  const servicePrice = clone.querySelector(".service-price");
  const serviceID = clone.querySelector(".selected-addon");
  if (ad && val) {
    serviceName.innerText = ad.querySelector("label").innerText;
    servicePrice.innerText = ad.querySelector(".price").innerText;
    serviceID.setAttribute("data-id", ad.dataset.id);
    document.querySelector(".addons").appendChild(clone);
  } else {
    const addons = document.querySelectorAll(".selected-addon");
    addons.forEach((addon) => {
      const attr = addon.getAttribute("data-id");
      if (attr == ad) {
        addon.remove();
      }
    });
  }
};

const setTotal = () => {
  let val = 0;
  const str = planPrice.innerHTML;
  const res = str.replace(/\D/g, "");
  const addonPrices = document.querySelectorAll(
    ".selected-addon .service-price"
  );
  for (let i = 0; i < addonPrices.length; i++) {
    const str = addonPrices[i].innerHTML;
    const res = str.replace(/\D/g, "");
    val += Number(res);
  }
  total.innerHTML = `$${val + Number(res)}/${time ? "yr" : "mo"}`;
};

const setTime = (t) => {
  return (time = t);
};