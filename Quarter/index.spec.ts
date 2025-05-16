import { isoly } from "../"

describe("isoly.Quarter", () => {
	it.each([
		["2023-Q1", true],
		["2023-Q2", true],
		["2023-Q3", true],
		["2023-Q4", true],
		["2023-Q5", false],
		["2023-Q0", false],
		["202A-Q1", false],
		["", false],
	] as const)("is(%s) = %s", (value, expected) => expect(isoly.Quarter.is(value)).toBe(expected))
	it.each([
		["2023-Q1", { years: 2023, quarters: 0 }],
		["2023-Q2", { years: 2023, quarters: 1 }],
		["2023-Q3", { years: 2023, quarters: 2 }],
		["2023-Q4", { years: 2023, quarters: 3 }],
		["invalid", undefined],
	] as const)("parse(%s)", (value, expected) => expect(isoly.Quarter.parse(value)).toEqual(expected))
	it.each([
		[new Date("2023-01-10"), "2023-Q1"],
		[new Date("2023-04-10"), "2023-Q2"],
		[new Date("2023-07-10"), "2023-Q3"],
		[new Date("2023-10-10"), "2023-Q4"],
		[{ years: 2023, quarters: 0 }, "2023-Q1"],
	] as const)("from(%s) = %s", (value, expected) => expect(isoly.Quarter.from(value)).toBe(expected))
	it.each([
		["2023-Q1", 90],
		["2023-Q2", 91],
		["2023-Q3", 92],
		["2023-Q4", 92],
		["2024-Q1", 91], // leap year
	] as const)("length(%s) = %i", (quarter, expected) => expect(isoly.Quarter.length(quarter)).toBe(expected))
	it.each([
		["2023-Q1", 1, "2023-Q2"],
		["2023-Q4", 1, "2024-Q1"],
		["2023-Q1", 4, "2024-Q1"],
		["2023-Q1", -1, "2022-Q4"],
		["2023-Q1", -4, "2022-Q1"],
	] as const)("next(%s, %i) = %s", (quarter, offset, expected) =>
		expect(isoly.Quarter.next(quarter, offset)).toBe(expected)
	)
	it.each([
		["2023-Q2", 1, "2023-Q1"],
		["2023-Q1", 1, "2022-Q4"],
		["2023-Q1", 4, "2022-Q1"],
		["2023-Q1", -1, "2023-Q2"],
		["2023-Q1", -4, "2024-Q1"],
	] as const)("previous(%s, %i) = %s", (quarter, offset, expected) =>
		expect(isoly.Quarter.previous(quarter, offset)).toBe(expected)
	)
})
