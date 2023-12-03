import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const logoutBtn = document.getElementById("logout");
const popup = document.getElementById("popup");
const loggedIn = document.getElementById("logged-in");
const loggedOut = document.getElementById("logged-out");
const dataAccount = document.getElementById("data-account");
const myAccount = document.getElementById("my-account");
const cells = document.querySelectorAll(".table-data tbody tr td");
const bttnsJoin = document.querySelectorAll(".bttn-join");
const bttnsJoinInput = document.querySelectorAll(".bttn-join button");

const logoutWithGoogle = () => {
  if (confirm("Are you sure you want to log out?") == true) {
    auth
      .signOut()
      .then(() => {
        scroll(0, 0);
        popup.classList.add("open-popup");
        dataAccount.setAttribute("data-info", "false");
        myAccount.setAttribute("data-member", "false");
        cells.forEach((cell) => {
          cell.innerHTML = "";
        });
        bttnsJoin.forEach((bttn) => {
          bttn.setAttribute("status-join", "false");
          let statusJoin = bttn.getAttribute("status-join");
          if (statusJoin === "false") {
            bttnsJoinInput.forEach((bttn) => {
              bttn.disabled = false;
              bttn.innerHTML = "Join Club Now";
            });
          }
        });
        console.log("User logged out successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

logoutBtn.addEventListener("click", logoutWithGoogle);

onAuthStateChanged(auth, (user) => {
  user != null
    ? ((logoutBtn.style.display = "block"), (loggedIn.style.display = "block"))
    : ((logoutBtn.style.display = "none"),
      (loggedIn.style.display = "none"),
      (loggedOut.style.display = "block"));
});