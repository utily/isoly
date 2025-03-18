import { isoly } from "../index"

describe("isoly.Fixed.Precision", () => {
	describe("isoly.Fixed.Precision", () => {
		it.each([
			[0, true],
			[1, true],
			[2, true],
			[3, true],
			[4, true],
			[5, true],
			[6, true],
			[7, true],
			[8, true],
			[9, true],
			[10, true],
			[11, true],
			[12, true],
			[13, false],
			[-1, false],
			[1.5, false],
			["3", false],
			[null, false],
			[undefined, false],
		] as const)("is(%s) == %s", (value, expected) => expect(isoly.Fixed.Precision.is(value)).toBe(expected))
	})
})
