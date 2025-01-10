import { isoly } from "../index"

describe("Currency.Code", () => {
	it("undefined", () => expect(isoly.Currency.Code.is(undefined)).toBeFalsy())
	it.each([
		["752", true],
		["000", false],
	] as const)("is(%s)", (code, expected) => expect(isoly.Currency.Code.is(code)).toBe(expected))
	it.each([
		["USD", "840"],
		["EUR", "978"],
		["JPY", "392"],
		["XXX", "999"],
		["INV" as any, undefined],
	] as const)("from(%s) == %s", (currency, code) => expect(isoly.Currency.Code.from(currency)).toBe(code))
	it.each([
		["840", "USD"],
		["978", "EUR"],
		["392", "JPY"],
		["999", "XXX"],
		["000" as any, undefined],
	] as const)("to(%s) == %s", (code, currency) => expect(isoly.Currency.Code.to(code)).toBe(currency))
})
