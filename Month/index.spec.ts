import { isoly } from "../index"

describe("isoly.Month", () => {
	it.each([
		["2024-01", true],
		["2024-01-01", false],
		["2024-W01", false],
	] as const)("is(%s) == %s", (month, expected) => expect(isoly.Month.is(month)).toEqual(expected))
	it.each([
		["2023-12", "2024-01"],
		["2024-01", "2024-02"],
	] as const)("next(%s) == %s", (month, expected) => expect(isoly.Month.next(month)).toEqual(expected))
	it.each([
		["2024-01", "2023-12"],
		["2024-02", "2024-01"],
	] as const)("previous(%s) == %s", (month, expected) => expect(isoly.Month.previous(month)).toEqual(expected))
	it.each([
		["2024-01", "2024-01-01"],
		["2024-02", "2024-02-01"],
		["2023-03", "2023-03-01"],
		["2022-04", "2022-04-01"],
	] as const)("first(%s) == %s", (month, expected) => expect(isoly.Month.first(month)).toEqual(expected))
	it.each([
		["2024-01", "2024-01"],
		["2024-02", "2024-02"],
		["2023-03", "2023-03"],
		["2022-04", "2022-04"],
	] as const)("from(first(%s)) == %s", (month, expected) =>
		expect(isoly.Month.from(isoly.Month.first(month))).toEqual(expected)
	)
	it.each([
		["2024-01", "2024-01-31"],
		["2024-02", "2024-02-29"],
		["2023-03", "2023-03-31"],
		["2022-04", "2022-04-30"],
	] as const)("last(%s) == %s", (month, expected) => expect(isoly.Month.last(month)).toEqual(expected))
	it.each([
		["2024-01", 2024],
		["2024-02", 2024],
		["2023-03", 2023],
		["2022-04", 2022],
	] as const)("getYear(%s) == %s", (month, expected) => expect(isoly.Month.getYear(month)).toEqual(expected))
	it.each([
		["2024-01", 1],
		["2024-02", 2],
		["2023-03", 3],
		["2022-04", 4],
	] as const)("getMonth(%s) == %s", (month, expected) => expect(isoly.Month.getMonth(month)).toEqual(expected))
	it.each([
		["2024-01", 31],
		["2024-02", 29],
		["2023-03", 31],
		["2022-04", 30],
	] as const)("length(%s) == %s", (month, expected) => expect(isoly.Month.length(month)).toEqual(expected))
	it.each([
		["2024-01", 0, "2024-01-01"],
		["2024-02", 28, "2024-02-29"],
		["2023-03", 30, "2023-03-31"],
		["2022-04", 29, "2022-04-30"],
	] as const)("getDay(%s, %d) == %s", (month, day, expected) =>
		expect(isoly.Month.getDay(month, day)).toEqual(expected)
	)
	it.each([
		["2024-01", { start: "2024-01-01", end: "2024-01-31" }],
		["2024-02", { start: "2024-02-01", end: "2024-02-29" }],
		["2023-03", { start: "2023-03-01", end: "2023-03-31" }],
		["2022-04", { start: "2022-04-01", end: "2022-04-30" }],
	] as const)("getDays(%s) == %s", (month, range) =>
		expect(isoly.Month.getDays(month)).toEqual(isoly.DateRange.toDates(range, true))
	)
})
