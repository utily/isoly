import { isoly } from "../../"

describe("isoly.Year.Numeric", () => {
	it("value", () => expect(new isoly.Year.Numeric(2023).value).toEqual({ years: 2023 }))
	it.each([
		[2023, false],
		[2024, true], // divisible by 4
		[2100, false], // divisible by 100 but not 400
		[2000, true], // divisible by 400
		[1900, false], // divisible by 100 but not 400
	])("leapYear for %i is %s", (year, expected) => expect(new isoly.Year.Numeric(year).leapYear).toBe(expected))
	it("format", () => expect(new isoly.Year.Numeric(2023).format()).toBe("2023"))
	it.each([
		[2023, "weeks", 52],
		[2020, "weeks", 53],
		[2023, "days", 365],
		[2024, "days", 366], // leap year
	] as const)("length for %i (%s) is %i", (year, precision, expected) =>
		expect(new isoly.Year.Numeric(year).length(precision)).toBe(expected)
	)
	it("next/previous", () => {
		const year = new isoly.Year.Numeric(2023)
		expect(year.next().format()).toBe("2024")
		expect(year.next(2).format()).toBe("2025")
		expect(year.previous().format()).toBe("2022")
		expect(year.previous(2).format()).toBe("2021")
	})
	it("now", () => expect(isoly.Year.Numeric.now().years).toBe(new Date().getFullYear()))
	it.each([
		[new Date(2023, 0, 1), "2023"],
		[2024, "2024"],
		[{ years: 2025 }, "2025"],
	] as const)("create(%p) formats as %s", (value, expected) => {
		expect(isoly.Year.Numeric.create(value).format()).toBe(expected)
	})
})
