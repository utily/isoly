import { isoly } from "../index"

describe("isoly.Date", () => {
	it.each([
		["2023-05-15", true],
		["2023-05-31", true],
		["2024-02-29", true], // leap year
		["2023/05/15", false],
		["2023-5-15", false],
		["202a-05-15", false],
		["2023-05-32", false],
		["2023-13-15", false],
		["2023-02-29", false], // non-leap year
		["2023-05-00", false],
		["2023-00-15", false],
		["2023-04-31", false],
	])("is(%s) == %s", (value, expected) => expect(isoly.Date.is(value)).toBe(expected))
	it.each([
		["2023-05-15", "2023-05-15"],
		["2023-05-31", "2023-05-31"],
		["2024-02-29", "2024-02-29"], // leap year
		["2023/05/15", undefined],
		["2023-5-15", "2023-05-15"],
		["202a-05-15", undefined],
		["2023-05-32", undefined],
		["2023-13-15", undefined],
		["2023-02-29", undefined], // non-leap year
		["2023-05-00", undefined],
		["2023-00-15", undefined],
		["2023-04-31", undefined],
	])("from(%s) == %s", (value, expected) => expect(isoly.Date.from(value)).toBe(expected))
	it.each([
		["2023-05-15", { years: 2023, months: 4, days: 14 }],
		["2023-05-31", { years: 2023, months: 4, days: 30 }],
		["2024-02-29", { years: 2024, months: 1, days: 28 }], // leap year
		["2023-01-01", { years: 2023, months: 0, days: 0 }],
		["2023-12-31", { years: 2023, months: 11, days: 30 }],
		[undefined, undefined],
		["2023/05/15", undefined],
		["2023-5-15", { years: 2023, months: 4, days: 14 }],
		["202a-05-15", undefined],
		["2023-05-32", { years: 2023, months: 4, days: 31 }],
		["2023-13-15", { years: 2023, months: 12, days: 14 }],
		["2023-02-29", { years: 2023, months: 1, days: 28 }], // non-leap year
		["2023-05-00", { years: 2023, months: 4, days: -1 }],
		["2023-00-15", { years: 2023, months: -1, days: 14 }],
		["2023-04-31", { years: 2023, months: 3, days: 30 }],
	])("parse(%s)?.value == %j", (value, expected) => expect(isoly.Date.parse(value as any)?.value).toEqual(expected))
})
