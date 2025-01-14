import { isoly } from "../../index"

describe("isoly.Date.Month", () => {
	it.each([
		["01", true],
		["12", true],
		["13", false],
		["00", false],
	])("is(%s) == %s", (input, expected) => expect(isoly.Date.Month.is(input)).toBe(expected))
	it.each([
		[1, "01"],
		[12, "12"],
		[13, undefined],
		[0, undefined],
	])("creates(%d) == %s", (input, expected) => expect(isoly.Date.Month.create(input)).toBe(expected))
	it.each([
		["01", 31],
		["02", 29, "2020"], // Leap year
		["02", 28, "2021"],
		["04", 30],
	] as const)("length(%s) == %d (%s)", (month, expected, year?) =>
		expect(isoly.Date.Month.length(month, year)).toBe(expected)
	)
})
