import { isoly } from "../../index"

describe("isoly.Date.Numeric", () => {
	it.each([
		[{ years: 2023, months: 4, days: 14 }, "2023-05-15"],
		[{ years: 2023, months: 4, days: 30 }, "2023-05-31"],
		[{ years: 2024, months: 1, days: 28 }, "2024-02-29"],
		[{ years: 2023, months: 0, days: 0 }, "2023-01-01"],
		[{ years: 2023, months: 11, days: 30 }, "2023-12-31"],
		[{ years: 2023, months: 5, days: 29 }, "2023-06-30"],
		[{ years: 2023, months: 5, days: 30 }, "2023-07-01"],
		[{ years: 2023, months: 6, days: 29 }, "2023-07-30"],
		[{ years: 2023, months: 6, days: 30 }, "2023-07-31"],
	])("(%j).format() == %s", (input, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).format()).toBe(expected)
	)
	it.each([
		[
			{ years: 2023, months: 13, days: 0 },
			{ years: 2024, months: 1, days: 0 },
		],
		[
			{ years: 2023, months: 4, days: 31 },
			{ years: 2023, months: 5, days: 0 },
		],
		[
			{ years: 2023, months: 1, days: 31 },
			{ years: 2023, months: 2, days: 3 },
		], // February overflow
	])("(%j).normalize() == %j", (input, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).normalize().value).toEqual(expected)
	)
	it.each([
		[
			{ years: 2023, months: 4, days: 14 },
			{ years: 2023, days: 134 },
		],
		[
			{ years: 2023, months: 0, days: 0 },
			{ years: 2023, days: 0 },
		],
		[
			{ years: 2024, months: 1, days: 28 },
			{ years: 2024, days: 59 },
		],
		[
			{ years: 2022, months: 0, days: 0 },
			{ years: 2022, days: 0 },
		],
		[
			{ years: 2023, months: 4, days: 14 },
			{ years: 2023, days: 134 },
		],
		[
			{ years: 2024, months: 11, days: 30 },
			{ years: 2024, days: 365 },
		],
		[
			{ years: 2024, months: 11, days: 31 },
			{ years: 2025, days: 0 },
		],
	])("(%j).ordinal() == %j", (input, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).ordinal().value).toEqual(expected)
	)
	it.each([
		[{ years: 2023, months: 4, days: 14 }, "calendar", "2023-05-15"],
		[{ years: 2023, months: 4, days: 14 }, "ordinal", "2023-135"],
		[{ years: 2, months: 3, days: 4 }, "duration", "D2Y3M4D"],
	])("(%j).format(%s) == %s", (input, format, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).format(format as any)).toBe(expected)
	)
	it.each([
		[{ years: 2023, months: 4, days: 14 }, { years: 1 }, { years: 2024, months: 4, days: 14 }],
		[{ years: 2023, months: 4, days: 14 }, { months: 1 }, { years: 2023, months: 5, days: 14 }],
		[{ years: 2023, months: 4, days: 14 }, { days: 1 }, { years: 2023, months: 4, days: 15 }],
	])("(%j).next(%j) == %j", (input, increment, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).next(increment).value).toEqual(expected)
	)
	it.each([
		[{ years: 2023, months: 4, days: 14 }, { years: 1 }, { years: 2022, months: 4, days: 14 }],
		[{ years: 2023, months: 4, days: 14 }, { months: 1 }, { years: 2023, months: 3, days: 14 }],
		[{ years: 2023, months: 4, days: 14 }, { days: 1 }, { years: 2023, months: 4, days: 13 }],
	])("(%j).previous(%j) == %j", (input, increment, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).previous(increment).value).toEqual(expected)
	)
	it.each([
		[{ years: 2023, months: 4, days: 14 }, { years: 2023, months: 4, days: 15 }, true],
		[{ years: 2023, months: 4, days: 14 }, { years: 2023, months: 4, days: 14 }, false],
		[{ years: 2023, months: 4, days: 14 }, { years: 2023, months: 4, days: 13 }, false],
	])("(%j).before(%j) == %s", (input, compare, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).before(compare)).toBe(expected)
	)
	it.each([
		[{ years: 2023, months: 4, days: 14 }, { years: 2023, months: 4, days: 13 }, true],
		[{ years: 2023, months: 4, days: 14 }, { years: 2023, months: 4, days: 14 }, false],
		[{ years: 2023, months: 4, days: 14 }, { years: 2023, months: 4, days: 15 }, false],
	])("(%j).after(%j) == %s", (input, compare, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).after(compare)).toBe(expected)
	)
	it.each([
		[{ years: 2023, months: 4, days: 14 }, { years: 2023, months: 4, days: 14 }, true],
		[{ years: 2023, months: 4, days: 14 }, { years: 2023, months: 4, days: 15 }, false],
	])("(%j).equals(%j) == %s", (input, compare, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).equals(compare)).toBe(expected)
	)
	it("zero", () => expect(isoly.Date.Numeric.zero.value).toEqual({ years: 0, months: 0, days: 0 }))
	it("create handles Date objects", () =>
		expect(isoly.Date.Numeric.create(new Date(2023, 4, 15) /* May 15, 2023 */).format()).toBe("2023-05-15"))
	it("create(5)", () => expect(isoly.Date.Numeric.create(5).value).toEqual({ years: 0, months: 0, days: 5 }))
	it("weekday", () => expect(new isoly.Date.Numeric(2023, 4, 14) /* May 15, 2023 was a Monday */.weekday).toBe(0))
	it.each([
		[
			{ years: 2022, months: 0, days: 0 },
			{ years: 2022, months: 0 },
		],
		[
			{ years: 2023, months: 4, days: 14 },
			{ years: 2023, months: 4 },
		],
		[
			{ years: 2024, months: 11, days: 30 },
			{ years: 2024, months: 11 },
		],
	])("month for %j == %j", (input, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).month).toEqual(expected)
	)
	it.each([
		[{ years: 2022, months: 0, days: 0 }, { years: 2022 }],
		[{ years: 2023, months: 4, days: 14 }, { years: 2023 }],
		[{ years: 2024, months: 11, days: 30 }, { years: 2024 }],
	])("year for %j == %j", (input, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).year).toEqual(expected)
	)
	it.each([
		[
			{ years: 2022, months: 0, days: 0 },
			{ years: 2022, quarters: 0 },
		],
		[
			{ years: 2023, months: 4, days: 14 },
			{ years: 2023, quarters: 1 },
		],
		[
			{ years: 2024, months: 11, days: 30 },
			{ years: 2024, quarters: 3 },
		],
	])("quarter for %j == %j", (input, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).quarter).toEqual(expected)
	)
	it.each([
		[
			{ years: 2022, months: 0, days: 0 },
			{ years: 2022, halfYears: 0 },
		],
		[
			{ years: 2023, months: 4, days: 14 },
			{ years: 2023, halfYears: 0 },
		],
		[
			{ years: 2024, months: 11, days: 30 },
			{ years: 2024, halfYears: 1 },
		],
	])("halfYear for %j == %j", (input, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).halfYear).toEqual(expected)
	)
	it.each([
		[
			{ years: 2020, months: 1, days: 28 }, // Leap year, Feb 29, 2020
			{ years: 2020, weeks: 8 },
		],
		[
			{ years: 2021, months: 11, days: 30 }, // Dec 31, 2021
			{ years: 2021, weeks: 51 },
		],
		[
			{ years: 2022, months: 0, days: 0 },
			{ years: 2022, weeks: -1 },
		],
		[
			{ years: 2022, months: 5, days: 1 }, // June 2, 2022
			{ years: 2022, weeks: 21 },
		],
		[
			{ years: 2022, months: 6, days: 3 }, // July 4, 2022
			{ years: 2022, weeks: 26 },
		],
		[
			{ years: 2022, months: 11, days: 25 }, // Dec 26, 2022
			{ years: 2022, weeks: 51 },
		],
		[
			{ years: 2023, months: 0, days: 0 },
			{ years: 2023, weeks: -1 },
		],
		[
			{ years: 2023, months: 4, days: 14 },
			{ years: 2023, weeks: 19 },
		],
		[
			{ years: 2023, months: 11, days: 31 },
			{ years: 2024, weeks: 0 },
		],
		[
			{ years: 2024, months: 11, days: 30 },
			{ years: 2024, weeks: 52 },
		],
	])("week for %j == %j", (input, expected) =>
		expect(new isoly.Date.Numeric(input.years, input.months, input.days).week).toEqual(expected)
	)
})
