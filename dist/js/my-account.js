import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const openModalBtn = document.querySelectorAll("[data-modal-account]");
const overlay = document.getElementById("overlay");
const closeModalBtn = document.querySelectorAll("[data-close-button]");
const myAccount = document.getElementById("my-account");

openModalBtn.forEach((button) => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      myAccount.setAttribute("data-member", "true");
      let dataInfoAttr = myAccount.getAttribute("data-member");
      if (dataInfoAttr === "true") {
        button.addEventListener("click", () => {
          const modalJoin = document.querySelector("#my-account");
          openModalJoin(modalJoin);
        });
      }
    } else {
      console.log("nelogat");
      //logic for logout
    }
  });
});

const openModalJoin = (modalJoin) => {
  if (modalJoin == null) return;
  let dataInfoAttr = myAccount.getAttribute("data-member");
  if (dataInfoAttr === "true") {
    modalJoin.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add('active-modal');
  }
};

const closeModalJoin = (modalJoin) => {
  if (modalJoin == null) return;
  modalJoin.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove('active-modal');
};

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".my-account.active");
  modals.forEach((modalJoin) => {
    closeModalJoin(modalJoin);
  });
});

closeModalBtn.forEach((button) => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      button.addEventListener("click", () => {
        console.log("merge close");
        const modalJoin = document.querySelector("#my-account");
        closeModalJoin(modalJoin);
      });
    } else {
      console.log("logout succesfull");
      button.addEventListener("click", () => {
        const modalJoin = document.querySelector("#modal-join-account");
        closeModalJoin(modalJoin);
      });
    }
  });
});