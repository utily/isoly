import { Currency } from "./Currency"

describe("Currency", () => {
	it("check types array", () => {
		expect(Currency.types.every(c => Currency.is(c))).toBeTruthy()
		expect(Currency.is("SEK")).toBeTruthy()
		expect(Currency.is("ZZZ")).toBeFalsy()
	})
})
