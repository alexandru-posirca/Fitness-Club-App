import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth, db } from "./main.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

const submitJoinBtn = document.getElementById("submit-join");
const cancelBtn = document.getElementById("bttn-cancel");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addons = document.querySelectorAll(".box");
const selectedPlan = document.querySelector(".plan-basic");
const totalValue = document.querySelector(".total-value");
const bttnsJoinInput = document.querySelectorAll(".bttn-join button");
const bttnsJoin = document.querySelectorAll(".bttn-join");
const nameMember = document.getElementById("member-name");
const emailMember = document.getElementById("member-email");
const phoneMember = document.getElementById("member-phone");
const statusMember = document.getElementById("member-status");
const payMember = document.getElementById("member-pay");
const dateMember = document.getElementById("member-date");
const planMember = document.getElementById("member-plan");
const addonsMember = document.getElementById("member-addons");
const dataAccount = document.getElementById("data-account");
const myAccount = document.getElementById("my-account");
const infoProfile = document.getElementById('info-profile');
const mustJoin = document.getElementById('must-join');

const member = {
  addons: ["No addons"],
  status_join: "Pending",
  plan: null,
  date_reg: null,
  time_reg: null,
  total_pay_$: null,
};

const updateDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const dateNow = `${day}-${month}-${year}`;
    const timeNow = `${hours}:${minutes}:${seconds}`;

    member.date_reg = dateNow;
    member.time_reg = timeNow;
  };

let allAddons = [];

submitJoinBtn
  ? submitJoinBtn.addEventListener("click", () => {
    allAddons = [];
      addons.forEach((addon) => {
        if (addon.classList.contains("ad-selected")) {
          const addonSelect = addon.querySelector("label").innerText;
          allAddons.push(addonSelect);
        }
      });

      const matchResult = totalValue.innerText.match(/\d+/);
      const valuePlan = matchResult ? matchResult[0] : "";

      infoProfile.classList.add('info-active');
      localStorage.setItem('info-active', true)

      mustJoin.classList.add('join-active');
      localStorage.setItem('join-active', true);

      localStorage.setItem('form-completed', 'true');

      mustJoin.style.display = "none";

      member.total_pay_$ = valuePlan;
      member.plan = selectedPlan.innerText;
      updateDateTime();
    })
  : false;

member.addons = allAddons;

onAuthStateChanged(auth, (user) => {
    if (user == null) {
      const checkAuth = () => {
        let dataInfoAttr = dataAccount.getAttribute("data-info");
        if (dataInfoAttr === "false") {
          alert("You must be LOGGED IN to access account info");
        }
      };
      dataAccount.addEventListener("click", checkAuth);
    }
  });

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
      const addonsToSend = allAddons.length > 0 ? allAddons : ["No addons"];

      const docRef = await addDoc(refCurrentUser, {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        plan: member.plan,
        addons: addonsToSend,
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

onAuthStateChanged(auth, (user) => {
    if (user != null) {
      const getAllDataOnce = async () => {
        let dataInfoAttr = myAccount.getAttribute("data-member");
        if (dataInfoAttr) {
          const refDoc = collection(db, `membersclub/${user.uid}/memberInfo`);
          const querySnapshot = await getDocs(
            query(refDoc, orderBy("time_reg", "desc"), limit(1))
          );
          let addedElements = [];
          let htmlContent = "";
          querySnapshot.forEach((doc) => {
            const member = doc.data();
            nameMember.innerHTML = member.name;
            emailMember.innerHTML = member.email;
            phoneMember.innerHTML = member.phone;
            statusMember.innerHTML = member.status_join;
            dateMember.innerHTML = member.date_reg;
            payMember.innerHTML = member.total_pay_$;
            planMember.innerHTML = member.plan;
            member.addons.forEach((elem) => {
              if (addedElements.indexOf(elem) === -1) {
                addedElements.push(elem);
                htmlContent += `<td>${elem}</td>`;
              }
              addonsMember.innerHTML = htmlContent;
            });
          });
        }
      };
      dataAccount.addEventListener("click", getAllDataOnce);
    }
  });

cancelBtn.addEventListener("click", () => {
  const confirmCancel = confirm("Are you sure you want to cancel your subscription?");
  if(confirmCancel) {
    localStorage.removeItem("status-join");
    localStorage.removeItem("info-active");
    localStorage.removeItem("join-active");
    localStorage.removeItem("form-completed");

    bttnsJoinInput.forEach(bttn => {
      bttn.disabled = false;
      bttn.innerHTML = "Join Club Now";
    });

    mustJoin.style.display = "flex";
    infoProfile.classList.remove('info-active');
    mustJoin.classList.remove('join-active');
  }
})

  window.addEventListener("load", () => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        const storedValue = localStorage.getItem("status-join");
        if (storedValue) {
          bttnsJoin.forEach(bttn => {
            bttn.setAttribute("status-join", storedValue);
            let statusJoin = bttn.getAttribute("status-join");
            if (statusJoin) {
              bttnsJoinInput.forEach(bttn => {
                bttn.disabled = true;
                bttn.innerHTML = "Joining pending";
              });
            }
          });
        }
        const infoActive = localStorage.getItem('info-active');
        infoActive && infoProfile.classList.add('info-active');

        const joinActive = localStorage.getItem('join-active');
        joinActive && mustJoin.classList.add('join-active');

        const formCompleted = localStorage.getItem('form-completed');
        formCompleted && (mustJoin.style.display = "none");
      }
    });
  });
