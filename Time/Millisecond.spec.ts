import { isoly } from "index"

describe("isoly.Time.Millisecond", () => {
	it.each([
		["000", true],
		["123", true],
		["999", true],
		["1000", false],
		["abc", false],
		["12", false],
		["", false],
	])("is('%s') == %s", (input, expected) => expect(isoly.Time.Millisecond.is(input)).toBe(expected))
	it.each([
		["000", 0],
		["123", 123],
		["999", 999],
	])("parse('%s') == %d", (input, expected) => expect(isoly.Time.Millisecond.parse(input)).toBe(expected))
	it.each([
		[0, "000"],
		[123, "123"],
		[999, "999"],
		[1000, undefined],
		[-1, undefined],
	])("create(%d) == %s", (input, expected) => expect(isoly.Time.Millisecond.create(input)).toBe(expected))
})
