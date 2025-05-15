import { isoly } from "../../index"

describe("isoly.DateTime.Interval", () => {
	it.each([
		["2020-01-01T--2020-01-31T", true],
		["2020-01-01T--2020-02-31T", false],
		["2020-01-31T--2020-01-01T", false],
	])("is(%s) == %s", (value, expected) => expect(isoly.DateTime.Interval.is(value)).toBe(expected))
	it.each([
		[
			"2020-01-01T--2021-01-01T",
			{ start: { years: 2020, months: 0, days: 0 }, end: { years: 2021, months: 0, days: 0 } },
		],
	])("parse(%s) == %s", (value, expected) => expect(isoly.DateTime.Interval.parse(value)?.value).toEqual(expected))
	it.each([
		["2001-01-01T", { years: 1, months: 2, days: 3 }, "2001-01-01T--2002-03-04T"],
		["2001-01-01T", { years: -1, months: -1, days: -1 }, "2001-01-01T--1999-12-01T"],
		["2001-01-01T", { years: -1 }, "2001-01-01T--2000-01-01T"],
		["2001-01-01T", { years: -1, months: -1 }, "2001-01-01T--1999-12-01T"],
		["1999-11-30T", { years: 1, months: 1, days: 1 }, "1999-11-30T--2000-12-31T"],
		["2001-01-01T", { years: 1, months: 1, days: 1 }, "2001-01-01T--2002-02-02T"],
		["2000-12-31T", { years: -1, months: -1, days: -1 }, "2000-12-31T--1999-11-30T"],
	] as const)("from(%s, %o) == %s", (start, duration, expected) =>
		expect(isoly.DateTime.Interval.from(start, duration)).toEqual(expected)
	)
	it.each([
		["2022-04-30T--2022-05-20T", 20],
		["2022-04-30T--2022-04-30T", 0],
		["2022-05-20T--2022-04-30T", -20],
	] as const)('length(%s, "days") == %d', (value, expected) =>
		expect(isoly.DateTime.Interval.length(value, "days")).toEqual(expected)
	)
})
