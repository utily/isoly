import { Digit } from "./index"

describe("isoly.Digit.is", () => {
	it.each([
		["0", true],
		["1", true],
		["2", true],
		["3", true],
		["4", true],
		["5", true],
		["6", true],
		["7", true],
		["8", true],
		["9", true],
		["a", false],
		["10", false],
		["", false],
		[null, false],
		[undefined, false],
	] as const)("is(%s) == %s", (input, expected) => expect(Digit.is(input)).toBe(expected))
})
