import { isoly } from "../index"

describe("Country", () => {
	it("Alpha2 from Alpha3", () => expect(isoly.Country.Alpha2.from("SWE")).toEqual("SE"))
	it("Alpha3 from Alpha2", () => expect(isoly.Country.Alpha3.from("SE")).toEqual("SWE"))
	it("Alpha2 from Numeric", () => expect(isoly.Country.Alpha2.from(752)).toEqual("SE"))
	it("Alpha2 from Numeric, special case for banking usage of 280 (West Germany).", () => {
		const input: isoly.Country.Numeric = 280
		expect(isoly.Country.Numeric.is(input))
		expect(isoly.Country.Alpha2.from(input)).toEqual("DE")
		expect(isoly.Country.Name.en.from(input)).toEqual("Germany")
		expect(isoly.Country.Name.sv.from(input)).toEqual("Tyskland")
	})
	it("Alpha3 from Numeric", () => expect(isoly.Country.Alpha3.from(752)).toEqual("SWE"))
	it("Numeric from Alpha2", () => expect(isoly.Country.Numeric.from("SE")).toEqual(752))
	it("Numeric from Alpha3", () => expect(isoly.Country.Numeric.from("SWE")).toEqual(752))
	it("Alpha2 to sv name", () => expect(isoly.Country.Name.sv.from("SE")).toEqual("Sverige"))
	it("Alpha2 to en name", () => expect(isoly.Country.Name.en.from("SE")).toEqual("Sweden"))
	it("is Alpha2", () => expect(isoly.Country.Alpha2.is("SE")).toBe(true))
	it("is not Alpha2", () => expect(isoly.Country.Alpha3.is("se")).toBe(false))
	it("is Alpha3", () => expect(isoly.Country.Alpha3.is("SWE")).toBe(true))
	it("is not Alpha3", () => expect(isoly.Country.Alpha3.is("Swe")).toBe(false))
	it("is Numeric", () => expect(isoly.Country.Numeric.is(752)).toBe(true))
	it("is not Numeric", () => expect(isoly.Country.Alpha3.is(42)).toBe(false))
	it.each(isoly.Country.Alpha2.values)("Data consistency Alpha2 %s", a2 => {
		expect(isoly.Country.Alpha2.is(a2)).toBe(true)
		expect(isoly.Country.Alpha3.is(a2)).toBe(false)
		expect(isoly.Country.Numeric.is(a2)).toBe(false)
		expect(isoly.Country.Alpha2.from(isoly.Country.Numeric.from(isoly.Country.Alpha3.from(a2)))).toBe(a2)
		expect(isoly.Country.Alpha2.from(isoly.Country.Alpha3.from(isoly.Country.Numeric.from(a2)))).toBe(a2)
	})
	it.each(isoly.Country.Alpha3.values)("Data consistency Alpha3 %s", a3 => {
		expect(isoly.Country.Alpha2.is(a3)).toBe(false)
		expect(isoly.Country.Alpha3.is(a3)).toBe(true)
		expect(isoly.Country.Numeric.is(a3)).toBe(false)
		expect(isoly.Country.Alpha3.from(isoly.Country.Numeric.from(isoly.Country.Alpha2.from(a3)))).toBe(a3)
		expect(isoly.Country.Alpha3.from(isoly.Country.Alpha2.from(isoly.Country.Numeric.from(a3)))).toBe(a3)
	})
	it.each(isoly.Country.Numeric.values)("Data consistency Numeric %s", n => {
		expect(isoly.Country.Alpha2.is(n)).toBe(false)
		expect(isoly.Country.Alpha3.is(n)).toBe(false)
		expect(isoly.Country.Numeric.is(n)).toBe(true)
		if (
			![
				280, // West Germany with fallback
			].includes(n)
		) {
			expect(isoly.Country.Numeric.from(isoly.Country.Alpha3.from(isoly.Country.Alpha2.from(n)))).toBe(n)
			expect(isoly.Country.Numeric.from(isoly.Country.Alpha2.from(isoly.Country.Alpha3.from(n)))).toBe(n)
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
	] as const)("isEea(%s)", country => expect(isoly.Country.Alpha2.isEea(country)).toBe(true))
	it.each(["US", "CN", "IN", "BR", "RU"] as const)("isEea(%s) == false", country =>
		expect(isoly.Country.Alpha2.isEea(country)).toBe(false)
	)
})
