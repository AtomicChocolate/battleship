import shipTypes from "../game-utilities/shipTypes";

class Ship {
	constructor(name, position, yAxis, length) {
		this.name = name;
		this.position = position;
		this.yAxis = yAxis;
		this.length = length;
		this.hits = [];
	}
	hit(index) {
		this.hits.push(index);
	}
	isSunk() {
		return this.hits >= this.length;
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
