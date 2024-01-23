export class Weapon {
  weaponID;
  name;
  description;
  cost;
  img;
  damage;
  numberOwned;

  constructor(weaponID, name, description, cost, img, damage, numberOwned) {
    this.weaponID = weaponID;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.img = img;
    this.damage = damage;
    this.numberOwned = numberOwned;
  }
}
