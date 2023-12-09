import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth, db } from "./main.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

const submitJoinBtn = document.getElementById("submit-join");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const myAccount = document.getElementById("my-account");
const bttnsJoinInput = document.querySelectorAll(".bttn-join button");
const bttnsJoin = document.querySelectorAll(".bttn-join");

const member = {
  addons: "No addons",
  status_join: "Pending",
  plan: null,
  date_reg: null,
  time_reg: null,
  total_pay_$: null,
};

onAuthStateChanged(auth, (user) => {
  const submitJoin = async () => {
    let refCurrentUser = collection(db, `membersclub/${user.uid}/memberInfo`);
    let dataInfoAttr = myAccount.getAttribute("data-member");
    bttnsJoin.forEach((bttn) => {
      bttn.setAttribute("status-join", "true");
      localStorage.setItem("status-join", "true");
      let statusJoin = bttn.getAttribute("status-join");
      if (statusJoin) {
        bttnsJoinInput.forEach((bttn) => {
          bttn.disabled = true;
          bttn.innerHTML = "Joining pending";
        });
      }
    });

    if (dataInfoAttr) {
      const docRef = await addDoc(refCurrentUser, {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        plan: member.plan,
        addons: member.addons,
        status_join: member.status_join,
        date_reg: member.date_reg,
        time_reg: member.time_reg,
        total_pay_$: member.total_pay_$,
      })
        .then(() => {
          //logic for successfully
        })
        .catch((error) => {
          alert("Don't join." + error);
        });
    }
  };

  setTimeout(() => {
    submitJoinBtn.onclick = submitJoin;
  }, 1000);
});
