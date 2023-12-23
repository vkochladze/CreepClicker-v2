let currentGoldVar = 0;

let currentGoldDisplay = document.querySelector(".current__gold");
let clickObj = document.querySelector(".click__obj");
let clickAnimation = document.querySelector(".click__animation");

clickObj.addEventListener("click", () => {
  currentGoldVar++;
  currentGoldDisplay.textContent = currentGoldVar;
  //   clickAnimation.classList.add("click_animation_play");
  clickAnimation.style.animation = "";
  clickAnimation.offsetWidth;
  clickAnimation.style.animation = "clickAnimation .2s forwards";
});
