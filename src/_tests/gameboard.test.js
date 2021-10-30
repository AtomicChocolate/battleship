import Gameboard from "../factory/gameboard";
import Ship from "../factory/ship";

describe("Creating a gameboard", () => {
	it("generates a gameboard", () => {
		expect(new Gameboard().board.length).toBe(100);
	});
});

describe("Gameboard functions", () => {
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
		expect(gameboard.board[99].hasShip).toBe(false);
	});
});
