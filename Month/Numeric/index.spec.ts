import { isoly } from "../../index"

describe("isoly.Month.Numeric", () => {
	it.each([
		[{ years: 2024, months: 1 }, true],
		[{ years: 2024, months: 12 }, true],
		[{ years: 2024, months: 13 }, true],
		[{ years: 2024, months: 0 }, true],
		[{ years: 2024, months: -1 }, true],
		[{ years: 2024, months: 24 }, true],
	] as const)("is(%s) == %s", (value, expected) =>
		expect(isoly.Month.Numeric.is(isoly.Month.Numeric.create(value))).toEqual(expected)
	)

	it.each([
		[
			{ years: 2024, months: 1 },
			{ years: 2024, months: 1 },
		],
		[
			{ years: 2024, months: 12 },
			{ years: 2025, months: 0 },
		],
		[
			{ years: 2024, months: 13 },
			{ years: 2025, months: 1 },
		],
		[
			{ years: 2024, months: 0 },
			{ years: 2024, months: 0 },
		],
		[
			{ years: 2024, months: -1 },
			{ years: 2023, months: 11 },
		],
		[
			{ years: 2024, months: 24 },
			{ years: 2026, months: 0 },
		],
	] as const)("normalize(%o) == %s", (value, expected) =>
		expect(isoly.Month.Numeric.create(value).normalize()).toEqual(expected)
	)
})
