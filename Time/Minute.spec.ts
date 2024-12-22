import { isoly } from "../index"

describe("isoly.Time.Minute", () => {
	it.each(["00", "59"])("is %s true", input => expect(isoly.Time.Minute.is(input)).toBe(true))
	it.each(["60", "5", "60", "abc"])("is %s false", input => expect(isoly.Time.Minute.is(input)).toBe(false))
	it.each([0, 5, 59])("Numeric.is %d true", input => expect(isoly.Time.Minute.Numeric.is(input)).toBe(true))
	it.each([60, -1])("Numeric.is %d false", input => expect(isoly.Time.Minute.Numeric.is(input)).toBe(false))
	it.each([
		["00", 0],
		["59", 59],
		["5", undefined],
		["abc", undefined],
	])("parse %s", (input, expected) => expect(isoly.Time.Minute.parse(input)).toBe(expected))
	it.each([
		[0, "00"],
		[59, "59"],
		[60, undefined],
		[-1, undefined],
	])("create %d", (input, expected) => expect(isoly.Time.Minute.create(input)).toBe(expected))
	it.each([
		[9, "09"],
		[10, "10"],
	])("create %d", (input, expected) => expect(isoly.Time.Minute.create(input)).toBe(expected))
	it.each([
		["09", 9],
		["10", 10],
	])("parse %s", (input, expected) => expect(isoly.Time.Minute.parse(input)).toBe(expected))
})
