import { isoly } from "../../index"

describe("isoly.Date.Day.Numeric", () => {
	it.each(isoly.Date.Day.Numeric.values)("is %d", day => expect(isoly.Date.Day.Numeric.is(day)).toBe(true))
	it.each([0, 32, -1, 100, 1.5])("is not %d", day => expect(isoly.Date.Day.Numeric.is(day)).toBe(false))
	it.each([
		["01", 1],
		["15", 15],
		["31", 31],
	])("parse(%s) == %d", (day, expected) => expect(isoly.Date.Day.Numeric.parse(day)).toBe(expected))
	it.each(["00", "32", "abc"])("parse(%s) == undefined", d => expect(isoly.Date.Day.Numeric.parse(d)).toBeUndefined())
})
