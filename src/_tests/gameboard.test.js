import Gameboard from "../factory/gameboard";
import Ship from "../factory/ship";

describe("Creating a gameboard", () => {
	it("generates a gameboard", () => {
		expect(new Gameboard().board.length).toBe(100);
	});
});

describe("Getting coordinates", () => {
	let gameboard;
	let carrier;
	beforeEach(() => {
		gameboard = new Gameboard();
		carrier = Ship.newShipFromType("carrier", 3, false);
	});
	it("can get all the coordinates from a valid ship", () => {
		let carrier = Ship.newShipFromType("carrier", 3, false);
		expect(gameboard.getPlacementCoordinates(carrier)).toStrictEqual([
			3, 4, 5, 6, 7,
		]);
	});
	it("can get coordinates of a ship oriented across the y-axis", () => {
		carrier.yAxis = true;
		expect(gameboard.getPlacementCoordinates(carrier)).toStrictEqual([
			3, 13, 23, 33, 43,
		]);
	});
	it("doesn't get coordinates for an out-of-bounds ship", () => {
		carrier.position = -1;
		expect(gameboard.getPlacementCoordinates(carrier)).toBe(false);
	});
	it("doesn't get coordinates for a ship that overlaps with another ship", () => {
		gameboard.board[4].hasShip = true;
		expect(gameboard.getPlacementCoordinates(carrier)).toBe(false);
	});
});

describe("Placing a ship", () => {
	let gameboard;
	let carrier;
	beforeEach(() => {
		gameboard = new Gameboard();
		carrier = Ship.newShipFromType("carrier", 3, false);
	});
	it("can place a valid ship", () => {
		gameboard.addShip(carrier);
		expect(gameboard.board[3].hasShip).toBe(true);
	});
	it("doesn't place out-of-bounds ships", () => {
		carrier.position = -1;
		gameboard.addShip(carrier);
		expect(gameboard.board[3].hasShip).toBe(false);
	});
	it("doesn't place ships that overlap", () => {
		const submarine = Ship.newShipFromType("submarine", 4, false);
		gameboard.addShip(submarine);
		gameboard.addShip(carrier);
		expect(gameboard.board[9].hasShip).toBe(false);
	});
});

describe("Attacking", () => {
	let gameboard;
	let carrier;
	beforeEach(() => {
		gameboard = new Gameboard();
		carrier = Ship.newShipFromType("carrier", 3, false);
	});
	it("can attack a ship at a specified coordinate", () => {
		gameboard.addShip(carrier);
		expect(gameboard.recieveAttack(3)).toBe(true);
	});
	it("doesn't attack invalid locations", () => {
		gameboard.addShip(carrier);
		expect(gameboard.recieveAttack(1)).toBe(false);
	});
});

describe("All ships sunk check", () => {
	let gameboard;
	let patrolBoat;
	beforeEach(() => {
		gameboard = new Gameboard();
		patrolBoat = Ship.newShipFromType("patrol boat", 3, false);
		gameboard.addShip(patrolBoat);
	});
	it("knows when all the ships on the gameboard are fully sunk", () => {
		gameboard.recieveAttack(3);
		gameboard.recieveAttack(4);
		expect(gameboard.allShipsSunk()).toBe(true);
	});
	it("knows when not all the ships on the gameboard are fully sunk", () => {
		expect(gameboard.allShipsSunk()).toBe(false);
	});
});
