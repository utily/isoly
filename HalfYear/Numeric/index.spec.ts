import { isoly } from "../../../isoly"

describe("isoly.HalfYear.Numeric", () => {
	it.each([
		[2023, undefined, { years: 2023 }],
		[undefined, 1, { halfYears: 1 }],
		[2023, 1, { years: 2023, halfYears: 1 }],
	])("value() for (%i, %i)", (year, half, expected) =>
		expect(new isoly.HalfYear.Numeric(year, half).value).toEqual(expected)
	)
	it.each([
		[2023, 0, 181], // normal year, first half
		[2023, 1, 184], // normal year, second half
		[2024, 0, 182], // leap year, first half
		[2024, 1, 184], // leap year, second half
	])("length() for (%i, %i)", (year, half, expected) =>
		expect(new isoly.HalfYear.Numeric(year, half).length).toBe(expected)
	)
	it.each([
		[2023, undefined, true],
		[2023, 0, true],
		[2023, 1, true],
		[2023, 2, false], // outside range
		[2023, -1, false], // negative
	])("normal for (%i, %i)", (year, half, expected) =>
		expect(new isoly.HalfYear.Numeric(year, half).normal).toBe(expected)
	)
	it.each([
		[{ years: 2023, halfYears: 2 }, "2024-H1"], // overflow to next year
		[{ years: 2023, halfYears: 3 }, "2024-H2"],
		[{ years: 2023, halfYears: -1 }, "2022-H2"], // underflow to previous year
		[{ years: 2023, halfYears: -2 }, "2022-H1"],
	])("normalize() %p formats as %s", (input, expected) =>
		expect(new isoly.HalfYear.Numeric(input.years, input.halfYears).normalize().format()).toBe(expected)
	)
	it.each([
		[1, "2023-H2"], // next half
		[2, "2024-H1"], // next year
		[{ halfYears: 1 }, "2023-H2"],
		[{ years: 1 }, "2024-H1"],
		[{ years: 1, halfYears: 1 }, "2024-H2"],
	])("2023-H1.next(%s) == %s", (changes, expected) =>
		expect(new isoly.HalfYear.Numeric(2023, 0).next(changes).format()).toBe(expected)
	)
	it.each([
		[1, { years: 2022, halfYears: 1 }], // previous half
		[2, { years: 2022, halfYears: 0 }], // previous year
		[{ halfYears: 1 }, { years: 2022, halfYears: 1 }], // previous half using object
		[{ years: 1 }, { years: 2022, halfYears: 0 }], // previous year using object
		[
			{ years: 1, halfYears: 1 },
			{ years: 2021, halfYears: 1 },
		], // previous year and half
	])("2023-H1.previous(%s).normalize() == %s", (changes, expected) =>
		expect(new isoly.HalfYear.Numeric(2023, 0).previous(changes).normalize().value).toEqual(expected)
	)
	it("now() returns current half-year", () => {
		const now = new Date()
		const halfYear = isoly.HalfYear.Numeric.now()
		expect(halfYear.years).toBe(now.getFullYear())
		expect(halfYear.halfYears).toBe(Math.floor(now.getMonth() / 6))
	})
	it.each([
		[new Date(2023, 0, 1), { years: 2023, halfYears: 0 }], // January = H1
		[new Date(2023, 6, 1), { years: 2023, halfYears: 1 }], // July = H2
		[
			{ years: 2023, halfYears: 0 },
			{ years: 2023, halfYears: 0 },
		], // Numeric.Value
		[0, { years: undefined, halfYears: 0 }], // number -> halfYears
	])("create(%p).value == %o", (input, expected) => {
		expect(isoly.HalfYear.Numeric.create(input).value).toEqual(expected)
	})
	it.each([
		[undefined, "2023-H1"], // undefined -> no change
		[1, "2023-H2"], // number -> halfYears
		[{ years: 2024 }, "2024-H1"], // change year
		[{ halfYears: 1 }, "2023-H2"], // change halfYear
		[{ years: 2024, halfYears: 1 }, "2024-H2"], // change both
	])("set() from 2023-H1 with %p formats as %s", (changes, expected) => {
		const numeric = new isoly.HalfYear.Numeric(2023, 0)
		expect(numeric.set(changes).format()).toBe(expected)
	})
	it.each([
		[2023, undefined], // year only
		[undefined, 1], // halfYear only
		[2023, 1], // both
	])("year() for %i,%i", (year, halfYear) => {
		const numeric = new isoly.HalfYear.Numeric(year, halfYear)
		expect(numeric.year).toEqual(new isoly.Year.Numeric(year))
	})
})
