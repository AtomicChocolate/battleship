import Player from "../factory/player";

describe("Player creation + functions", () => {
	let player;
	let enemyPlayer;
	beforeEach(() => {
		player = new Player();
		enemyPlayer = new Player();
	});
	it("can create a player", () => {
		expect(player.ships.length).toBe(5);
	});
	it("can fire a shot to an enemy player's gameboard", () => {
		enemyPlayer.ships[1].position = 2;
		enemyPlayer.gameboard.addShip(enemyPlayer.ships[1]);
		expect(player.attackPlayer(enemyPlayer, 2)).toBe(true);
	});
});
