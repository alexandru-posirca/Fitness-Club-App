const navToggle = document.querySelector("#navToggle");
const nav = document.querySelector(".nav-list");
const navIcon = document.querySelectorAll(".nav-icon");
const hamburger = document.querySelector("#hamburger");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  const navOpen = nav.classList.contains("open");
  document.body.style.overflow = navOpen ? "hidden" : "auto";
  navIcon.forEach((icon) => {
    icon.classList.toggle("close-nav");
  });
});

window.addEventListener("resize", () => {
  if (document.body.clientWidth > 768) {
    nav.classList.remove("open");
    navIcon.forEach((icon) => {
      icon.classList.add("close-nav");
    });
    hamburger.classList.remove("close-nav");
  }
});
