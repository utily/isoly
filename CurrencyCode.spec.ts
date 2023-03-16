import { isoly } from "./index"

describe("CurrencyCode", () => {
	it("undefined", () => {
		expect(isoly.CurrencyCode.is(undefined)).toBeFalsy()
	})
	it("check types array", () => {
		expect(isoly.CurrencyCode.types.every(c => isoly.CurrencyCode.is(c))).toBeTruthy()
		expect(isoly.CurrencyCode.is("752")).toBeTruthy()
		expect(isoly.CurrencyCode.is("000")).toBeFalsy()
	})
})
