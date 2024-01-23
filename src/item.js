export class Item {
  itemID;
  name;
  description;
  cost;
  img;
  cps;
  numberOwned;

  constructor(itemID, name, description, cost, img, cps, numberOwned) {
    this.itemID = itemID;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.img = img;
    this.cps = cps;
    this.numberOwned = numberOwned;
  }
}
