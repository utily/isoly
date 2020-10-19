import * as isoly from "../index"

describe("CountryCode", () => {
	it("Alpha2 from Alpha3", () => {
		const input: isoly.CountryCode.Alpha3 = "SWE"
		expect(isoly.CountryCode.Alpha2.from(input)).toEqual("SE")
	})
	it("Alpha3 from Alpha2", () => {
		const input: isoly.CountryCode.Alpha2 = "SE"
		expect(isoly.CountryCode.Alpha3.from(input)).toEqual("SWE")
	})
	it("Alpha2 from Numeric", () => {
		const input: isoly.CountryCode.Numeric = 752
		expect(isoly.CountryCode.Alpha2.from(input)).toEqual("SE")
	})
	it("Alpha3 from Numeric", () => {
		const input: isoly.CountryCode.Numeric = 752
		expect(isoly.CountryCode.Alpha3.from(input)).toEqual("SWE")
	})
	it("Numeric from Alpha2", () => {
		const input: isoly.CountryCode.Alpha2 = "SE"
		expect(isoly.CountryCode.Numeric.from(input)).toEqual(752)
	})
	it("Numeric from Alpha3", () => {
		const input: isoly.CountryCode.Alpha3 = "SWE"
		expect(isoly.CountryCode.Numeric.from(input)).toEqual(752)
	})
	it("Alpha2 to sv name", () => {
		const input: isoly.CountryCode.Alpha2 = "SE"
		expect(isoly.CountryCode.Name.sv.from(input)).toEqual("Sverige")
	})
	it("Alpha2 to en name", () => {
		const input: isoly.CountryCode.Alpha2 = "SE"
		expect(isoly.CountryCode.Name.en.from(input)).toEqual("Sweden")
	})
	it("is Alpha2", () => {
		const input: isoly.CountryCode.Alpha2 = "SE"
		expect(isoly.CountryCode.Alpha2.is(input))
	})
	it("is not Alpha2", () => {
		expect(isoly.CountryCode.Alpha3.is("se")).toBeFalsy()
	})
	it("is Alpha3", () => {
		const input: isoly.CountryCode.Alpha3 = "SWE"
		expect(isoly.CountryCode.Alpha3.is(input))
	})
	it("is not Alpha3", () => {
		expect(isoly.CountryCode.Alpha3.is("Swe")).toBeFalsy()
	})
	it("is Numeric", () => {
		const input: isoly.CountryCode.Numeric = 752
		expect(isoly.CountryCode.Numeric.is(input))
	})
	it("is not Numeric", () => {
		expect(isoly.CountryCode.Alpha3.is(42)).toBeFalsy()
	})
})
