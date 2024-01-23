export class Creep {
  creepID;
  name;
  description;
  cost;
  img;
  maxHP;
  bounty;

  constructor(creepID, name, description, cost, img, maxHP, bounty) {
    this.creepID = creepID;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.img = img;
    this.maxHP = maxHP;
    this.bounty = bounty;
  }
}
