class Gameboard {
	constructor() {
		this.board = Array(10 * 10).fill({ hasShip: false, isShot: false });
	}
}

export default Gameboard;
