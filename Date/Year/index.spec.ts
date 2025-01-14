import { isoly } from "../../index"

describe("isoly.Date.Year", () => {
	it.each(["2023", "0000", "9999"])("is('%s') == true", input => expect(isoly.Date.Year.is(input)).toBe(true))
	it.each(["23", "abcd", "10000", ""])("is('%s') == false", input => expect(isoly.Date.Year.is(input)).toBe(false))
	it.each([
		[2023, "2023"],
		[0, "0000"],
		[9999, "9999"],
	])("create(%d) == %s", (input, expected) => expect(isoly.Date.Year.create(input)).toBe(expected))
	it.each([-1, 10000])("create(%d) == undefined", (input, expected) =>
		expect(isoly.Date.Year.create(input)).toBe(undefined)
	)
	it.each([2000, "2020", "2024"] as const)("isLeapYear('%s') == true", input =>
		expect(isoly.Date.Year.isLeapYear(input)).toBe(true)
	)
	it.each([1900, "1900", "2100"] as const)("isLeapYear('%s') == false", input =>
		expect(isoly.Date.Year.isLeapYear(input)).toBe(false)
	)
})
