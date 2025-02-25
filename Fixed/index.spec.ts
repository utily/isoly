import { isoly } from "../index"

describe("isoly.Fixed", () => {
	it.each([
		[0.004755520000000001, 2, 0],
		[0.004999920000000001, 2, 0],
		[17999.204999999998, 2, 17999.21],
		[0.005, 2, 0.01],
		[0.0049, 2, 0.0],
		[0.00499, 2, 0.0],
		[0.004999, 2, 0.0],
		[0.0049999, 2, 0.0],
		[0.00499999, 2, 0.0],
		[0.004999999, 2, 0.01],
		[0.004999981, 2, 0.0],
		[0.575, 2, 0.58],
		[0.855, 2, 0.86],
		[0.565, 2, 0.57],
		[0.055, 2, 0.06],
		[42.13377, 3, 42.134],
		[42.13377, 4, 42.1338],
		[42.13377, 2, 42.13],
		[42.13377, 0, 42],
		[42.13377, undefined, 42], // default precision is 0
	] as const)("create(%f, %i) == %f", (value, precision, expected) =>
		expect(isoly.Fixed.create(value, precision).value).toEqual(expected)
	)
	it.each([
		[95.385 + 18.114, 0.001, 113.50000000000001],
		[4.3 + 0.1, 0.1, 4.499999999999999],
	])("%f + %f == %f", (left, right, expected) => expect(left + right).toEqual(expected))
	it.each([
		[95.385 + 18.114, 0.001, 0, 113],
		[95.385 + 18.114, 0.001, 2, 113.5],
		[95.385 + 18.114, 0.001, 3, 113.5],
		[0.1, 4.3 + 0.1, 0, 4],
		[0.1, 4.3 + 0.1, 2, 4.5],
		[0.1, 4.3 + 0.1, 3, 4.5],
	] as const)("add(%f, %f, %i) == %f", (left, right, precision, expected) =>
		expect(isoly.Fixed.add(left, right, precision).value).toEqual(expected)
	)
	it.each([[2.1, 0.6, 3.5000000000000004]] as const)("%f / %f == %f", (left, right, expected) =>
		expect(left / right).toEqual(expected)
	)
	it.each([
		[2.1, 0.6, 0, 3],
		[2.1, 0.6, 2, 3.5],
		[2.1, 0.6, 3, 3.5],
	] as const)("divide(%f, %f, %i) == %f", (left, right, precision, expected) =>
		expect(isoly.Fixed.divide(left, right, precision).value).toEqual(expected)
	)
	it.each([
		[2090.5, 8.61, 0, 18004],
		[2090.5, 8.61, 2, 17999.21],
		[2090.5, 8.61, 3, 17999.205],
	] as const)("multiply(%f, %f, %i) == %f", (left, right, precision, expected) =>
		expect(isoly.Fixed.multiply(left, right, precision).value).toEqual(expected)
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
		[2090.5, 8.61, 0, 18004],
		[2090.5, 8.61, 2, 17999.21],
		[2090.5, 8.61, 3, 17999.205],
		[1000, 0.000001 * 50000, 0, 50],
		[1000, 0.000001 * 50000, 2, 50],
		[1000, 0.000001 * 50000, 3, 50],
		[10, 0.000001 * 50000, 0, 1.0],
		[10, 0.000001 * 50000, 2, 0.5],
		[10, 0.1 * 1.5, 3, 1.5],
		[0.1, 1.5, 0, 0],
		[0.1, 1.5, 2, 0.15],
		[0.1, 1.5, 3, 0.15],
	] as const)("multiply(%f, %f, %i) == %f", (left, right, precision, expected) =>
		expect(isoly.Fixed.multiply(left, right, precision).value).toEqual(expected)
	)
	it.each([
		// [0.1, 2, 1.5, 0, 0],
		[0.1, 2, 1.5, 2, 0.15],
		[0.1, 2, 1.5, 3, 0.15],
	] as const)("multiply %s, %f, %f, %f == %f", (left, leftPrecision, right, rightPrecision, expected) =>
		expect(isoly.Fixed.create(left, leftPrecision).multiply(isoly.Fixed.create(right, rightPrecision)).value).toEqual(
			expected
		)
	)
	it.each([
		[1.4, 0.9, 0.4999999999999999], // should be 0.5
		[16.4, 0.9, 15.499999999999998], // should be 15.5
		[76.9, 21.4, 55.50000000000001], // should be 55.5
	])("%f - %f == %f", (left, right, expected) => expect(left - right).toEqual(expected))
	it.each([
		[16.4, 0.9, 0, 15],
		[1.4, 0.9, 0, 0],
		[1.4, 0.9, 2, 0.5],
		[1.4, 0.9, 3, 0.5],
		[16.4, 0.9, 2, 15.5],
		[16.4, 0.9, 3, 15.5],
		[76.9, 21.4, 0, 56],
		[76.9, 21.4, 2, 55.5],
		[76.9, 21.4, 3, 55.5],
	] as const)("subtract %s, %f, %f == %f", (left, right, precision, expected) =>
		expect(isoly.Fixed.subtract(left, right, precision).value).toEqual(expected)
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
		expect(isoly.Fixed.add(term0, term1, 2).add(term2).add(term3).value).toEqual(expected)
	)
	it.each([[13.37, 1, 13.4]] as const)("create(%s, %s).toJSON() == %s", (value, precision, expected) =>
		expect(isoly.Fixed.create(value, precision).toJSON()).toBe(expected)
	)
})
