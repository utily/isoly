import { isoly } from "../index"

describe("isoly.Time.Numeric", () => {
	it.each([
		["12:34:56.789", { hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }],
		["01:02:03.004", { hours: 1, minutes: 2, seconds: 3, milliseconds: 4 }],
		["23:59:59.999", { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }],
		["00:00:00.000", { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }],
		["09:08:07.006", { hours: 9, minutes: 8, seconds: 7, milliseconds: 6 }],
		["15:45:30.123", { hours: 15, minutes: 45, seconds: 30, milliseconds: 123 }],
		["12:34:56", { hours: 12, minutes: 34, seconds: 56 }],
		["12:34", { hours: 12, minutes: 34 }],
		["12", { hours: 12 }],
		["23:59:60", { hours: 23, minutes: 59, seconds: 60 }],
		["100:100:100.123456789", { hours: 100, minutes: 100, seconds: 100, milliseconds: 123 }],
		[undefined, {}],
	] as const)("parse(%s) == %s", (time, expected) => expect(isoly.Time.Numeric.parse(time)).toEqual(expected))
	it.each([
		[{ hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, 45296789],
		[{ hours: 1, minutes: 2, seconds: 3, milliseconds: 4 }, 3723004],
		[{ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }, 86399999],
		[{ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }, 0],
		[{ hours: 9, minutes: 8, seconds: 7, milliseconds: 6 }, 32887006],
		[{ hours: 15, minutes: 45, seconds: 30, milliseconds: 123 }, 56730123],
		[{ hours: 12, minutes: 34, seconds: 56 }, 45296000],
		[{ hours: 12, minutes: 34 }, 45240000],
		[{ hours: 12 }, 43200000],
		[{ hours: 23, minutes: 59, seconds: 60 }, 86400000],
		[{ hours: 100, minutes: 100, seconds: 100, milliseconds: 123456789 }, 489556789],
		[{ hours: 100, minutes: -100, seconds: -100, milliseconds: -123456789 }, 230443211],
	])("epoch(%s) == %d", (time, expected) => expect(isoly.Time.Numeric.epoch(time, "milliseconds")).toEqual(expected))
	it.each([
		[
			{ hours: 12, minutes: 34, seconds: 56, milliseconds: 789 },
			{ hours: 12, minutes: 34, seconds: 56, milliseconds: 789 },
		],
		[
			{ hours: 1, minutes: 2, seconds: 3, milliseconds: 4 },
			{ hours: 1, minutes: 2, seconds: 3, milliseconds: 4 },
		],
		[
			{ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 },
			{ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 },
		],
		[
			{ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
			{ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
		],
		[
			{ hours: 9, minutes: 8, seconds: 7, milliseconds: 6 },
			{ hours: 9, minutes: 8, seconds: 7, milliseconds: 6 },
		],
		[
			{ hours: 15, minutes: 45, seconds: 30, milliseconds: 123 },
			{ hours: 15, minutes: 45, seconds: 30, milliseconds: 123 },
		],
		[
			{ hours: 12, minutes: 34, seconds: 56 },
			{ hours: 12, minutes: 34, seconds: 56 },
		],
		[
			{ hours: 12, minutes: 34 },
			{ hours: 12, minutes: 34 },
		],
		[{ hours: 12 }, { hours: 12 }],
		[
			{ hours: 23, minutes: 59, seconds: 60 },
			{ hours: 24, minutes: 0, seconds: 0 },
		],
		[
			{ hours: 100, minutes: 100, seconds: 100, milliseconds: 123456789 },
			{ hours: 5 * 24 + 15, minutes: 59, seconds: 16, milliseconds: 789 },
		],
		[
			{ hours: 100, minutes: -100, seconds: -100, milliseconds: -123456789 },
			{ hours: 2 * 24 + 16, minutes: 0, seconds: 43, milliseconds: 211 },
		],
		[{ milliseconds: 45296789 }, { hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }],
	])("normalize(%s) == %s", (time, expected) => expect(isoly.Time.Numeric.normalize(time)).toEqual(expected))
	it.each([
		[{ hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, "12:34:56.789"],
		[{ hours: 1, minutes: 2, seconds: 3, milliseconds: 4 }, "01:02:03.004"],
		[{ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }, "23:59:59.999"],
		[{ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }, "00:00:00.000"],
		[{ hours: 9, minutes: 8, seconds: 7, milliseconds: 6 }, "09:08:07.006"],
		[{ hours: 15, minutes: 45, seconds: 30, milliseconds: 123 }, "15:45:30.123"],
		[{ hours: 12, minutes: 34, seconds: 56 }, "12:34:56"],
		[{ hours: 12, minutes: 34 }, "12:34"],
		[{ hours: 12 }, "12"],
		[{ hours: 23, minutes: 59, seconds: 60 }, "24:00:00"],
		[{ hours: 100, minutes: 100, seconds: 100, milliseconds: 123 }, "101:41:40.123"],
		[{ milliseconds: 45296789 }, "12:34:56.789"],
		[{ milliseconds: 789 }, "00:00:00.789"],
	] as const)("format(%s) == %s", (time, expected) => expect(isoly.Time.Numeric.format(time)).toEqual(expected))
	it.each([
		[{ hours: 12, minutes: 34, seconds: 56, milliseconds: 768 }, "hours", { hours: 12 }],
		[{ hours: 12, minutes: 34, seconds: 56, milliseconds: 768 }, "minutes", { hours: 12, minutes: 34 }],
		[{ hours: 12, minutes: 34, seconds: 56, milliseconds: 768 }, "seconds", { hours: 12, minutes: 34, seconds: 56 }],
		[
			{ hours: 12, minutes: 34, seconds: 56, milliseconds: 768 },
			"milliseconds",
			{ hours: 12, minutes: 34, seconds: 56, milliseconds: 768 },
		],
	] as const)("truncate(%s, %s) == %s", (value, precision, expected) =>
		expect(isoly.Time.Numeric.truncate(value, precision)).toEqual(expected)
	)
	it.each([
		[{ hours: 12 }, "hours"],
		[{ hours: 12, minutes: 34 }, "minutes"],
		[{ hours: 12, minutes: 34, seconds: 56 }, "seconds"],
		[{ hours: 12, minutes: 34, seconds: 56, milliseconds: 768 }, "milliseconds"],
	] as const)("precision(%s) == %s", (value, expected) => expect(isoly.Time.Numeric.precision(value)).toEqual(expected))
})
