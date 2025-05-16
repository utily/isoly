import { isoly } from "../../isoly"

describe("HalfYear", () => {
	it.each([
		["2023-H1", true],
		["2023-H2", true],
		["2023-H3", false],
		["2023-H0", false],
		["202A-H1", false],
		["", false],
	])("is(%s) = %s", (value, expected) => expect(isoly.HalfYear.is(value)).toBe(expected))
	it.each([
		["2023-H1", { years: 2023, halfYears: 0 }],
		["2023-H2", { years: 2023, halfYears: 1 }],
		["invalid", undefined],
	])("parse(%s)", (value, expected) => {
		expect(isoly.HalfYear.parse(value)).toEqual(expected)
	})
	it.each([
		[new Date("2023-01-10"), "2023-H1"],
		[new Date("2023-07-10"), "2023-H2"],
		[{ years: 2023, halfYears: 0 }, "2023-H1"],
		[{ years: 2023, halfYears: 1 }, "2023-H2"],
		[undefined, undefined],
	])("from(%s) == %s", (value, expected) => expect(isoly.HalfYear.from(value)).toBe(expected))
})
