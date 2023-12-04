import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const openModalBtn = document.querySelectorAll("[data-modal-target]");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const modalJoinAuth = document.querySelector(".join-auth");

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