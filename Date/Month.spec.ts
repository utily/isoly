import { isoly } from "../index"

describe("Month", () => {
	it.each([
		["01", true],
		["12", true],
		["13", false],
		["00", false],
	])("validates %s", (input, expected) => expect(isoly.Date.Month.is(input)).toBe(expected))
	it.each([
		[1, true],
		[12, true],
		[13, false],
		[0, false],
	])("validates %d", (input, expected) => expect(isoly.Date.Month.Numeric.is(input)).toBe(expected))
	it.each([
		["01", 31],
		["02", 29, "2020"], // Leap year
		["02", 28, "2021"],
		["04", 30],
	] as const)("returns length for %s", (month, expected, year?) =>
		expect(isoly.Date.Month.length(month, year)).toBe(expected)
	)
	it.each([
		["01", 1],
		["12", 12],
		["13", undefined],
		["00", undefined],
	])("parses %s", (input, expected) => expect(isoly.Date.Month.parse(input)).toBe(expected))
	it.each([
		[1, "01"],
		[12, "12"],
		[13, undefined],
		[0, undefined],
	])("creates from %d", (input, expected) => expect(isoly.Date.Month.create(input)).toBe(expected))
})
