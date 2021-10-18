import Ship from "../factory/ship";

describe("Creating a ship", () => {
	it("generates a ship with the given type name", () => {
		expect(Ship.newShipFromType("carrier", [3, 0], true).length).toBe(5);
	});
	it("generates a ship with custom values", () => {
		const carrier = Ship.newShipFromType("carrier", [3, 0], true);
		expect(new Ship("carrier", [3, 0], true, 5)).toEqual(carrier);
	});
});

describe("Ship functions", () => {
	let carrier;
	beforeEach(() => {
		carrier = Ship.newShipFromType("carrier", [3, 0], true);
	});
	it("can hit the ship", () => {
		carrier.hit(0);
		expect(carrier.hits[0]).toBe(true);
	});
	it("cannot hit the ship outside it's length", () => {
		carrier.hit(-1);
		expect(carrier.hits[-1]).toBe(undefined);
	});
	it("knows if the ship is not sunk", () => {
		expect(carrier.isSunk()).toBe(false);
	});
	it("knows if the ship is sunk", () => {
		for (let i = 0; i < carrier.length; i++) {
			carrier.hit(i);
		}
		expect(carrier.isSunk()).toBe(true);
	});
});
