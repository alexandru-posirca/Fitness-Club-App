import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const openModalBtn = document.querySelectorAll("[data-modal-target]");
const closeModalBtn = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const formContent = document.querySelectorAll(".content-step");
const addons = document.querySelectorAll(".box");
const stps = document.querySelectorAll(".stp");
const stepSide = document.querySelectorAll(".step");
const addonsPlan = document.getElementById("addons");
const modalJoinAuth = document.querySelector(".join-auth");
const bttnOneDisable = document.getElementById("bttn-step-1");
const bttnTwoDisable = document.getElementById("bttn-step-2");
const planCard = document.querySelectorAll(".plan-card");

openModalBtn.forEach((button) => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      button.addEventListener("click", () => {
        const modalJoin = document.querySelector("#form");
        openModalJoin(modalJoin);
        if (modalJoin.classList.contains("active")) {
          popup.classList.remove("open-popup");
        }
        modalJoinAuth.style.display = "none";
      });
    } else {
      console.log("nelogat");
      button.addEventListener("click", () => {
        const modalJoin = document.querySelector(button.dataset.modalTarget);
        const modalJoinForm = document.getElementById("form");
        modalJoinAuth ? (modalJoinAuth.style.display = "block") : "none";
        modalJoinForm.classList.remove("active");
        openModalJoin(modalJoin);
      });
    }
  });
});

const openModalJoin = (modalJoin) => {
  if (modalJoin == null) return;
  modalJoin.classList.add("active");
  overlay.classList.add("active");
};

const closeModalJoin = (modalJoin) => {
  if (modalJoin == null) return;
  modalJoin.classList.remove("active");
  overlay.classList.remove("active");
};

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(
    ".modal-join-club.active, .form.active"
  );
  modals.forEach((modalJoin) => {
    closeModalJoin(modalJoin);
  });
});

closeModalBtn.forEach((button) => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        button.addEventListener("click", () => {
          bttnOneDisable.disabled = true;
          bttnOneDisable.classList.add("disable");
          bttnTwoDisable.disabled = true;
          bttnTwoDisable.classList.add("disable");
          const modalJoin = document.querySelector("#form");
          closeModalJoin(modalJoin);
          formContent.forEach((elem) => {
            const input = elem.querySelector("form input");
            const form = elem.querySelector("form");
            input !== null ? form.reset() : false;
            const cardOne = elem.querySelector(".card-one");
            const cardTwo = elem.querySelector(".card-two.selected");
            const cardThree = elem.querySelector(".card-three.selected");
            cardTwo
              ? cardTwo.classList.remove("selected") ||
                cardOne.classList.add("selected")
              : cardThree
              ? cardThree.classList.remove("selected") ||
                cardOne.classList.add("selected")
              : false;
          });
          stps.forEach((elem, index) =>
            index == 0
              ? (elem.style.display = "flex")
              : (elem.style.display = "none")
          );
          stepSide.forEach((elem, index) =>
            index > 0 ? elem.classList.remove("active") : false
          );
          addons.forEach((elem) => elem.classList.remove("ad-selected"));
          const selectedAddons =
            addonsPlan.getElementsByClassName("selected-addon");
          const elemAddons = [...selectedAddons];
          elemAddons.forEach((addon) => {
            addon.remove();
          });
          planCard.forEach((plan) => {
            if (plan.classList.contains("selected")) {
              plan.classList.remove("selected");
            }
          });
        });
      } else {
        console.log("logout succesfull");
        button.addEventListener("click", () => {
          const modalJoin = document.querySelector("#modal-join-club");
          closeModalJoin(modalJoin);
        });
      }
    });
  });