import { isoly } from "../../index"

describe("isoly.Week.Number", () => {
	it.each(["01", "09", "10", "53"])('is("%s") == true', value => expect(isoly.Week.Number.is(value)).toBe(true))
	it.each(["00", "54", "1", "001", "aa"])('is("%s") == false', value => expect(isoly.Week.Number.is(value)).toBe(false))
	it.each([1, 7, 53])("Numeric.is(%d) == true", value => expect(isoly.Week.Number.Numeric.is(value)).toBe(true))
	it.each([0, 54, -1])("Numeric.is(%d) == false", value => expect(isoly.Week.Number.Numeric.is(value)).toBe(false))
	it.each([
		["01", 1],
		["1", 1],
		["09", 9],
		["53", 53],
		["00", undefined],
		["54", undefined],
		["aa", undefined],
	])('Numeric.parse("%s") == %s', (value, expected) => expect(isoly.Week.Number.Numeric.parse(value)).toBe(expected))
})
