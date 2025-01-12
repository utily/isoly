import { isoly } from "../index"

describe("CountryCode", () => {
	it("Alpha2 from Alpha3", () => expect(isoly.CountryCode.Alpha2.from("SWE")).toEqual("SE"))
	it("Alpha3 from Alpha2", () => expect(isoly.CountryCode.Alpha3.from("SE")).toEqual("SWE"))
	it("Alpha2 from Numeric", () => expect(isoly.CountryCode.Alpha2.from(752)).toEqual("SE"))
	it("Alpha2 from Numeric, special case for banking usage of 280 (West Germany).", () => {
		const input: isoly.CountryCode.Numeric = 280
		expect(isoly.CountryCode.Numeric.is(input))
		expect(isoly.CountryCode.Alpha2.from(input)).toEqual("DE")
		expect(isoly.CountryCode.Name.en.from(input)).toEqual("Germany")
		expect(isoly.CountryCode.Name.sv.from(input)).toEqual("Tyskland")
	})
	it("Alpha3 from Numeric", () => expect(isoly.CountryCode.Alpha3.from(752)).toEqual("SWE"))
	it("Numeric from Alpha2", () => expect(isoly.CountryCode.Numeric.from("SE")).toEqual(752))
	it("Numeric from Alpha3", () => expect(isoly.CountryCode.Numeric.from("SWE")).toEqual(752))
	it("Alpha2 to sv name", () => expect(isoly.CountryCode.Name.sv.from("SE")).toEqual("Sverige"))
	it("Alpha2 to en name", () => expect(isoly.CountryCode.Name.en.from("SE")).toEqual("Sweden"))
	it("is Alpha2", () => expect(isoly.CountryCode.Alpha2.is("SE")).toBe(true))
	it("is not Alpha2", () => expect(isoly.CountryCode.Alpha3.is("se")).toBe(false))
	it("is Alpha3", () => expect(isoly.CountryCode.Alpha3.is("SWE")).toBe(true))
	it("is not Alpha3", () => expect(isoly.CountryCode.Alpha3.is("Swe")).toBe(false))
	it("is Numeric", () => expect(isoly.CountryCode.Numeric.is(752)).toBe(true))
	it("is not Numeric", () => expect(isoly.CountryCode.Alpha3.is(42)).toBe(false))
	it.each(isoly.CountryCode.Alpha2.values)("Data consistency Alpha2 %i", a2 => {
		expect(isoly.CountryCode.Alpha2.is(a2)).toBe(true)
		expect(isoly.CountryCode.Alpha3.is(a2)).toBe(false)
		expect(isoly.CountryCode.Numeric.is(a2)).toBe(false)
		expect(isoly.CountryCode.Alpha2.from(isoly.CountryCode.Numeric.from(isoly.CountryCode.Alpha3.from(a2)))).toBe(a2)
		expect(isoly.CountryCode.Alpha2.from(isoly.CountryCode.Alpha3.from(isoly.CountryCode.Numeric.from(a2)))).toBe(a2)
	})
	it.each(isoly.CountryCode.Alpha3.values)("Data consistency Alpha3 %i", a3 => {
		expect(isoly.CountryCode.Alpha2.is(a3)).toBe(false)
		expect(isoly.CountryCode.Alpha3.is(a3)).toBe(true)
		expect(isoly.CountryCode.Numeric.is(a3)).toBe(false)
		expect(isoly.CountryCode.Alpha3.from(isoly.CountryCode.Numeric.from(isoly.CountryCode.Alpha2.from(a3)))).toBe(a3)
		expect(isoly.CountryCode.Alpha3.from(isoly.CountryCode.Alpha2.from(isoly.CountryCode.Numeric.from(a3)))).toBe(a3)
	})
	it.each(isoly.CountryCode.Numeric.values)("Data consistency Numeric %s", n => {
		expect(isoly.CountryCode.Alpha2.is(n)).toBe(false)
		expect(isoly.CountryCode.Alpha3.is(n)).toBe(false)
		expect(isoly.CountryCode.Numeric.is(n)).toBe(true)
		if (
			![
				280, // West Germany with fallback
			].includes(n)
		) {
			expect(isoly.CountryCode.Numeric.from(isoly.CountryCode.Alpha3.from(isoly.CountryCode.Alpha2.from(n)))).toBe(n)
			expect(isoly.CountryCode.Numeric.from(isoly.CountryCode.Alpha2.from(isoly.CountryCode.Alpha3.from(n)))).toBe(n)
		}
	})
	it.each([
		"AT", // Austria
		"BE", // Belgium
		"BG", // Bulgaria
		"CY", // Cyprus
		"CZ", // Czech Republic
		"DK", // Denmark
		"EE", // Estonia
		"FI", // Finland
		"FR", // France
		"DE", // Germany
		"GR", // Greece
		"HU", // Hungary
		"IS", // Iceland
		"IE", // Ireland
		"IT", // Italy
		"LV", // Latvia
		"LI", // Liechtenstein
		"LT", // Lithuania
		"LU", // Luxembourg
		"MT", // Malta
		"NL", // Netherlands
		"NO", // Norway
		"PL", // Poland
		"PT", // Portugal
		"RO", // Romania
		"SK", // Slovakia
		"SI", // Slovenia
		"ES", // Spain
		"SE", // Sweden
	] as const)("isEea(%s)", country => expect(isoly.CountryCode.Alpha2.isEea(country)).toBe(true))
	it.each(["US", "CN", "IN", "BR", "RU"] as const)("isEea(%s) == false", country =>
		expect(isoly.CountryCode.Alpha2.isEea(country)).toBe(false)
	)
})
