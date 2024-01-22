import { Creep } from "./creep.js";

let currentGoldVar = 0;
let currentDMG = 1;
let goldMultiplier = 1;

//creepVars
let currentCreepMaxHP;
let currentCreepHP = currentCreepMaxHP;
// let currentCreepBounty;
// let currentCreepIMG;

let currentGoldDisplay = document.querySelector(".current__gold");
let clickObj = document.querySelector(".click__obj");
let clickAnimation = document.querySelector(".click__animation");
let displayCurrentCreepHP = document.querySelector(".currentCreepHP");
let loadNextCreepBTN = document.querySelector(".load__next__creep");
let creepImage = document.querySelector(".creep__image");

const creeps = [
  new Creep(
    0,
    "normalMelee",
    "default normal melee creep",
    0,
    "img/creeps/adiantNormalMelee.png",
    2,
    1
  ),
  new Creep(
    1,
    "normalRanged",
    "normal ranged creep",
    10,
    "img/creeps/radiantNormalRanged.png",
    4,
    5
  ),
  new Creep(
    2,
    "superMelee",
    "super melee creep",
    50,
    "img/creeps/radiantSuperRanged.png",
    10,
    10
  ),
];

let currentCreep = new Creep(
  creeps[0].creepID,
  creeps[0].name,
  creeps[0].description,
  creeps[0].cost,
  creeps[0].img,
  creeps[0].maxHP,
  creeps[0].bounty
);

function renderNextCreepCost() {
  // if (currentCreep.creepID < creeps.length - 1) {
  //   let nextCreepCost = creeps[currentCreep.creepID + 1].cost;
  //   loadNextCreepBTN.textContent = `NEXT CREEP COST: ${nextCreepCost}`;
  // } else {
  //   console.error("creep array limit reached");
  // }

  if (checkCreepArrayLimitReached() == false) {
    let nextCreepCost = creeps[currentCreep.creepID + 1].cost;
    loadNextCreepBTN.textContent = `NEXT CREEP COST: ${nextCreepCost}`;
  } else {
  }
}

function creepClick() {
  //Main gold gain formula
  currentCreepHP = currentCreepHP - currentDMG;

  if (currentCreepHP <= 0) {
    currentGoldVar = (currentGoldVar + currentCreep.bounty) * goldMultiplier;
    currentCreepHP = currentCreep.maxHP;
  }
  renderCurrentCreepHP();

  currentGoldDisplay.textContent = currentGoldVar;
  //   clickAnimation.classList.add("click_animation_play");
  clickAnimation.style.animation = "";
  clickAnimation.offsetWidth;
  clickAnimation.style.animation = "clickAnimation .2s forwards";
}

clickObj.addEventListener("click", () => {
  creepClick();
});

loadNextCreepBTN.addEventListener("click", () => {
  loadNextCreep();
});

function renderCurrentCreepHP() {
  displayCurrentCreepHP.textContent =
    "HP: " + currentCreepHP + " / " + currentCreep.maxHP;
}

function loadCreep() {
  currentCreepMaxHP = currentCreep.maxHP;
  currentCreepHP = currentCreep.maxHP;
  // currentCreepBounty = currentCreep.bounty;
  // currentCreepIMG = currentCreep.img;

  renderCurrentCreepHP();
  console.log("creep loaded");
  console.log(currentCreep);
  console.log(creeps);
}

function loadNextCreep() {
  if (checkCreepArrayLimitReached() == false) {
    console.log("currentGoldVar: " + currentGoldVar);
    console.log("next creep cost: " + creeps[currentCreep.creepID + 1].cost);

    if (currentGoldVar >= creeps[currentCreep.creepID + 1].cost) {
      currentGoldVar = currentGoldVar - creeps[currentCreep.creepID + 1].cost;
      currentGoldDisplay.textContent = currentGoldVar;

      currentCreep.creepID = creeps[currentCreep.creepID + 1].creepID;
      currentCreep.name = creeps[currentCreep.creepID].name;
      currentCreep.description = creeps[currentCreep.creepID].description;
      currentCreep.cost = creeps[currentCreep.creepID].cost;
      currentCreep.img = creeps[currentCreep.creepID].img;
      currentCreep.maxHP = creeps[currentCreep.creepID].maxHP;
      currentCreep.bounty = creeps[currentCreep.creepID].bounty;

      currentCreepHP = currentCreep.maxHP;
      creepImage.src = currentCreep.img;
      renderCurrentCreepHP();

      console.log("next creep loaded");
      console.log(currentCreep);
      renderNextCreepCost();
    } else {
      console.error("not enough gold");
    }
  } else {
    console.error("creep array limit reached");
  }
}

function checkCreepArrayLimitReached() {
  if (currentCreep.creepID < creeps.length - 1) {
    return false;
  } else {
    return true;
  }
}

loadCreep();
renderNextCreepCost();
renderCurrentCreepHP();
