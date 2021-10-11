import Ship from "../factory/ship";

describe("Creating a ship", () => {
	it("generates a ship with the given type name", () => {
		expect(Ship.newShipFromType("carrier", [3, 0], true).length).toEqual(5);
	});
});

describe("Ship functions", () => {
	let carrier;
	beforeEach(() => {
		carrier = Ship.newShipFromType("carrier", [3, 0], true);
	});
});
