import shipTypes from "../game-utilities/shipTypes";

class Ship {
	constructor(name, position, yAxis, length) {
		this.name = name;
		this.position = position;
		this.yAxis = yAxis;
		this.length = length;
		this.hits = Array(length).fill(false);
	}
	hit(index) {
		//Might wanna remove?
		const alreadyHit = this.hits[index];
		if (alreadyHit !== false) return; //Do not add a hit outside of the ship length, or if it's already hit

		this.hits[index] = true;
	}
	isSunk() {
		return this.hits.every((v) => v === true);
	}

	static newShipFromType(name, position, yAxis) {
		const chosenShipType = shipTypes.find((shipType) => shipType.name === name);
		return new Ship(
			chosenShipType.name,
			position,
			yAxis,
			chosenShipType.length
		);
	}
}

export default Ship;
