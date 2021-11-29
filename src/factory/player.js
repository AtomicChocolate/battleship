import Ship from "./ship";
import Gameboard from "./gameboard";
import shipTypes from "../game-utilities/shipTypes";

class Player {
	constructor() {
		this.ships = [];
		this.gameboard = new Gameboard();

		//Add the starting ships to Ships array
		shipTypes.forEach((shipType) =>
			this.ships.push(Ship.newShipFromType(shipType.name, 0, true))
		);
	}
	attackPlayer(enemyPlayer, attackPosition) {
		return enemyPlayer.gameboard.recieveAttack(attackPosition);
	}
}

export default Player;
