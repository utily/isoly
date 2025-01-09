import { isoly } from "../index"

describe("isoly.Week", () => {
	it.each([
		["2024-12-29", "2024-W52"],
		["2024-12-30", "2025-W01"],
		["2025-01-01", "2025-W01"],
	] as const)("from(%s) == %s", (date, expected) => expect(isoly.Week.from(date)).toEqual(expected))
	it.each([
		["2025-W01", "2024-12-30"],
		["2024-W01", "2024-01-01"],
		["2023-W01", "2023-01-02"],
		["2022-W01", "2022-01-03"],
		["2021-W01", "2021-01-04"],
		["2020-W01", "2019-12-30"],
		["2019-W01", "2018-12-31"],
	] as const)("first(%s)", (week, expected) => {
		expect(isoly.Week.first(week)).toEqual(expected)
	})
	it.each(["2024-W01", "2023-W01", "2022-W01", "2021-W01", "2020-W01", "2019-W01"] as const)(
		"first -> from -> first for %s",
		week => expect(isoly.Week.from(isoly.Week.first(week))).toEqual(week)
	)
	it.each([
		["2024-W01", "2023-W52"],
		["2023-W01", "2022-W52"],
		["2022-W01", "2021-W52"],
		["2021-W01", "2020-W53"],
		["2020-W01", "2019-W52"],
		["2019-W01", "2018-W52"],
	] as const)("previous(%s) should return %s", (week, expected) => expect(isoly.Week.previous(week)).toEqual(expected))
	it.each([
		["2023-W52", "2024-W01"],
		["2022-W52", "2023-W01"],
		["2021-W52", "2022-W01"],
		["2020-W53", "2021-W01"],
		["2019-W52", "2020-W01"],
		["2018-W52", "2019-W01"],
	] as const)("next(%s) should return %s", (week, expected) => expect(isoly.Week.next(week)).toEqual(expected))
	it.each([
		["2024-W01", 2024],
		["2023-W01", 2023],
		["2022-W01", 2022],
		["2021-W01", 2021],
		["2020-W01", 2020],
		["2019-W01", 2019],
	] as const)("getYear(%s) should return %d", (week, expected) => expect(isoly.Week.getYear(week)).toEqual(expected))
	it.each(["2024-W01", "2023-W01", "2022-W01", "2021-W01", "2020-W01", "2019-W01"] as const)(
		"getWeek(%s)",
		(week, expected) => expect(isoly.Week.getWeek(week)).toEqual(1)
	)
	it.each([
		["2024-W01", 1, "2024-01-01"],
		["2023-W01", 2, "2023-01-03"],
		["2022-W01", 3, "2022-01-05"],
		["2021-W01", 4, "2021-01-07"],
		["2020-W01", 5, "2020-01-03"],
		["2019-W01", 6, "2019-01-05"],
	] as const)("getDay(%s, %d) should return %s", (week, day, expected) =>
		expect(isoly.Week.getDate(week, day)).toEqual(expected)
	)
	it.each([
		["2024-W01", { start: "2024-01-01", end: "2024-01-07" }],
		["2023-W01", { start: "2023-01-02", end: "2023-01-08" }],
		["2022-W01", { start: "2022-01-03", end: "2022-01-09" }],
	] as const)("getDays(%s) should return dates from %o", (week, range) =>
		expect(isoly.Week.getDays(week)).toEqual(isoly.DateRange.toDates(range, true))
	)
})
