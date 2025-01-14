import { isoly } from "../index"

describe("isoly.DateTime.Numeric", () => {
	it.each([{ year: 10, month: 2, day: 1 }])("is(%s)", value => expect(isoly.DateTime.Numeric.is(value)).toBe(true))
	it.each([
		["10-02-01", { year: 10, month: 2, day: 1 }],
		["1-2-3T4:5:6.7", { year: 1, month: 2, day: 3, hours: 4, minutes: 5, seconds: 6, milliseconds: 700 }],
		["T4:5:6.7", { hours: 4, minutes: 5, seconds: 6, milliseconds: 700 }],
	] as const)("parse(%s) == %s", (value, expected) => expect(isoly.DateTime.Numeric.parse(value)).toEqual(expected))
	it.each([
		[{ year: 10, month: 2, day: 1 }, "1910-02-01T00"],
		[{ year: 1, month: 2, day: 3, hours: 4, minutes: 5, seconds: 6, milliseconds: 700 }, "1901-02-03T04:05:06.700"],
		[{ hours: 4, minutes: 5, seconds: 6, milliseconds: 700 }, "1900-01-01T04:05:06.700"],
	] as const)("format(%s) == %s", (value, expected) => expect(isoly.DateTime.Numeric.format(value)).toBe(expected))
})
