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
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const myAccount = document.getElementById("my-account");
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
const infoProfile = document.getElementById('info-profile');
const mustJoin = document.getElementById('must-join');

const member = {
  addons: "No addons",
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

      member.total_pay_$ = valuePlan;
      member.plan = selectedPlan.innerText;
      updateDateTime();
    })
  : false;

member.addons = allAddons;

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
