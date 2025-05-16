import { isoly } from "../index"

describe("isoly.Year", () => {
	it.each([
		["2023", true],
		["2024", true],
		["2025", true],
		["0000", true],
		["202", false],
		["20234", false],
		["abcd", false],
		["", false],
		[undefined, false],
	])("is(%s) == %s", (input: any, expected) => expect(isoly.Year.is(input)).toBe(expected))
	it.each([
		["2023", { years: 2023 }],
		["2024", { years: 2024 }],
		["0000", { years: 0 }],
		["invalid", undefined],
		[undefined, undefined],
	])("parse(%s)", (value, expected) => expect(isoly.Year.parse(value)?.value).toEqual(expected))
	it.each([
		[new Date(2023, 0, 1), "2023"],
		[2024, "2024"],
		[{ years: 2025 }, "2025"],
		["2026", "2026"],
		[undefined, undefined],
	] as const)("from(%p) == %s", (value, expected) => expect(isoly.Year.from(value)).toBe(expected))
	it.each([
		[2023, false],
		[2024, true], // divisible by 4
		[2100, false], // divisible by 100 but not 400
		[2000, true], // divisible by 400
		[1900, false], // divisible by 100 but not 400
	])("isLeapYear(%i) == %s", (year, expected) => expect(isoly.Year.isLeapYear(year)).toBe(expected))
	it.each([
		[2023, "weeks", 52],
		[2020, "weeks", 53],
		[2023, "days", 365],
		[2024, "days", 366], // leap year
	] as const)("length(%i, %s) == %i", (year, precision, expected) =>
		expect(isoly.Year.length(year, precision)).toBe(expected)
	)
})
