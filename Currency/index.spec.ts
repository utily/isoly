import { isoly } from "../index"

describe("isoly.Currency", () => {
	it.each([
		[undefined, false],
		["SEK", true],
		["ZZZ", false],
		...isoly.Currency.values.map(v => [v, true] as const),
	] as const)("is(%s) == %s", (value, expected) => expect(isoly.Currency.is(value)).toEqual(expected))
	it.each([
		[0.004755520000000001, "SEK", 0],
		[0.004999920000000001, "SEK", 0],
		[17999.204999999998, "SEK", 17999.21],
		[0.005, "SEK", 0.01],
		[0.0049, "SEK", 0.0],
		[0.00499, "SEK", 0.0],
		[0.004999, "SEK", 0.0],
		[0.0049999, "SEK", 0.0],
		[0.00499999, "SEK", 0.0],
		[0.004999999, "SEK", 0.01],
		[0.004999981, "SEK", 0.0],
		[0.575, "EUR", 0.58],
		[0.855, "EUR", 0.86],
		[0.565, "EUR", 0.57],
		[0.055, "EUR", 0.06],
		[42.13377, "BHD", 42.134],
		[42.13377, "CLF", 42.1338],
		[42.13377, "EUR", 42.13],
		[42.13377, "ISK", 42],
		[42.13377, "XXX" as any, 42.13],
	] as const)("round(%f, %s) == %f", (value, currency, expected) =>
		expect(isoly.Currency.round(value, currency)).toEqual(expected)
	)
	it.each([
		[1234567890, "SEK", true],
		[10, "SEK", true],
		[1, "SEK", true],
		[1.1, "SEK", true],
		[1.11, "SEK", true],
		[1.111, "SEK", false],
		[1.1111, "SEK", false],
		[NaN, "SEK", false],
		[1234567890, "ISK", true],
		[10, "ISK", true],
		[1, "ISK", true],
		[1.1, "ISK", false],
		[1.11, "ISK", false],
		[1.12345678, "XAU", true],
		[12345678, "XAU", true],
	] as const)("isRounded(%f, %s) == %s", (value, currency, expected) =>
		expect(isoly.Currency.isRounded(value, currency)).toEqual(expected)
	)
	it.each([
		[95.385 + 18.114 + 0.001, 113.50000000000001],
		[isoly.Currency.add("ISK", 95.385 + 18.114, 0.001), 113],
		[isoly.Currency.add("SEK", 95.385 + 18.114, 0.001), 113.5],
		[isoly.Currency.add("BHD", 95.385 + 18.114, 0.001), 113.5],
		[4.3 + 0.1 + 0.1, 4.499999999999999],
		[isoly.Currency.add("ISK", 0.1, 4.3 + 0.1), 4],
		[isoly.Currency.add("SEK", 0.1, 4.3 + 0.1), 4.5],
		[isoly.Currency.add("BHD", 0.1, 4.3 + 0.1), 4.5],
	])("add(%f, %f) == %f", (value, expected) => expect(value).toEqual(expected))
	it.each([
		[2.1 / 0.6, 3.5000000000000004],
		[isoly.Currency.divide("ISK", 2.1, 0.6), 3],
		[isoly.Currency.divide("SEK", 2.1, 0.6), 3.5],
		[isoly.Currency.divide("BHD", 2.1, 0.6), 3.5],
	])("divide(%f, %f) == %f", (value, expected) => expect(value).toEqual(expected))
	it.each([
		["ISK", 2090.5, 8.61, 18004],
		["SEK", 2090.5, 8.61, 17999.21],
		["BHD", 2090.5, 8.61, 17999.205],
	] as const)("multiply(%s, %f, %f) == %f", (currency, left, right, expected) =>
		expect(isoly.Currency.multiply(currency, left, right)).toEqual(expected)
	)
	it.each([
		[2090.5, 8.61, 17999.204999999998],
		[1000, 50000 * 0.000001, 49.99999999999999],
		[10, 0.000001 * 50000, 0.49999999999999994], //should be 0.5
		[0.000001, 50000, 0.049999999999999996], //should be 0.05
		[10, 0.1 * 1.5, 1.5000000000000002], //should be 1.5
		[0.1, 1.5, 0.15000000000000002], //should be 0.15
	])("%f * %f == %f", (left, right, expected) => expect(left * right).toEqual(expected))
	it.each([
		["ISK", 2090.5, 8.61, 18004],
		["SEK", 2090.5, 8.61, 17999.21],
		["BHD", 2090.5, 8.61, 17999.205],
		["ISK", 1000, 0.000001 * 50000, 50],
		["SEK", 1000, 0.000001 * 50000, 50],
		["BHD", 1000, 0.000001 * 50000, 50],
		["ISK", 10, 0.000001 * 50000, 1],
		["SEK", 10, 0.000001 * 50000, 0.5],
		["BHD", 10, 0.1 * 1.5, 1.5],
		["ISK", 0.1, 1.5, 0],
		["SEK", 0.1, 1.5, 0.15],
		["BHD", 0.1, 1.5, 0.15],
	] as const)("multiply %s, %f, %f, %f == %f", (currency, left, right, expected) =>
		expect(isoly.Currency.multiply(currency, left, right)).toEqual(expected)
	)
	it.each([
		["SEK", 0.1, 1.5, "ISK", 0],
		["SEK", 0.1, 1.5, "SEK", 0.15],
		["SEK", 0.1, 1.5, "BHD", 0.15],
	] as const)("convert %s, %f, %f, %s == %f", (currencyLeft, left, right, currencyRight, expected) =>
		expect(isoly.Currency.convert(currencyLeft, left, right, currencyRight)).toEqual(expected)
	)
	it.each([
		[1.4, 0.9, 0.4999999999999999], // should be 0.5
		[16.4, 0.9, 15.499999999999998], // should be 15.5
		[76.9, 21.4, 55.50000000000001], // should be 55.5
	])("%f - %f == %f", (left, right, expected) => expect(left - right).toEqual(expected))
	it.each([
		["ISK", 16.4, 0.9, 15],
		["ISK", 1.4, 0.9, 0],
		["SEK", 1.4, 0.9, 0.5],
		["BHD", 1.4, 0.9, 0.5],
		["SEK", 16.4, 0.9, 15.5],
		["BHD", 16.4, 0.9, 15.5],
		["ISK", 76.9, 21.4, 56],
		["SEK", 76.9, 21.4, 55.5],
		["BHD", 76.9, 21.4, 55.5],
	] as const)("subtract %s, %f, %f == %f", (currency, left, right, expected) =>
		expect(isoly.Currency.subtract(currency, left, right)).toEqual(expected)
	)
	it.each([
		[10.42, 3.01, 0, 0, 13.43],
		[10.4, 3.03, 0, 0, 13.43],
		[10.2, 3.03, 0.2, 0, 13.43],
		[9.81, 3.41, 0.21, 0, 13.43],
		[10.02, 3.2, 0.21, 0, 13.43],
		[5.01, 5.19, 3.03, 0.2, 13.43],
		[0.11, 0.11, 0.11, 0, 0.33],
		[0.01, 0.08, 0.24, 0, 0.33],
		[0.13, 0.13, 0.11, 0, 0.37],
		[0.11, 0.09, 0.14, 0, 0.34],
		[0, 0.01, 0.56, 0.14, 0.71],
		[-0.01, 0.02, 0.56, 0.14, 0.71],
		[-0.01, 0.02, 0.55, 0.14, 0.7],
	])("sum %j == %f", (term0, term1, term2, term3, expected) =>
		expect(
			isoly.Currency.add("EUR", isoly.Currency.add("EUR", isoly.Currency.add("EUR", term0, term1), term2), term3)
		).toEqual(expected)
	)
	it.each([
		[0.004755520000000001, "SEK", 0],
		[0.004999920000000001, "SEK", 0],
		[0, "SEK", 0],
		[0.01, "SEK", 1],
		[0.02, "SEK", 2],
		[0.049, "SEK", 5],
		[0.0501, "SEK", 5],
		[3.05, "SEK", 305],
		[0.5, "SEK", 50],
		[0.2, "ISK", 0],
		[400.2, "ISK", 400],
		[400, "ISK", 400],
		[123.456, "XPT", 123.456],
	] as const)("toMinor %f, %s == %f", (value, currency, expected) =>
		expect(isoly.Currency.toMinor(value, currency)).toEqual(expected)
	)
	it.each([
		[0, "SEK", 0],
		[1, "SEK", 0.01],
		[2, "SEK", 0.02],
		[5, "SEK", 0.05],
		[305, "SEK", 3.05],
		[50, "SEK", 0.5],
		[0, "ISK", 0],
		[400, "ISK", 400],
		[123.456, "XPT", 123.456],
	] as const)("fromMinor %f, %s == %f", (value, currency, expected) =>
		expect(isoly.Currency.fromMinor(value, currency)).toEqual(expected)
	)
	it.each(isoly.Currency.values)("name(%s)", currency => expect(isoly.Currency.name(currency)).toMatchSnapshot())
})
