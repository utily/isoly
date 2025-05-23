import { isoly } from "../../index"

describe("isoly.Date.Interval", () => {
	it.each([
		["2020-01-01--2020-01-31", true],
		["2020-01-01--2020-02-31", false],
		["2020-01-31--2020-01-01", false],
	])("is(%s) == %s", (value, expected) => expect(isoly.Date.Interval.is(value)).toBe(expected))
	it.each([
		[
			"2020-01-01--2021-01-01",
			{ start: { years: 2020, months: 0, days: 0 }, end: { years: 2021, months: 0, days: 0 } },
		],
		[
			"1999-12-31--2000-01-01",
			{ start: { years: 1999, months: 11, days: 30 }, end: { years: 2000, months: 0, days: 0 } },
		],
		[
			"2022-02-28--2022-03-01",
			{ start: { years: 2022, months: 1, days: 27 }, end: { years: 2022, months: 2, days: 0 } },
		],
		[
			"2024-02-29--2024-03-01",
			{ start: { years: 2024, months: 1, days: 28 }, end: { years: 2024, months: 2, days: 0 } },
		],
		[
			"2022-01-01--2022-01-01",
			{ start: { years: 2022, months: 0, days: 0 }, end: { years: 2022, months: 0, days: 0 } },
		],
		[
			"2022-05-20--2022-04-30",
			{ start: { years: 2022, months: 4, days: 19 }, end: { years: 2022, months: 3, days: 29 } },
		],
		[
			"2022-01-01--2022-12-31",
			{ start: { years: 2022, months: 0, days: 0 }, end: { years: 2022, months: 11, days: 30 } },
		],
		[
			"2022-04-30--2022-05-10",
			{ start: { years: 2022, months: 3, days: 29 }, end: { years: 2022, months: 4, days: 9 } },
		],
		["2022-04-30", { start: { years: 2022, months: 3, days: 29 }, end: { years: 2022, months: 3, days: 29 } }],
		["2022-04", { start: { years: 2022, months: 3, days: 0 }, end: { years: 2022, months: 3, days: 29 } }],
		["2022-Q2", { start: { years: 2022, months: 3, days: 0 }, end: { years: 2022, months: 5, days: 29 } }],
		["2022", { start: { years: 2022, months: 0, days: 0 }, end: { years: 2022, months: 11, days: 30 } }],
	])("parse(%s) == %s", (value, expected) => expect(isoly.Date.Interval.parse(value)?.value).toEqual(expected))
	it.each([
		["2001-01-01", { years: 1, months: 2, days: 3 }, "2001-01-01--2002-03-04"],
		["2001-01-01", { years: -1, months: -1, days: -1 }, "2001-01-01--1999-12-01"],
		["2001-01-01", { years: -1 }, "2001-01-01--2000-01-01"],
		["2001-01-01", { years: -1, months: -1 }, "2001-01-01--1999-12-01"],
		["1999-11-30", { years: 1, months: 1, days: 1 }, "1999-11-30--2000-12-31"],
		["2001-01-01", { years: 1, months: 1, days: 1 }, "2001-01-01--2002-02-02"],
		["2000-12-31", { years: -1, months: -1, days: -1 }, "2000-12-31--1999-11-30"],
	] as const)("from(%s, %o) == %s", (start, duration, expected) =>
		expect(isoly.Date.Interval.from(start, duration)).toEqual(expected)
	)
	it.each([
		[
			"2022-04-30--2022-05-10",
			[
				"2022-04-30",
				"2022-05-01",
				"2022-05-02",
				"2022-05-03",
				"2022-05-04",
				"2022-05-05",
				"2022-05-06",
				"2022-05-07",
				"2022-05-08",
				"2022-05-09",
				"2022-05-10",
			],
		],
		["2022-04-30--2022-04-30", ["2022-04-30"]],
		["2022-05-20--2022-04-30", []],
	] as const)("dates", () => {})
	it.each([
		[
			"2022-04-30--2022-05-10",
			[
				"2022-04-30",
				"2022-05-01",
				"2022-05-02",
				"2022-05-03",
				"2022-05-04",
				"2022-05-05",
				"2022-05-06",
				"2022-05-07",
				"2022-05-08",
				"2022-05-09",
			],
		],
		["2022-04-30--2022-04-30", []],
		["2022-04-30--2022-05-01", ["2022-04-30"]],
		["2022-05-20--2022-04-30", []],
	] as const)("dates(%s) == %s", (value, expected) =>
		expect(isoly.Date.Interval.dates(value).slice(0, -1)).toEqual(expected)
	)
	it.each([
		["2022-04-30--2022-05-20", 20],
		["2022-04-30--2022-04-30", 0],
		["2022-05-20--2022-04-30", -20],
	] as const)("length(%s) == %d", (value, expected) => expect(isoly.Date.Interval.length(value)).toEqual(expected))
	it.each([
		["2022-04-30--2022-05-20", "2022-04-30--2022-05-20"],
		["2022-04-30--2022-04-30", "2022-04-30"],
		["2022-04-01--2022-04-30", "2022-04"],
		["2022-01-01--2022-03-31", "2022-Q1"],
		["2022-07-01--2022-09-30", "2022-Q3"],
		["2022-07-01--2022-12-31", "2022-H2"],
		["2022-01-01--2022-12-31", "2022"],
		["2022-05-20--2022-04-30", "2022-05-20--2022-04-30"],
	] as const)("shorten(%s) == %s", (value, expected) => expect(isoly.Date.Interval.shorten(value)).toEqual(expected))
})
