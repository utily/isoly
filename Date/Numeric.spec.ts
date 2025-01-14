import { isoly } from "../index"

describe("isoly.Date.Numeric", () => {
	it.each([{ year: 10, month: 2, day: 1 }])("is(%s)", value => expect(isoly.Date.Numeric.is(value)).toBe(true))
	it.each([
		["10-02-01", { year: 10, month: 2, day: 1 }],
		["2510-12-01", { year: 2510, month: 12, day: 1 }],
		["", {}],
		[undefined, {}],
	] as const)("parse(%s) == %s", (value, expected) => expect(isoly.Date.Numeric.parse(value)).toEqual(expected))
	it.each([
		[{ year: 10, month: 2, day: 1 }, "1910-02-01"],
		[{}, "1900-01-01"],
		[{ day: 37 }, "1900-02-06"],
	] as const)("format(%s) == %s", (value, expected) => expect(isoly.Date.Numeric.format(value)).toBe(expected))
})
