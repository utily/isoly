import { isoly } from "../index"
describe("isoly.Language", () => {
	it.each([
		["en", true],
		["fr", true],
		["es", true],
		["zh", true],
		["xx", false],
	] as const)("is(%s)", (input, expected) => expect(isoly.Language.is(input)).toBe(expected))
	it.each([
		["en", "English"],
		["fr", "French"],
		["es", "Spanish, Castilian"],
		["zh", "Chinese"],
	] as const)("getName(%s)", (input, expected) => expect(isoly.Language.toName(input)).toBe(expected))
	it.each([
		["en", "English"],
		["fr", "français, langue française"],
		["es", "Español"],
		["zh", "中文 (Zhōngwén), 汉语, 漢語"],
	] as const)("toNativeName(%s)", (input, expected) => expect(isoly.Language.toNativeName(input)).toBe(expected))
})
