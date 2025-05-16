import { isoly } from "../../"

describe("isoly.Quarter.Numeric", () => {
	it.each([
		[2023, 0, 90],
		[2023, 1, 91],
		[2023, 2, 92],
		[2023, 3, 92],
		[2024, 0, 91], // leap year
	])("length for %i-Q%i is %i", (year, quarter, expected) =>
		expect(new isoly.Quarter.Numeric(year, quarter).length).toBe(expected)
	)
	it.each([
		[2023, 4, { years: 2024, quarters: 0 }],
		[2023, 5, { years: 2024, quarters: 1 }],
		[2023, -1, { years: 2022, quarters: 3 }],
	])("normalize %i-Q%i to %i-Q%i", (year, quarter, expected) =>
		expect(new isoly.Quarter.Numeric(year, quarter).normalize()).toEqual(expected)
	)
	it.each([
		// next: valid offsets only
		{ offset: 1, expected: "2023-Q2" },
		{ offset: 4, expected: "2024-Q1" },
	])("next(%i) from 2023-Q1", ({ offset, expected }) =>
		expect(new isoly.Quarter.Numeric(2023, 0).next(offset).format()).toBe(expected)
	)
	it.each([
		// previous: valid offsets only
		{ offset: 1, expected: "2022-Q4" },
		{ offset: 4, expected: "2022-Q1" },
	])("previous(%i) from 2023-Q1", ({ offset, expected }) =>
		expect(new isoly.Quarter.Numeric(2023, 0).previous(offset).format()).toBe(expected)
	)
	it("now", () => {
		const now = new Date()
		expect(isoly.Quarter.Numeric.now()).toEqual({ years: now.getFullYear(), quarters: Math.floor(now.getMonth() / 3) })
	})
})
