import { isoly } from "../../index"

describe("isoly.Date.Month.Numeric", () => {
	it.each([
		[1, true],
		[12, true],
		[13, false],
		[0, false],
	])("is(%d) == %s", (input, expected) => expect(isoly.Date.Month.Numeric.is(input)).toBe(expected))
	it.each([
		["01", 1],
		["12", 12],
		["13", undefined],
		["00", undefined],
	])("parse(%s) == %d", (input, expected) => expect(isoly.Date.Month.Numeric.parse(input)).toBe(expected))
	it.each([
		[1, "01"],
		[12, "12"],
		[13, undefined],
		[0, undefined],
	])("creates from %d", (input, expected) => expect(isoly.Date.Month.create(input)).toBe(expected))
})
