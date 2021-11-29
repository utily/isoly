import { isoly } from "./index"

describe("Currency", () => {
	it("undefined", () => {
		expect(isoly.Currency.is(undefined)).toBeFalsy()
	})
	it("check types array", () => {
		expect(isoly.Currency.types.every(c => isoly.Currency.is(c))).toBeTruthy()
		expect(isoly.Currency.is("SEK")).toBeTruthy()
		expect(isoly.Currency.is("ZZZ")).toBeFalsy()
	})
	it("round", () => {
		expect(isoly.Currency.round(0.004755520000000001, "SEK")).toEqual(0)
		expect(isoly.Currency.round(0.004999920000000001, "SEK")).toEqual(0)
		expect(isoly.Currency.round(17999.204999999998, "SEK")).toEqual(17999.21) //correct
		expect(isoly.Currency.round(0.005, "SEK")).toEqual(0.01)
		expect(isoly.Currency.round(0.0049, "SEK")).toEqual(0.0)
		expect(isoly.Currency.round(0.00499, "SEK")).toEqual(0.0)
		expect(isoly.Currency.round(0.004999, "SEK")).toEqual(0.0)
		expect(isoly.Currency.round(0.0049999, "SEK")).toEqual(0.0)
		expect(isoly.Currency.round(0.00499999, "SEK")).toEqual(0.0)
		expect(isoly.Currency.round(0.004999999, "SEK")).toEqual(0.01)
		expect(isoly.Currency.round(0.004999981, "SEK")).toEqual(0.0)
		expect(isoly.Currency.round(0.575, "EUR")).toEqual(0.58)
		expect(isoly.Currency.round(0.855, "EUR")).toEqual(0.86)
		expect(isoly.Currency.round(0.565, "EUR")).toEqual(0.57)
		expect(isoly.Currency.round(0.055, "EUR")).toEqual(0.06)
	})

	it("add", () => {
		expect(95.385 + 18.114 + 0.001).toEqual(113.50000000000001) //should be 113.5
		expect(isoly.Currency.add("ISK", 95.385 + 18.114, 0.001)).toEqual(113)
		expect(isoly.Currency.add("SEK", 95.385 + 18.114, 0.001)).toEqual(113.5)
		expect(isoly.Currency.add("BHD", 95.385 + 18.114, 0.001)).toEqual(113.5)

		expect(4.3 + 0.1 + 0.1).toEqual(4.499999999999999) //should be 4.5
		expect(isoly.Currency.add("ISK", 0.1, 4.3 + 0.1)).toEqual(4)
		expect(isoly.Currency.add("SEK", 0.1, 4.3 + 0.1)).toEqual(4.5)
		expect(isoly.Currency.add("BHD", 0.1, 4.3 + 0.1)).toEqual(4.5)
	})

	it("divide", () => {
		expect(2.1 / 0.6).toEqual(3.5000000000000004) //should be 3.5
		expect(isoly.Currency.divide("ISK", 2.1, 0.6)).toEqual(3)
		expect(isoly.Currency.divide("SEK", 2.1, 0.6)).toEqual(3.5)
		expect(isoly.Currency.divide("BHD", 2.1, 0.6)).toEqual(3.5)

		expect(1.34 / 1.11).toEqual(1.207207207207207)
		expect(isoly.Currency.divide("ISK", 1.34, 1.11)).toEqual(1)
		expect(isoly.Currency.divide("SEK", 1.34, 1.11)).toEqual(1.21)
		expect(isoly.Currency.divide("BHD", 1.34, 1.11)).toEqual(1.207)

		expect(95.55 / 0.1).toEqual(955.4999999999999) //should be 955.5
		expect(isoly.Currency.divide("ISK", 95.55, 0.1)).toEqual(960)
		expect(isoly.Currency.divide("SEK", 95.55, 0.1)).toEqual(955.5)
		expect(isoly.Currency.divide("BHD", 95.55, 0.1)).toEqual(955.5)

		expect(isoly.Currency.divide("EUR", 57.5, 100)).toEqual(0.58)
	})

	it("multiply", () => {
		expect(2090.5 * 8.61).toEqual(17999.204999999998)
		expect(isoly.Currency.multiply("ISK", 2090.5, 8.61)).toEqual(18004)
		expect(isoly.Currency.multiply("SEK", 2090.5, 8.61)).toEqual(17999.21)
		expect(isoly.Currency.multiply("BHD", 2090.5, 8.61)).toEqual(17999.205)

		expect(50000 * 0.000001 * 1000).toEqual(49.99999999999999) //should be 50
		expect(isoly.Currency.multiply("ISK", 1000, 0.000001 * 50000)).toEqual(50)
		expect(isoly.Currency.multiply("SEK", 1000, 0.000001 * 50000)).toEqual(50)
		expect(isoly.Currency.multiply("BHD", 1000, 0.000001 * 50000)).toEqual(50)

		expect(0.000001 * 50000 * 10).toEqual(0.49999999999999994) //should be 0.5
		expect(isoly.Currency.multiply("ISK", 10, 0.000001 * 50000)).toEqual(1)
		expect(isoly.Currency.multiply("SEK", 10, 0.000001 * 50000)).toEqual(0.5)
		expect(isoly.Currency.multiply("BHD", 10, 0.000001 * 50000)).toEqual(0.5)

		expect(0.000001 * 50000).toEqual(0.049999999999999996) //should be 0.05
		expect(isoly.Currency.multiply("ISK", 50000, 0.000001)).toEqual(0)
		expect(isoly.Currency.multiply("SEK", 50000, 0.000001)).toEqual(0.05)
		expect(isoly.Currency.multiply("BHD", 50000, 0.000001)).toEqual(0.05)

		expect(0.1 * 1.5 * 10).toEqual(1.5000000000000002) //should be 1.5
		expect(isoly.Currency.multiply("ISK", 10, 0.1 * 1.5)).toEqual(2)
		expect(isoly.Currency.multiply("SEK", 10, 0.1 * 1.5)).toEqual(1.5)
		expect(isoly.Currency.multiply("BHD", 10, 0.1 * 1.5)).toEqual(1.5)

		expect(0.1 * 1.5).toEqual(0.15000000000000002) //should be 0.15
		expect(isoly.Currency.multiply("ISK", 0.1, 1.5)).toEqual(0)
		expect(isoly.Currency.multiply("SEK", 0.1, 1.5)).toEqual(0.15)
		expect(isoly.Currency.multiply("BHD", 0.1, 1.5)).toEqual(0.15)

		expect(0.1 * 1.5).toEqual(0.15000000000000002) //should be 0.15
		expect(isoly.Currency.multiply("SEK", 0.1, 1.5, "ISK")).toEqual(0)
		expect(isoly.Currency.multiply("SEK", 0.1, 1.5, "SEK")).toEqual(0.15)
		expect(isoly.Currency.multiply("SEK", 0.1, 1.5, "BHD")).toEqual(0.15)
	})
	it("subtract", () => {
		expect(1.4 - 0.9).toEqual(0.4999999999999999) //should be 0.5
		expect(isoly.Currency.subtract("ISK", 1.4, 0.9)).toEqual(0)
		expect(isoly.Currency.subtract("SEK", 1.4, 0.9)).toEqual(0.5)
		expect(isoly.Currency.subtract("BHD", 1.4, 0.9)).toEqual(0.5)

		expect(16.4 - 0.9).toEqual(15.499999999999998) //should be 15.5
		expect(isoly.Currency.subtract("ISK", 16.4, 0.9)).toEqual(15)
		expect(isoly.Currency.subtract("SEK", 16.4, 0.9)).toEqual(15.5)
		expect(isoly.Currency.subtract("BHD", 16.4, 0.9)).toEqual(15.5)

		expect(76.9 - 21.4).toEqual(55.50000000000001) //should be 55.5
		expect(isoly.Currency.subtract("ISK", 76.9, 21.4)).toEqual(56)
		expect(isoly.Currency.subtract("SEK", 76.9, 21.4)).toEqual(55.5)
		expect(isoly.Currency.subtract("BHD", 76.9, 21.4)).toEqual(55.5)
	})
	it("sum", () => {
		function addUp(amounts: number[]): number {
			return amounts.reduce((sum, amount) => isoly.Currency.add("EUR", amount, sum), 0)
		}
		expect(addUp([10.42, 3.01])).toEqual(13.43)
		expect(addUp([10.4, 3.03])).toEqual(13.43)
		expect(addUp([10.2, 3.03, 0.2])).toEqual(13.43)
		expect(addUp([9.81, 3.41, 0.21])).toEqual(13.43)
		expect(addUp([10.02, 3.2, 0.21])).toEqual(13.43)
		expect(addUp([5.01, 5.19, 3.03, 0.2])).toEqual(13.43)
		expect(addUp([0.11, 0.11, 0.11])).toEqual(0.33)
		expect(addUp([0.01, 0.08, 0.24])).toEqual(0.33)
		expect(addUp([0.13, 0.13, 0.11])).toEqual(0.37)
		expect(addUp([0.11, 0.09, 0.14])).toEqual(0.34)
		expect(addUp([0, 0.01, 0.56, 0.14])).toEqual(0.71)
		expect(addUp([-0.01, 0.02, 0.56, 0.14])).toEqual(0.71)
		expect(addUp([-0.01, 0.02, 0.55, 0.14])).toEqual(0.7)
	})
	it("toMinor", () => {
		expect(isoly.Currency.toMinor(0.004755520000000001, "SEK")).toEqual(0)
		expect(isoly.Currency.toMinor(0.004999920000000001, "SEK")).toEqual(0)
		expect(isoly.Currency.toMinor(0, "SEK")).toEqual(0)
		expect(isoly.Currency.toMinor(0.01, "SEK")).toEqual(1)
		expect(isoly.Currency.toMinor(0.02, "SEK")).toEqual(2)
		expect(isoly.Currency.toMinor(0.049, "SEK")).toEqual(5)
		expect(isoly.Currency.toMinor(0.0501, "SEK")).toEqual(5)
		expect(isoly.Currency.toMinor(3.05, "SEK")).toEqual(305)
		expect(isoly.Currency.toMinor(0.5, "SEK")).toEqual(50)
		expect(isoly.Currency.toMinor(0.2, "ISK")).toEqual(0)
		expect(isoly.Currency.toMinor(400.2, "ISK")).toEqual(400)
		expect(isoly.Currency.toMinor(400, "ISK")).toEqual(400)
		expect(isoly.Currency.toMinor(123.456, "XPT")).toEqual(123.456)
	})
	it("fromMinor", () => {
		expect(isoly.Currency.fromMinor(0, "SEK")).toEqual(0)
		expect(isoly.Currency.fromMinor(1, "SEK")).toEqual(0.01)
		expect(isoly.Currency.fromMinor(2, "SEK")).toEqual(0.02)
		expect(isoly.Currency.fromMinor(5, "SEK")).toEqual(0.05)
		expect(isoly.Currency.fromMinor(5, "SEK")).toEqual(0.05)
		expect(isoly.Currency.fromMinor(305, "SEK")).toEqual(3.05)
		expect(isoly.Currency.fromMinor(50, "SEK")).toEqual(0.5)
		expect(isoly.Currency.fromMinor(0, "ISK")).toEqual(0)
		expect(isoly.Currency.fromMinor(400, "ISK")).toEqual(400)
		expect(isoly.Currency.fromMinor(123.456, "XPT")).toEqual(123.456)
	})

	it("add", () => {
		expect(95.385 + 18.114 + 0.001).toEqual(113.50000000000001) //should be 113.5
		expect(Currency.add("ISK", 95.385 + 18.114, 0.001)).toEqual(114)
		expect(Currency.add("SEK", 95.385 + 18.114, 0.001)).toEqual(113.5)
		expect(Currency.add("BHD", 95.385 + 18.114, 0.001)).toEqual(113.5)

		expect(4.3 + 0.1 + 0.1).toEqual(4.499999999999999) //should be 4.5
		expect(Currency.add("ISK", 0.1, 4.3 + 0.1)).toEqual(4)
		expect(Currency.add("SEK", 0.1, 4.3 + 0.1)).toEqual(4.5)
		expect(Currency.add("BHD", 0.1, 4.3 + 0.1)).toEqual(4.5)
	})

	it("divide", () => {
		expect(2.1 / 0.6).toEqual(3.5000000000000004) //should be 3.5
		expect(Currency.divide("ISK", 2.1, 0.6)).toEqual(3)
		expect(Currency.divide("SEK", 2.1, 0.6)).toEqual(3.5)
		expect(Currency.divide("BHD", 2.1, 0.6)).toEqual(3.5)

		expect(1.34 / 1.11).toEqual(1.207207207207207)
		expect(Currency.divide("ISK", 1.34, 1.11)).toEqual(1)
		expect(Currency.divide("SEK", 1.34, 1.11)).toEqual(1.21)
		expect(Currency.divide("BHD", 1.34, 1.11)).toEqual(1.207)

		expect(95.55 / 0.1).toEqual(955.4999999999999) //should be 955.5
		expect(Currency.divide("ISK", 95.55, 0.1)).toEqual(960)
		expect(Currency.divide("SEK", 95.55, 0.1)).toEqual(955.5)
		expect(Currency.divide("BHD", 95.55, 0.1)).toEqual(955.5)
	})

	it("multiply", () => {
		expect(2090.5 * 8.61).toEqual(17999.204999999998)
		expect(Currency.multiply("SEK", 2090.5, 8.61)).toEqual(17999.21)
		expect(Currency.multiply("ISK", 2090.5, 8.61)).toEqual(18004)
		expect(Currency.multiply("BHD", 2090.5, 8.61)).toEqual(17999.205)

		expect(50000 * 0.000001 * 1000).toEqual(49.99999999999999) //should be 50
		expect(Currency.multiply("ISK", 1000, 0.000001 * 50000)).toEqual(50)
		expect(Currency.multiply("SEK", 1000, 0.000001 * 50000)).toEqual(50)
		expect(Currency.multiply("BHD", 1000, 0.000001 * 50000)).toEqual(50)

		expect(0.000001 * 50000 * 10).toEqual(0.49999999999999994) //should be 0.5
		expect(Currency.multiply("ISK", 10, 0.000001 * 50000)).toEqual(1)
		expect(Currency.multiply("SEK", 10, 0.000001 * 50000)).toEqual(0.5)
		expect(Currency.multiply("BHD", 10, 0.000001 * 50000)).toEqual(0.5)

		expect(0.000001 * 50000).toEqual(0.049999999999999996) //should be 0.05
		expect(Currency.multiply("ISK", 50000, 0.000001)).toEqual(0)
		expect(Currency.multiply("SEK", 50000, 0.000001)).toEqual(0.05)
		expect(Currency.multiply("BHD", 50000, 0.000001)).toEqual(0.05)

		expect(0.1 * 1.5 * 10).toEqual(1.5000000000000002) //should be 1.5
		expect(Currency.multiply("ISK", 10, 0.1 * 1.5)).toEqual(2)
		expect(Currency.multiply("SEK", 10, 0.1 * 1.5)).toEqual(1.5)
		expect(Currency.multiply("BHD", 10, 0.1 * 1.5)).toEqual(1.5)

		expect(0.1 * 1.5).toEqual(0.15000000000000002) //should be 0.15
		expect(Currency.multiply("ISK", 0.1, 1.5)).toEqual(0)
		expect(Currency.multiply("SEK", 0.1, 1.5)).toEqual(0.15)
		expect(Currency.multiply("BHD", 0.1, 1.5)).toEqual(0.15)

		expect(0.1 * 1.5).toEqual(0.15000000000000002) //should be 0.15
		expect(Currency.multiply("SEK", 0.1, 1.5, "ISK")).toEqual(0)
		expect(Currency.multiply("SEK", 0.1, 1.5, "SEK")).toEqual(0.15)
		expect(Currency.multiply("SEK", 0.1, 1.5, "BHD")).toEqual(0.15)
	})
	it("subtract", () => {
		expect(1.4 - 0.9).toEqual(0.4999999999999999) //should be 0.5
		expect(Currency.subtract("ISK", 1.4, 0.9)).toEqual(0)
		expect(Currency.subtract("SEK", 1.4, 0.9)).toEqual(0.5)
		expect(Currency.subtract("BHD", 1.4, 0.9)).toEqual(0.5)

		expect(16.4 - 0.9).toEqual(15.499999999999998) //should be 15.5
		expect(Currency.subtract("ISK", 16.4, 0.9)).toEqual(15)
		expect(Currency.subtract("SEK", 16.4, 0.9)).toEqual(15.5)
		expect(Currency.subtract("BHD", 16.4, 0.9)).toEqual(15.5)

		expect(76.9 - 21.4).toEqual(55.50000000000001) //should be 55.5
		expect(Currency.subtract("ISK", 76.9, 21.4)).toEqual(56)
		expect(Currency.subtract("SEK", 76.9, 21.4)).toEqual(55.5)
		expect(Currency.subtract("BHD", 76.9, 21.4)).toEqual(55.5)
	})
})
