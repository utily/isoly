import { isoly } from "../index"

describe("isoly.Date.Day", () => {
	it.each(isoly.Date.Day.values)("is %s", day => expect(isoly.Date.Day.is(day)).toBe(true))
	it.each(["00", "32", "abc", "1", "001", "31a"])("is not", day => expect(isoly.Date.Day.is(day)).toBe(false))

	it.each(isoly.Date.Day.Numeric.values)("Numeric.is %d", day => expect(isoly.Date.Day.Numeric.is(day)).toBe(true))
	it.each([0, 32, -1, 100, 1.5])("Numeric.is not %d", day => expect(isoly.Date.Day.Numeric.is(day)).toBe(false))

	it.each([
		["01", 1],
		["15", 15],
		["31", 31],
	])("parse %s", (day, expected) => expect(isoly.Date.Day.parse(day)).toBe(expected))
	it.each([["00"], ["32"], ["abc"]])("parse invalid %s", d => expect(isoly.Date.Day.parse(d)).toBeUndefined())
	it.each([
		[1, "01"],
		[15, "15"],
		[31, "31"],
	])("create valid %d", (n, d) => expect(isoly.Date.Day.create(n)).toBe(d))
	it.each([[0], [32], [-1]])("create invalid %d", n => expect(isoly.Date.Day.create(n)).toBeUndefined())
})
