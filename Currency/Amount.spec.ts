import { isoly } from "../index"

describe("isoly.Currency.Amount", () => {
	it("should create an Amount instance", () =>
		expect(isoly.Currency.Amount.create("USD", 100).add(50).subtract(20).value).toBe(130))
	it.each([
		["EUR", 100, "100.00 EUR"],
		["SEK", 13.37, "13.37 SEK"],
		["ISK", 13.37, "13 ISK"],
	] as const)("create(%s, %s).toString() == %s", (currency, value, expected) =>
		expect(isoly.Currency.Amount.create(currency, value).toString()).toBe(expected)
	)
	it.each([
		["EUR", 100, [100, "EUR"]],
		["SEK", 13.37, [13.37, "SEK"]],
		["ISK", 13.37, [13, "ISK"]],
	] as const)("create(%s, %s).toJson() == %s", (currency, value, expected) =>
		expect(isoly.Currency.Amount.create(currency, value).toJSON()).toEqual(expected)
	)
	it.each([
		["EUR", 100, 100],
		["SEK", 13.37, 13],
		["ISK", 13.37, 13],
	] as const)("create(%s, %s).major == %s", (currency, value, expected) =>
		expect(isoly.Currency.Amount.create(currency, value).major).toEqual(expected)
	)
	it.each([
		["EUR", 100, 10000],
		["SEK", 13.37, 1337],
		["ISK", 13.37, 13],
	] as const)("create(%s, %s).minor == %s", (currency, value, expected) =>
		expect(isoly.Currency.Amount.create(currency, value).minor).toEqual(expected)
	)
	it.each([["USD", 13.37, 113.37]] as const)("add(create(%s, %s)).value == %s", (currency, value, expected) =>
		expect(isoly.Currency.Amount.create("USD", 100).add(50).value).toBe(130)
	)
})
