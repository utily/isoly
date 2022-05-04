import * as isoly from "./index"

describe("DateTime", () => {
	it("create + is", () => {
		const d = isoly.DateTime.create(new Date(Date.UTC(2020, 11, 31, 23, 59, 59)))
		expect(isoly.DateTime.is(d)).toEqual(true)
		expect(d).toBe("2020-12-31T23:59:59.000Z")
	})
	it("epoch", () => {
		expect(isoly.DateTime.epoch("2019-04-01T00:00:00.000Z")).toBe(1554076800)
	})
	if (new Date(Date.UTC(2020, 11, 31, 23, 59, 59)).getTimezoneOffset() == -60) {
		it("zero-pads localized", () => {
			expect(isoly.DateTime.localize(new Date("4 Jul 2020 10:20:30 GMT"), "sv-SE")).toEqual("2020-07-04 12:20:30")
		})
		const data = [
			["20 Jul 2019 10:30:40 GMT+2", "10:30:40"],
			["21 Jul 2019 10:30:50 GMT", "12:30:50"],
		]
		for (const date of data)
			it("localize with locale " + date[0], () =>
				expect(isoly.DateTime.localize(new Date(date[0]), "sv-SE").split(" ")[1]).toEqual(date[1])
			)

		for (const date of data)
			it("localize without locale " + date[0], () =>
				expect(isoly.DateTime.localize(new Date(date[0])).split(" ")[1]).toEqual(date[1])
			)

		it("localize DateTime with locale", () => {
			expect(isoly.DateTime.localize("2020-12-31T23:59:59.000Z", "en-US")).toEqual("01/01/2021, 12:59:59 AM")
		})
		it("getDate", () => {
			expect(isoly.DateTime.getDate("2020-12-31T23:59:59.000Z")).toEqual("2020-12-31")
		})
		it("getTime", () => {
			expect(isoly.DateTime.getTime("2020-12-31T23:59:59.000Z")).toEqual("23:59:59.000Z")
		})
		it("getYear", () => {
			expect(isoly.DateTime.getYear("2020-12-31T23:59:59.000Z")).toEqual(2020)
		})
		it("getMonth", () => {
			expect(isoly.DateTime.getMonth("2020-12-31T23:59:59.000Z")).toEqual(12)
		})
		it("getDay", () => {
			expect(isoly.DateTime.getDay("2020-12-31T23:59:59.000Z")).toEqual(31)
		})
		it("getHour", () => {
			expect(isoly.DateTime.getHour("2020-12-31T23:59:59.000Z")).toEqual(23)
		})
		it("getMinute", () => {
			expect(isoly.DateTime.getMinute("2020-12-31T23:59:59.000Z")).toEqual(59)
		})
		it("getSecond", () => {
			expect(isoly.DateTime.getSecond("2020-12-31T23:59:57.000Z")).toEqual(57)
		})
	}
})
