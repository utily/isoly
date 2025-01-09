import { isoly } from "../index"

describe("isoly.Week.Parts", () => {
	it.each([
		["2024-12-29", { year: 2024, week: 52 }],
		["2024-12-30", { year: 2025, week: 1 }],
		["2025-01-01", { year: 2025, week: 1 }],
	] as const)("from(%s) == %s", (date, expected) => expect(isoly.Week.Parts.from(date)).toEqual(expected))
	it.each([
		[{ year: 2025, week: 1 }, "2024-12-30"],
		[{ year: 2024, week: 1 }, "2024-01-01"],
		[{ year: 2023, week: 1 }, "2023-01-02"],
		[{ year: 2022, week: 1 }, "2022-01-03"],
		[{ year: 2021, week: 1 }, "2021-01-04"],
		[{ year: 2020, week: 1 }, "2019-12-30"],
		[{ year: 2019, week: 1 }, "2018-12-31"],
	] as const)("first(%s)", (week, expected) => {
		expect(isoly.Week.Parts.first(week)).toEqual(expected)
	})
	it.each([
		[{ year: 2024, week: 52 }, "2024-12-29"],
		[{ year: 2023, week: 52 }, "2023-12-31"],
		[{ year: 2022, week: 52 }, "2023-01-01"],
		[{ year: 2021, week: 52 }, "2022-01-02"],
		[{ year: 2020, week: 53 }, "2021-01-03"],
		[{ year: 2019, week: 52 }, "2019-12-29"],
	] as const)("last(%s)", (week, expected) => {
		expect(isoly.Week.Parts.last(week)).toEqual(expected)
	})
	it.each([
		{ year: 2024, week: 1 },
		{ year: 2023, week: 1 },
		{ year: 2022, week: 1 },
		{ year: 2021, week: 1 },
		{ year: 2020, week: 1 },
		{ year: 2019, week: 1 },
	] as const)("first -> from -> first for %s", week =>
		expect(isoly.Week.Parts.from(isoly.Week.Parts.first(week))).toEqual(week)
	)
	it.each([
		[
			{ year: 2024, week: 1 },
			{ year: 2023, week: 52 },
		],
		[
			{ year: 2023, week: 1 },
			{ year: 2022, week: 52 },
		],
		[
			{ year: 2022, week: 1 },
			{ year: 2021, week: 52 },
		],
		[
			{ year: 2021, week: 1 },
			{ year: 2020, week: 53 },
		],
		[
			{ year: 2020, week: 1 },
			{ year: 2019, week: 52 },
		],
		[
			{ year: 2019, week: 1 },
			{ year: 2018, week: 52 },
		],
	] as const)("previous(%s) should return %s", (week, expected) =>
		expect(isoly.Week.Parts.previous(week)).toEqual(expected)
	)
	it.each([
		[
			{ year: 2023, week: 52 },
			{ year: 2024, week: 1 },
		],
		[
			{ year: 2022, week: 52 },
			{ year: 2023, week: 1 },
		],
		[
			{ year: 2021, week: 52 },
			{ year: 2022, week: 1 },
		],
		[
			{ year: 2020, week: 53 },
			{ year: 2021, week: 1 },
		],
		[
			{ year: 2019, week: 52 },
			{ year: 2020, week: 1 },
		],
		[
			{ year: 2018, week: 52 },
			{ year: 2019, week: 1 },
		],
	] as const)("next(%s) should return %s", (week, expected) => expect(isoly.Week.Parts.next(week)).toEqual(expected))
	it.each([
		[{ year: 2024, week: 1 }, 1, "2024-01-01"],
		[{ year: 2023, week: 1 }, 2, "2023-01-03"],
		[{ year: 2022, week: 1 }, 3, "2022-01-05"],
		[{ year: 2021, week: 1 }, 4, "2021-01-07"],
		[{ year: 2020, week: 1 }, 5, "2020-01-03"],
		[{ year: 2019, week: 1 }, 7, "2019-01-06"],
		[{ year: 2024, week: 1 }, "monday", "2024-01-01"],
		[{ year: 2023, week: 1 }, "tuesday", "2023-01-03"],
		[{ year: 2022, week: 1 }, "wednesday", "2022-01-05"],
		[{ year: 2021, week: 1 }, "thursday", "2021-01-07"],
		[{ year: 2020, week: 1 }, "friday", "2020-01-03"],
		[{ year: 2019, week: 1 }, "sunday", "2019-01-06"],
	] as const)("getDay(%s, %s) should return %s", (week, day, expected) =>
		expect(isoly.Week.Parts.getDate(week, day)).toEqual(expected)
	)
	it.each([
		[
			{ year: 2024, week: 1 },
			{ start: "2024-01-01", end: "2024-01-07" },
		],
		[
			{ year: 2023, week: 1 },
			{ start: "2023-01-02", end: "2023-01-08" },
		],
		[
			{ year: 2022, week: 1 },
			{ start: "2022-01-03", end: "2022-01-09" },
		],
	] as const)("getDays(%s) should return dates from %o", (week, range) =>
		expect(isoly.Week.Parts.getDays(week)).toEqual(isoly.DateRange.toDates(range, true))
	)
	it.each([
		[2024, 52],
		[2023, 52],
		[2022, 52],
		[2021, 52],
		[2020, 53],
		[2019, 52],
	] as const)("lastWeek(%d) should return %d", (year, expected) =>
		expect(isoly.Week.Parts.lastWeek(year)).toEqual(expected)
	)
})
