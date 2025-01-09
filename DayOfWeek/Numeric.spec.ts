import { isoly } from "../index"

describe("isoly.DayOfWeek.Numeric", () => {
	it.each([
		["2024-12-29", 7],
		["2024-12-30", 1],
		["2025-01-01", 3],
	] as const)("from(%s) == %s", (date, expected) => expect(isoly.DayOfWeek.Numeric.from(date)).toEqual(expected))
	it.each([
		[6, true],
		[7, true],
		[2, true],
		[8, false],
		[0, false],
	] as const)("is(%s) == %s", (day, expected) => expect(isoly.DayOfWeek.Numeric.is(day)).toEqual(expected))
})
