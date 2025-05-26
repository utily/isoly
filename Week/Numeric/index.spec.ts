import { isoly } from "../../index"

describe("isoly.Week.Numeric", () => {
	it.each([
		[{ years: 2023, weeks: 19 }, "2023-W20"],
		[{ years: 2023, weeks: 0 }, "2023-W01"],
		[{ years: 2023, weeks: 51 }, "2023-W52"],
		[{ years: 2020, weeks: 52 }, "2020-W53"], // Leap year with 53 weeks
	])("(%j).format() == %s", (input, expected) =>
		expect(new isoly.Week.Numeric(input.years, input.weeks).format()).toBe(expected)
	)
	it.each([
		[
			{ years: 2023, weeks: 53 },
			{ years: 2024, weeks: 1 },
		], // Week overflow
		[
			{ years: 2023, weeks: 52 },
			{ years: 2024, weeks: 0 },
		], // Week overflow
		[
			{ years: 2023, weeks: -1 },
			{ years: 2022, weeks: 51 },
		], // Week underflow
		[
			{ years: 2020, weeks: 52 },
			{ years: 2020, weeks: 52 },
		], // Valid 53rd week
		[
			{ years: 2020, weeks: 53 },
			{ years: 2021, weeks: 0 },
		], // Valid 53rd week
	])("(%j).normalize() == %j", (input, expected) =>
		expect(new isoly.Week.Numeric(input.years, input.weeks).normalize().value).toEqual(expected)
	)
	it.each([
		[{ years: 2023, weeks: 19 }, 1, { years: 2023, weeks: 20 }],
		[{ years: 2023, weeks: 51 }, 2, { years: 2023, weeks: 53 }],
		[{ years: 2020, weeks: 52 }, 1, { years: 2020, weeks: 53 }],
	])("(%j).next(%i) == %j", (input, increment, expected) =>
		expect(new isoly.Week.Numeric(input.years, input.weeks).next(increment).value).toEqual(expected)
	)
	it.each([
		[{ years: 2023, weeks: 19 }, 1, { years: 2023, weeks: 18 }],
		[{ years: 2023, weeks: 0 }, 1, { years: 2023, weeks: -1 }],
		[{ years: 2020, weeks: 53 }, 1, { years: 2020, weeks: 52 }],
	])("(%j).previous(%i) == %j", (input, increment, expected) =>
		expect(new isoly.Week.Numeric(input.years, input.weeks).previous(increment).value).toEqual(expected)
	)
	it.each([
		[{ years: 2023, weeks: 19 }, true],
		[{ years: 2023, weeks: 52 }, false], // 2023 only has 52 weeks
		[{ years: 2020, weeks: 52 }, true], // 2020 has 53 weeks
		[{ years: 2020, weeks: 53 }, false], // 2020 has 53 weeks
		[{ years: 2023, weeks: -1 }, false],
	])("(%j).normalized == %s", (input, expected) =>
		expect(new isoly.Week.Numeric(input.years, input.weeks).normalized).toBe(expected)
	)
	it.each([[new Date(2023, 4, 15), "2023-W20"]])("create(Date(%s)).format() == %s", (input, expected) =>
		expect(isoly.Week.Numeric.create(input).format()).toBe(expected)
	)
	it.each([[5, { weeks: 5 }]])("create(%i).value == %j", (input, expected) =>
		expect(isoly.Week.Numeric.create(input).value).toEqual(expected)
	)
	it.each([[2023, 19, "2023"]])("new(%i, %i).year.format() == %s", (year, week, expected) =>
		expect(new isoly.Week.Numeric(year, week).year.format()).toBe(expected)
	)
	it.each([
		[new Date(2020, 11, 27), "2020-W52"], // Sunday in regular week
		[new Date(2020, 11, 28), "2020-W53"], // Monday starts week 53 of 2020
		[new Date(2020, 11, 31), "2020-W53"], // Thursday in week 53 of 2020
		[new Date(2021, 0, 1), "2020-W53"], // Friday Jan 1st is in last week of 2020
		[new Date(2021, 0, 3), "2020-W53"], // Sunday Jan 3rd is in last week of 2020
		[new Date(2021, 0, 4), "2021-W01"], // Monday Jan 4th starts week 1
		[new Date(2023, 11, 31), "2023-W52"], // Sunday Dec 31st 2023 is in week 52 of 2023
		[new Date(2024, 0, 1), "2024-W01"], // Monday Jan 1st 2024 is in week 1
		[new Date(2024, 11, 29), "2024-W52"], // Sunday Dec 29th 2024 is in week 52 of 2024
		[new Date(2024, 11, 30), "2025-W01"], // Monday Dec 30th 2024 is in week 1 of 2025
		[new Date(2024, 11, 31), "2025-W01"], // Tuesday Dec 31st 2024 is in week 1 of 2025
		[new Date(2025, 0, 1), "2025-W01"], // Wednesday Jan 1st 2025 is in week 1
	])("create(%s).format() == %s", (input, expected) => expect(isoly.Week.Numeric.create(input).format()).toBe(expected))
})
