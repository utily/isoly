import { isoly } from "../index"

describe("Year.is", () =>
	it.each([
		{ year: "2023", expected: true },
		{ year: "0000", expected: true },
		{ year: "9999", expected: true },
		{ year: "23", expected: false },
		{ year: "abcd", expected: false },
		{ year: "10000", expected: false },
		{ year: "", expected: false }
	] satisfies { year: string; expected: boolean }[])("is($year) == $expected", ({ year, expected }) =>
		expect(isoly.Year.is(year)).toBe(expected)))
describe("Year.from", () =>
	it.each([
		{ date: "2023-04-28", expected: "2023" },
		{ date: "1999-12-31", expected: "1999" }
	] satisfies { date: string; expected: string }[])("from($date) == $expected", ({ date, expected }) =>
		expect(isoly.Year.from(date)).toBe(expected)))
describe("Year.next", () =>
	it.each([
		{ year: "2023", years: undefined, expected: "2024" },
		{ year: "2023", years: 2, expected: "2025" }
	] satisfies {
		year: isoly.Year
		years: number | undefined
		expected: string
	}[])("next($year, $years) == $expected", ({ year, years, expected }) =>
		expect(isoly.Year.next(year, years)).toBe(expected)))
describe("Year.previous", () =>
	it.each([
		{ year: "2023", years: undefined, expected: "2022" },
		{ year: "2023", years: 2, expected: "2021" }
	] satisfies {
		year: isoly.Year
		years: number | undefined
		expected: string
	}[])("previous($year, $years) == $expected", ({ year, years, expected }) =>
		expect(isoly.Year.previous(year, years)).toBe(expected)))
describe("Year.getYear", () =>
	it.each([
		{ year: "2023", expected: 2023 },
		{ year: "0001", expected: 1 }
	] satisfies { year: isoly.Year; expected: number }[])("getYear($year) == $expected", ({ year, expected }) =>
		expect(isoly.Year.getYear(year)).toBe(expected)))
describe("Year.length", () =>
	it.each([
		{ year: "2020", expected: 366 },
		{ year: "2021", expected: 365 },
		{ year: "2000", expected: 366 },
		{ year: "1900", expected: 365 }
	] satisfies { year: isoly.Year; expected: 365 | 366 }[])("length($year) == $expected", ({ year, expected }) =>
		expect(isoly.Year.length(year)).toBe(expected)))
