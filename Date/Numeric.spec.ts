import { isoly } from "../index"

describe("isoly.Date.Numeric", () => {
	it.each([{ years: 10, months: 1, days: 0 }])("is(%s)", value => expect(isoly.Date.Numeric.is(value)).toBe(true))
	it.each([
		["10-02-01", { years: 10, months: 1, days: 0 }],
		["2510-12-01", { years: 2510, months: 11, days: 0 }],
		["", {}],
		["--", {}],
		[undefined, {}],
	] as const)("parse(%s) == %s", (value, expected) => expect(isoly.Date.Numeric.parse(value)).toEqual(expected))
	it.each([
		[{ years: 10, months: 1, days: 0 }, "1910-02-01"],
		[{}, "1900-01-01"],
		[{ days: 36 }, "1900-02-06"],
	] as const)("format(%s) == %s", (value, expected) => expect(isoly.Date.Numeric.format(value)).toBe(expected))
})
