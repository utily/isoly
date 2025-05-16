import { isoly } from "../../../isoly"

describe("Numeric", () => {
	it.each([
		[2023, 0, 181],
		[2023, 1, 184],
		[2024, 0, 182], // leap year
	])("length for %i-H%i is %i", (year, half, expected) =>
		expect(new isoly.HalfYear.Numeric(year, half).length).toBe(expected)
	)
	it.each([[2023, 2, { years: 2024, halfYears: 0 }]] as const)("(%s, %s)normalize()", (year, half, expected) =>
		expect(new isoly.HalfYear.Numeric(year, half).normalize()).toEqual(expected)
	)
	it.each([
		[1, "2023-H2"],
		[2, "2024-H1"],
		[-1, "2022-H2"],
		[-2, "2022-H1"],
	])("next(%i) from 2023-H1", (offset, expected) =>
		expect(new isoly.HalfYear.Numeric(2023, 0).next(offset).format()).toBe(expected)
	)
	it.each([
		[1, "2022-H2"],
		[2, "2022-H1"],
		[-1, "2023-H2"],
		[-2, "2024-H1"],
	])("previous(%i) from 2023-H1", (offset, expected) =>
		expect(new isoly.HalfYear.Numeric(2023, 0).previous(offset).format()).toBe(expected)
	)
	it("now", () => {
		const now = new Date()
		const halfYear = isoly.HalfYear.Numeric.now()
		expect(halfYear.years).toBe(now.getFullYear())
		expect(halfYear.halfYears).toBe(Math.floor(now.getMonth() / 6))
	})
})
