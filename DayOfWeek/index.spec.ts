import { isoly } from "../index"

describe("isoly.DayOfWeek", () => {
	it.each([
		["2024-12-29", "sunday"],
		["2024-12-30", "monday"],
		["2025-01-01", "wednesday"],
		["2025-01-02", "thursday"],
		["2025-01-03", "friday"],
		["2025-01-04", "saturday"],
		["2025-01-05", "sunday"],
	] as const)("from(%s) == %s", (date, expected) => expect(isoly.DayOfWeek.from(date)).toEqual(expected))

	it.each([
		["sunday", true],
		["monday", true],
		["Monday", false],
		["", false],
		["tuesday", true],
		["wednesday", true],
		["thursday", true],
		["friday", true],
		["saturday", true],
		["Sunday", false],
	] as const)("is(%s) == %s", (day, expected) => expect(isoly.DayOfWeek.is(day)).toEqual(expected))

	it.each([
		["sunday", 7],
		["monday", 1],
		["tuesday", 2],
		["wednesday", 3],
		["thursday", 4],
		["friday", 5],
		["saturday", 6],
	] as const)("toNumeric(%s) == %s", (day, expected) => expect(isoly.DayOfWeek.toNumeric(day)).toEqual(expected))
})
