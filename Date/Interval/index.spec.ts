import { isoly } from "../../index"

describe("isoly.Date.Interval", () => {
	it.each([
		["2020-01-01--2020-01-31", true],
		["2020-01-01--2020-02-31", false],
		["2020-01-31--2020-01-01", false],
	])("is(%s) == %s", (input, expected) => expect(isoly.Date.Interval.is(input)).toBe(expected))
})
