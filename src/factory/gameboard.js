class Gameboard {
	constructor() {
		this.board = Array(10 * 10)
			.fill()
			.map((square) => ({ hasShip: false, isShot: false }));
	}

	getPlacementCoordinates(ship) {
		//Get "coordinates" for each ship segment based on it's main position
		let coordinates = [];
		for (let i = 0; i < ship.length; i++) {
			let nextCoordinate = ship.position;
			if (ship.yAxis === true) {
				nextCoordinate += 10 * i;
			} else {
				nextCoordinate += 1 * i;
			}

			//Check for illegal positions (out of bounds, or overlapping other ships)
			if (
				this.board[nextCoordinate] === undefined ||
				this.board[nextCoordinate].hasShip === true ||
				nextCoordinate > this.board.length ||
				(ship.yAxis === false && nextCoordinate % 10 === 0)
			) {
				return false;
			}
			coordinates.push(nextCoordinate);
		}
		return coordinates;
	}

	addShip(ship) {
		let placementCoordinates = this.getPlacementCoordinates(ship);
		if (placementCoordinates === false) return false; //Don't allow bad placements

		for (let i = 0; i < placementCoordinates.length; i++) {
			this.board[placementCoordinates[i]].hasShip = true;
		}
		return true;
	}
}

export default Gameboard;
