import { Creep } from "./creep.js";
import { Weapon } from "./weapon.js";
import { Item } from "./item.js";

let currentGoldVar = 0;
let currentDMG = 1;
let goldMultiplier = 1;
let currentCPS = 0;

//creepVars
let currentCreepMaxHP;
let currentCreepHP = currentCreepMaxHP;

let clickObj = document.querySelector(".click__obj");
let clickAnimation = document.querySelector(".click__animation");
let displayCurrentCreepHP = document.querySelector(".currentCreepHP");
let loadNextCreepBTN = document.querySelector(".load__next__creep");
let creepImage = document.querySelector(".creep__image");
let buyWeaponBTN = document.querySelectorAll(".buy__weapon");
let buyItemBTN = document.querySelectorAll(".buy__item");
let popup__continue__button = document.querySelector(".popup__continue__buton");
let how_to_play_button = document.querySelector(".how__to__play__btn");
let info_wrapper = document.querySelector(".info__wrapper");

//display vars
let currentGoldDisplay = document.querySelector(".current__gold");
let currentCreepBountyDisplay = document.querySelector(
  ".current_creep__bounty"
);
let currentCPSDisplay = document.querySelector(".clicks__per__second");
let currentDMGDisplay = document.querySelector(".current__damage");
let weaponsOwned = document.querySelectorAll(".weapon__owned");
let itemsOwned = document.querySelectorAll(".item__owned");

const creeps = [
  new Creep(
    0,
    "normalMelee",
    "default normal melee creep",
    0,
    "img/creeps/adiantNormalMelee.png",
    2,
    2
  ),
  new Creep(
    1,
    "normalRanged",
    "normal ranged creep",
    10,
    "img/creeps/radiantNormalRanged.png",
    4,
    10
  ),
  new Creep(
    2,
    "superMelee",
    "super melee creep",
    50,
    "img/creeps/radiantMegaMelee.png",
    10,
    20
  ),
  new Creep(
    3,
    "superRanged",
    "mega ranged creep",
    500,
    "img/creeps/radiantSuperRanged.png",
    50,
    50
  ),
  new Creep(
    4,
    "iceQueen",
    "ice Queen creep",
    5000,
    "img/creeps/iceQueen.png",
    100,
    100
  ),
  new Creep(
    5,
    "Troll",
    "troll creep",
    50000,
    "img/creeps/trollCreep.png",
    1000,
    1000
  ),
];

const weapons = [
  new Weapon(0, "Quellingblade", "firstWeaponDesc", 10, "imgURLHere", 1, 0),
  new Weapon(1, "Javelin", "secondWeaponDesc", 20, "imgURLHere", 4, 0),
  new Weapon(2, "Broadsword", "thirdWeaponDesc", 30, "imgURLHere", 8, 0),
];

const items = [
  new Item(0, "Quarterstaff", "firstItemDesc", 10, "imgURLHere", 1, 0),
  new Item(1, "Oblivion Staff", "secondItemDesc", 20, "imgURLHere", 2, 0),
  new Item(2, "Orchid Malevolence", "thirdItemDesc", 30, "imgURLHere", 3, 0),
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

let nextCreepCost = creeps[currentCreep.creepID + 1].cost;

function renderNextCreepCost() {
  if (checkCreepArrayLimitReached() == false) {
    let nextCreepCost = creeps[currentCreep.creepID + 1].cost;
    loadNextCreepBTN.textContent = `NEXT CREEP COST: ${nextCreepCost}`;
  } else {
  }
}

function creepClick() {
  //Main gold gain formula
  currentCreepHP -= currentDMG;

  if (currentCreepHP <= 0) {
    currentGoldVar = (currentGoldVar + currentCreep.bounty) * goldMultiplier;
    currentCreepHP = currentCreep.maxHP;
  }
  renderCurrentCreepHP();

  renderCurrentGold();
  //   clickAnimation.classList.add("click_animation_play");
  clickAnimation.style.animation = "";
  clickAnimation.offsetWidth;
  clickAnimation.style.animation = "clickAnimation .2s forwards";
  checkNextCreepBTNGold();
}

function creepClickCPS() {
  if (currentCPS > 0) {
    currentCreepHP -= currentCPS;

    if (currentCreepHP <= 0) {
      currentGoldVar = (currentGoldVar + currentCreep.bounty) * goldMultiplier;
      currentCreepHP = currentCreep.maxHP;
    }

    renderCurrentCreepHP();
    renderCurrentGold();
    //   clickAnimation.classList.add("click_animation_play");
    clickAnimation.style.animation = "";
    clickAnimation.offsetWidth;
    clickAnimation.style.animation = "clickAnimation .2s forwards";
    checkNextCreepBTNGold();

    console.log("clicked for: " + currentCPS + " damage");
  }
}

clickObj.addEventListener("click", () => {
  creepClick();
});

loadNextCreepBTN.addEventListener("click", () => {
  loadNextCreep();
  checkNextCreepBTNGold();
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
  // console.log("creep loaded");
  // console.log(currentCreep);
  // console.log(creeps);
}

function loadNextCreep() {
  if (checkCreepArrayLimitReached() == false) {
    console.log("currentGoldVar: " + currentGoldVar);
    console.log("next creep cost: " + creeps[currentCreep.creepID + 1].cost);

    if (currentGoldVar >= creeps[currentCreep.creepID + 1].cost) {
      currentGoldVar = currentGoldVar - creeps[currentCreep.creepID + 1].cost;
      currentGoldDisplay.textContent = "Gold: " + currentGoldVar;

      currentCreep.creepID = creeps[currentCreep.creepID + 1].creepID;
      currentCreep.name = creeps[currentCreep.creepID].name;
      currentCreep.description = creeps[currentCreep.creepID].description;
      currentCreep.cost = creeps[currentCreep.creepID].cost;
      currentCreep.img = creeps[currentCreep.creepID].img;
      currentCreep.maxHP = creeps[currentCreep.creepID].maxHP;
      currentCreep.bounty = creeps[currentCreep.creepID].bounty;

      currentCreepHP = currentCreep.maxHP;
      creepImage.src = currentCreep.img;
      renderCurrentGold();
      renderCurrentCreepHP();
      renderCurrentCreepBounty();

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

function checkNextCreepBTNGold() {
  if (checkCreepArrayLimitReached() == false) {
    let nextCreepCost = creeps[currentCreep.creepID + 1].cost;

    if (currentGoldVar >= nextCreepCost) {
      loadNextCreepBTN.classList.remove("bg-gray-400");
      loadNextCreepBTN.classList.add("bg-red-400");
      loadNextCreepBTN.classList.add("hover:bg-red-500");
      loadNextCreepBTN.classList.add("active:bg-red-600");
    } else {
      loadNextCreepBTN.classList.remove("bg-red-400");
      loadNextCreepBTN.classList.remove("hover:bg-red-500");
      loadNextCreepBTN.classList.remove("active:bg-red-600");
      loadNextCreepBTN.classList.add("bg-gray-400");
    }
  } else {
    loadNextCreepBTN.classList.remove("bg-red-400");
    loadNextCreepBTN.classList.remove("hover:bg-red-500");
    loadNextCreepBTN.classList.remove("active:bg-red-600");
    loadNextCreepBTN.classList.add("bg-gray-400");
  }
}

function renderCurrentGold() {
  currentGoldDisplay.textContent = "Gold: " + currentGoldVar;
}

function renderCurrentCreepBounty() {
  currentCreepBountyDisplay.textContent =
    "Creep bounty: " + currentCreep.bounty;
}

function renderCurrentCPS() {
  currentCPSDisplay.textContent = "Damage per second (DPS): " + currentCPS;
}

function renderCurrentDMG() {
  currentDMGDisplay.textContent = "Damage: " + currentDMG;
}

function buyWeapon(buttonValue) {
  for (let i = 0; i <= weapons.length; i++) {
    if (weapons[i].weaponID == buttonValue) {
      if (currentGoldVar >= weapons[i].cost) {
        currentGoldVar = currentGoldVar - weapons[i].cost;
        currentDMG += weapons[i].damage;

        weapons[i].numberOwned++;

        renderCurrentGold();
        renderCurrentDMG();

        console.log("bought " + weapons[i].name);
        return weapons[i];
      } else {
        console.error("not enough gold to buy " + weapons[i].name);
        return weapons[i];
      }
    }
  }
}

function buyItem(buttonValue) {
  for (let i = 0; i <= items.length; i++) {
    if (items[i].itemID == buttonValue) {
      if (currentGoldVar >= items[i].cost) {
        currentGoldVar = currentGoldVar - items[i].cost;
        currentCPS += items[i].cps;

        renderCurrentGold();
        renderCurrentCPS();

        items[i].numberOwned++;
        itemsOwned[i].textContent = items[i].numberOwned;

        console.log("bought " + items[i].name);
        return items[i];
      } else {
        console.error("not enough gold to buy " + items[i].name);
        return items[i];
      }
    }
  }
}

for (let i = 0; i < buyWeaponBTN.length; i++) {
  buyWeaponBTN[i].addEventListener("click", () => {
    let buttonValue = buyWeaponBTN[i].value;

    weaponsOwned[i].textContent = weapons[i].numberOwned;

    console.log(buttonValue);
    buyWeapon(buttonValue);
  });
}

for (let i = 0; i < buyItemBTN.length; i++) {
  buyItemBTN[i].addEventListener("click", () => {
    let buttonValue = buyItemBTN[i].value;

    console.log(buttonValue);
    buyItem(buttonValue);
  });
}

function displayPopup() {
  document.querySelector(".popup__darkener").style.display = "block";
  document.querySelector(".popup").style.display = "block";
  how_to_play_button.style.display = "none";
  info_wrapper.style.display = "none";
}

window.addEventListener("load", () => {
  displayPopup();
});

popup__continue__button.addEventListener("click", () => {
  document.querySelector(".popup__darkener").style.display = "none";
  document.querySelector(".popup").style.display = "none";
  how_to_play_button.style.display = "block";
  info_wrapper.style.display = "block";
});

how_to_play_button.addEventListener("click", () => {
  displayPopup();
});

loadCreep();
renderNextCreepCost();
renderCurrentCreepHP();
renderCurrentCPS();
renderCurrentDMG();
renderCurrentCreepBounty();
setInterval(() => {
  creepClickCPS();
}, 500);
