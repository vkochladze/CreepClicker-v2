let currentGoldVar = 0;
let currentCreepMaxHP = 2;
let currentCreepHP = currentCreepMaxHP;
let currentCreepBounty = 1;
let currentDMG = 1;
let goldMultiplier = 1;

let currentGoldDisplay = document.querySelector(".current__gold");
let clickObj = document.querySelector(".click__obj");
let clickAnimation = document.querySelector(".click__animation");
let displayCurrentCreepHP = document.querySelector(".currentCreepHP");

displayCurrentCreepHP.textContent =
  "HP: " + currentCreepHP + " / " + currentCreepMaxHP;

function creepClick() {
  //Main gold gain formula
  currentCreepHP = currentCreepHP - currentDMG;

  if (currentCreepHP <= 0) {
    currentGoldVar = (currentGoldVar + currentCreepBounty) * goldMultiplier;
    currentCreepHP = currentCreepMaxHP;
  }
  displayCurrentCreepHP.textContent =
    "HP: " + currentCreepHP + " / " + currentCreepMaxHP;

  currentGoldDisplay.textContent = currentGoldVar;
  //   clickAnimation.classList.add("click_animation_play");
  clickAnimation.style.animation = "";
  clickAnimation.offsetWidth;
  clickAnimation.style.animation = "clickAnimation .2s forwards";
}

clickObj.addEventListener("click", () => {
  creepClick();
});

// creep object template
/* creep {
  ID: X // this is the creep's unique identifier
  maxHP: X; // this is the base number of hits (i.e., without modifiers) it takes to kill the creep 
  bounty: X; //this is the base amount of gold (i.e., without modifiers) killing the creep grants 
}
 */

// shop item types
/* 

1. Creep - has higher HP than the previous tier creep, but also grants more gold (more gold per click, i.e., first tier creep has 2HP and grants 1 gold (0.5 gold/click), secodn tier creep has 4HP and grants 4 gold (1 gold/click))
2. Weapon - increases base 'currentDMG'
3. {itemTypeName} - adds auto DPS (damages the creep every X seconds for Y damage)
*/
