import { isoly } from "../index"

describe("isoly.Time.Second", () => {
	it.each(["00", "59", "60"])("is(%s) == true", input => expect(isoly.Time.Second.is(input)).toBe(true))
	it.each(["61", "5", "abc"])("is(%s) == false", input => expect(isoly.Time.Second.is(input)).toBe(false))
	it.each([0, 5, 59, 60])("Numeric.is(%d) == true", input => expect(isoly.Time.Second.Numeric.is(input)).toBe(true))
	it.each([61, -1])("Numeric.is(%d) == false", input => expect(isoly.Time.Second.Numeric.is(input)).toBe(false))
	it.each([
		["00", 0],
		["09", 9],
		["10", 10],
		["59", 59],
		["60", 60],
		["5", 5],
		["abc", undefined],
	])("parse(%s) == %d", (input, expected) => expect(isoly.Time.Second.parse(input)).toBe(expected))
	it.each([
		[0, "00"],
		[59, "59"],
		[60, "60"],
		[61, undefined],
		[-1, undefined],
		[9, "09"],
		[10, "10"],
	])("create(%d) == %s", (input, expected) => expect(isoly.Time.Second.create(input)).toBe(expected))
})
