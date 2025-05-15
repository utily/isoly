import { isoly } from "../../index"

describe("isoly.DateTime.Duration", () => {
	it.each([
		["PT", false],
		["P1YT", true],
		["P1M0DT", true],
		["P1DT", true],
		["P1Y1M1DT", true],
		["P1Y1M1DT1H2M3S", true],
		["PT0S", true],
		["PT1S", true],
		["PT1H2M3S", true],
		["PT0S", true],
		["P0Y0M0DT", true],
		["P1Y2M3DT", true],
		["P1Y2M3DT4H5M6S", true],
	])("is(%s) == %s", (input, expected) => expect(isoly.DateTime.Duration.is(input)).toBe(expected))
})
