import Gameboard from "../factory/gameboard";

describe("Creating a gameboard", () => {
	it("generates a gameboard", () => {
		expect(new Gameboard().board.length).toBe(100);
	});
});
