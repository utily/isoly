import { isoly } from "../index"

describe("isoly.DayOfWeek", () => {
	it.each([
		["2024-12-29", "sunday"],
		["2024-12-30", "monday"],
		["2025-01-01", "wednesday"],
	] as const)("from(%s) == %s", (date, expected) => expect(isoly.DayOfWeek.from(date)).toEqual(expected))
	it.each([
		["sunday", true],
		["monday", true],
		["Monday", false],
		["", false],
	] as const)("is(%s) == %s", (day, expected) => expect(isoly.DayOfWeek.is(day)).toEqual(expected))
})
