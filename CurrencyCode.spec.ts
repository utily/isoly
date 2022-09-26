import { CurrencyCode } from "./CurrencyCode"

describe("CurrencyCode", () => {
	it("undefined", () => {
		expect(CurrencyCode.is(undefined)).toBeFalsy()
	})
	it("check types array", () => {
		expect(CurrencyCode.types.every(c => CurrencyCode.is(c))).toBeTruthy()
		expect(CurrencyCode.is("752")).toBeTruthy()
		expect(CurrencyCode.is("000")).toBeFalsy()
	})
})
