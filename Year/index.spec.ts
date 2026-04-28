import { isoly } from "../index"

describe("Year.is", () => {
	it.each([
		{ argument: "2024", expected: true },
		{ argument: "1999", expected: true },
		{ argument: "abcd", expected: false },
		{ argument: "20", expected: false },
		{ argument: "20241", expected: false },
		{ argument: "", expected: false }
	])("is($argument) == $expected", ({ argument, expected }) => expect(isoly.Year.is(argument as any)).toEqual(expected))
})
describe("Year.now", () => {
	it("now() returns current year", () =>
		expect(isoly.Year.now()).toEqual(new Date().getFullYear().toString().padStart(4, "0")))
})
describe("Year.from", () => {
	it.each([
		{ argument: "2024-04-28", expected: "2024" },
		{ argument: "1999-12-31", expected: "1999" }
	])("from($argument) == $expected", ({ argument, expected }) =>
		expect(isoly.Year.from(argument as any)).toEqual(expected))
})
describe("Year.next", () => {
	it.each([
		{ argument: "2024", years: 1, expected: "2025" },
		{ argument: "1999", years: 2, expected: "2001" },
		{ argument: "2024", years: -1, expected: "2023" }
	])("next($argument, $years) == $expected", ({ argument, years, expected }) =>
		expect(isoly.Year.next(argument as any, years)).toEqual(expected))
})
describe("Year.previous", () => {
	it.each([
		{ argument: "2024", years: 1, expected: "2023" },
		{ argument: "1999", years: 2, expected: "1997" },
		{ argument: "2024", years: -1, expected: "2025" }
	])("previous($argument, $years) == $expected", ({ argument, years, expected }) =>
		expect(isoly.Year.previous(argument as any, years)).toEqual(expected))
})
describe("Year.first", () => {
	it.each([
		{ argument: "2024", expected: "2024-01-01" },
		{ argument: "1999", expected: "1999-01-01" }
	])("first($argument) == $expected", ({ argument, expected }) =>
		expect(isoly.Year.first(argument as any)).toEqual(expected))
})
describe("Year.last", () => {
	it.each([
		{ argument: "2024", expected: "2024-12-31" },
		{ argument: "1999", expected: "1999-12-31" }
	])("last($argument) == $expected", ({ argument, expected }) =>
		expect(isoly.Year.last(argument as any)).toEqual(expected))
})
describe("Year.getYear", () => {
	it.each([
		{ argument: "2024", expected: 2024 },
		{ argument: "1999", expected: 1999 }
	])("getYear($argument) == $expected", ({ argument, expected }) =>
		expect(isoly.Year.getYear(argument as any)).toEqual(expected))
})
describe("Year.isLeapYear", () => {
	it.each([
		{ argument: "2024", expected: true },
		{ argument: "2000", expected: true },
		{ argument: "1900", expected: false },
		{ argument: "1999", expected: false },
		{ argument: 2024, expected: true },
		{ argument: 2000, expected: true },
		{ argument: 1900, expected: false },
		{ argument: 1999, expected: false }
	])("isLeapYear($argument) == $expected", ({ argument, expected }) =>
		expect(isoly.Year.isLeapYear(argument as any)).toEqual(expected))
})
describe("Year.length", () => {
	it.each([
		{ argument: "2024", expected: 366 },
		{ argument: "2000", expected: 366 },
		{ argument: "1900", expected: 365 },
		{ argument: "1999", expected: 365 }
	])("length($argument) == $expected", ({ argument, expected }) =>
		expect(isoly.Year.length(argument as any)).toEqual(expected))
})
