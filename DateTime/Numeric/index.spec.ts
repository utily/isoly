import { isoly } from "../../index"

describe("isoly.DateTime.Numeric", () => {
	it.each([{ years: 10, months: 1, days: 0 }])("is(%s)", value =>
		expect(isoly.DateTime.Numeric.Value.is(value)).toBe(true)
	)
	// it.each([
	// 	["10-02-01", { years: 10, months: 1, days: 0 }],
	// 	["1-2-3T4:5:6.7", { years: 1, months: 1, days: 2, hours: 4, minutes: 5, seconds: 6, milliseconds: 700 }],
	// 	["T4:5:6.7", { hours: 4, minutes: 5, seconds: 6, milliseconds: 700 }],
	// ] as const)("parse(%s) == %s", (value, expected) =>
	// 	expect(isoly.DateTime.Numeric.parse(value).value).toEqual(expected)
	// )
	it.each([
		[{ years: 10, months: 1, days: 0 }, "0010-02-01T"],
		[{ years: 1, months: 1, days: 2, hours: 4, minutes: 5, seconds: 6, milliseconds: 700 }, "0001-02-03T04:05:06.700"],
		[{ hours: 4, minutes: 5, seconds: 6, milliseconds: 700 }, "0000-01-01T04:05:06.700"],
	] as const)("format(%s) == %s", (value, expected) =>
		expect(isoly.DateTime.Numeric.create(value).format()).toBe(expected)
	)
})
