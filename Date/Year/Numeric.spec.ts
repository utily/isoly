import { isoly } from "../../index"

describe("isoly.Date.Year.Numeric", () => {
	it.each([
		["2023", 2023],
		["0000", 0],
		["9999", 9999],
		["MXMVII", undefined],
	])("parse('%s') == %s", (input, expected) => expect(isoly.Date.Year.Numeric.parse(input)).toBe(expected))
	it.each(["-23", "abcd", "10000"])("parse('%s') == undefined", input =>
		expect(isoly.Date.Year.Numeric.parse(input)).toBe(undefined)
	)
})
