let Ship = function (length) {
  this.length = length;
  this.nHits = 0;
  this.sunk = false;
};

Ship.prototype.hit = function () {
  this.nHits += 1;
};

Ship.prototype.isSunk = function () {
  if (this.nHits >= this.length) {
    this.sunk = true;
  }
};

export { Ship };
