import { isoly } from "../index"

describe("isoly.Time.Hour", () => {
	it.each(["00", "05", "23"])("is(%s) == true", input => expect(isoly.Time.Hour.is(input)).toBe(true))
	it.each(["24", "5", "abc"])("is(%s) false", input => expect(isoly.Time.Hour.is(input)).toBe(false))
	it.each([0, 1, 5, 23])("Numeric.is(%d) == true", input => expect(isoly.Time.Hour.Numeric.is(input)).toBe(true))
	it.each([-1, 24])("Numeric.is(%d) == false", input => expect(isoly.Time.Hour.Numeric.is(input)).toBe(false))
	it.each([
		["00", 0],
		["5", 5],
		["09", 9],
		["10", 10],
		["23", 23],
		["24", undefined],
		["abc", undefined],
	])("parse(%s) == %d", (input, expected) => expect(isoly.Time.Hour.parse(input)).toBe(expected))
	it.each([
		[-1, undefined],
		[0, "00"],
		[9, "09"],
		[10, "10"],
		[23, "23"],
		[24, undefined],
	])("create(%d) == %s", (input, expected) => expect(isoly.Time.Hour.create(input)).toBe(expected))
})
