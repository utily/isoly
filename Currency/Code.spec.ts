import { isoly } from "../index"

describe("Currency.Code", () => {
	it("undefined", () => expect(isoly.Currency.Code.is(undefined)).toBeFalsy())
	it("check types array", () => {
		expect(isoly.Currency.Code.values.every(c => isoly.CurrencyCode.is(c))).toBeTruthy()
		expect(isoly.Currency.Code.is("752")).toBeTruthy()
		expect(isoly.Currency.Code.is("000")).toBeFalsy()
	})
})
