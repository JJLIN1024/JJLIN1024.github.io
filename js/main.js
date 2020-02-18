// // sticky navbar 
// const navbar = document.querySelector(".nav-bar");
// let preScroll = window.pageYOffset;
// window.onscroll = function() {
//   let curScroll = window.pageYOffset;
//   if (preScroll <= curScroll) {
//     navbar.classList.add("navbar-hide");
//   } else {
//     navbar.classList.remove("navbar-hide");
//   }
//   preScroll = curScroll;
// }

const topSection = document.querySelector('.top');
const navBtn = document.querySelector('.nav-btn');
navBtn.addEventListener('click', clickNavBtn);
function clickNavBtn() {
  if (navBtn.classList.contains('open')) {
    topSection.classList.remove('open');
    navBtn.classList.remove('open');
  } else {
    topSection.classList.add('open');
    navBtn.classList.add('open');
  }
}