import { isoly } from "../../index"

describe("isoly.Date.Duration", () => {
	it.each([
		["P", false],
		["P1Y", true],
		["P1M0D", true],
		["P1D", true],
		["P1Y1M1D", true],
		["P1Y1M1DT1H2M3S", false],
		["PT0S", false],
		["PT1S", false],
		["PT1H2M3S", false],
		["PT0S", false],
		["P0Y0M0D", true],
		["P1Y2M3D", true],
		["P1Y2M3DT4H5M6S", false],
	])("is(%s) == %s", (input, expected) => expect(isoly.Date.Duration.is(input)).toBe(expected))
})
