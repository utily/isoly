import { isoly } from "../index"

describe("Year.Numeric", () => {
	it.each([
		{ value: 2020, expected: 366 },
		{ value: 2021, expected: 365 },
		{ value: 2000, expected: 366 },
		{ value: 1900, expected: 365 }
	] satisfies { value: number; expected: 365 | 366 }[])("length ($value) == $expected", ({ value, expected }) =>
		expect(new isoly.Year.Numeric(value).length).toBe(expected))
	it.each([
		{ value: 2020, years: 1, expected: 2021 },
		{ value: 2020, years: 5, expected: 2025 },
		{ value: 2020, years: -1, expected: 2019 }
	] satisfies { value: number; years: number; expected: number }[])("next ($value, $years) == $expected", ({
		value,
		years,
		expected
	}) => expect(new isoly.Year.Numeric(value).next(years).value).toBe(expected))
	it.each([
		{ value: 2020, years: 1, expected: 2019 },
		{ value: 2020, years: 5, expected: 2015 },
		{ value: 2020, years: -1, expected: 2021 }
	] satisfies { value: number; years: number; expected: number }[])("previous ($value, $years) == $expected", ({
		value,
		years,
		expected
	}) => expect(new isoly.Year.Numeric(value).previous(years).value).toBe(expected))
	it.each([
		{ value: 1, expected: "0001" },
		{ value: 2020, expected: "2020" },
		{ value: 9999, expected: "9999" }
	] satisfies { value: number; expected: isoly.Year }[])("toString ($value) == $expected", ({ value, expected }) =>
		expect(new isoly.Year.Numeric(value).toString()).toBe(expected))
	it.each([
		{ value: "2020", expected: 2020 },
		{ value: "0001", expected: 1 },
		{ value: "9999", expected: 9999 },
		{ value: "abcd", expected: undefined },
		{ value: "123", expected: undefined }
	] satisfies { value: isoly.Year; expected: number | undefined }[])("parse ($value) == $expected", ({
		value,
		expected
	}) => expect(isoly.Year.Numeric.parse(value)?.value).toBe(expected))
})
