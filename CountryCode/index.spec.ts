import { isoly } from "../index"

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
	it("Alpha2 from Numeric, special case for banking usage of 280 (West Germany).", () => {
		const input: isoly.CountryCode.Numeric = 280
		expect(isoly.CountryCode.Numeric.is(input))
		expect(isoly.CountryCode.Alpha2.from(input)).toEqual("DE")
		expect(isoly.CountryCode.Name.en.from(input)).toEqual("Germany")
		expect(isoly.CountryCode.Name.sv.from(input)).toEqual("Tyskland")
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
	it("Data consistency Alpha2", () => {
		isoly.CountryCode.Alpha2.values.forEach(a2 => {
			expect(isoly.CountryCode.Alpha2.is(a2)).toBe(true)
			expect(isoly.CountryCode.Alpha3.is(a2)).toBe(false)
			expect(isoly.CountryCode.Numeric.is(a2)).toBe(false)
			expect(isoly.CountryCode.Alpha2.from(isoly.CountryCode.Numeric.from(isoly.CountryCode.Alpha3.from(a2)))).toBe(a2)
			expect(isoly.CountryCode.Alpha2.from(isoly.CountryCode.Alpha3.from(isoly.CountryCode.Numeric.from(a2)))).toBe(a2)
		})
	})
	it("Data consistency Alpha3", () => {
		isoly.CountryCode.Alpha3.values.forEach(a3 => {
			expect(isoly.CountryCode.Alpha2.is(a3)).toBe(false)
			expect(isoly.CountryCode.Alpha3.is(a3)).toBe(true)
			expect(isoly.CountryCode.Numeric.is(a3)).toBe(false)
			expect(isoly.CountryCode.Alpha3.from(isoly.CountryCode.Numeric.from(isoly.CountryCode.Alpha2.from(a3)))).toBe(a3)
			expect(isoly.CountryCode.Alpha3.from(isoly.CountryCode.Alpha2.from(isoly.CountryCode.Numeric.from(a3)))).toBe(a3)
		})
	})
	it("Data consistency Numeric", () => {
		isoly.CountryCode.Numeric.values.forEach(n => {
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
	})
})
