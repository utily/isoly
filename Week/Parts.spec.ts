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
		[{ year: 2019, week: 1 }, 6, "2019-01-05"],
	] as const)("getDay(%s, %d) should return %s", (week, day, expected) =>
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
})
