import * as model from "."

describe("DateTime", () => {
	it("create + is", () => {
		const d = model.DateTime.create(new Date(Date.UTC(2020, 11, 31, 23, 59, 59)))
		expect(model.DateTime.is(d))
		expect(d).toBe("2020-12-31T23:59:59.000Z")
	})
	it("localize with arguments", () => {
		const date = new Date("20 Jul 2019 10:30:40 GMT+2")
		const date2 = new Date("21 Jul 2019 10:30:50 GMT")
		const localeOptions = {
			year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric",
			timeZone: "Europe/Stockholm",
		}
		const localizedDate = model.DateTime.localize(date, "sv-SE", localeOptions)
		const localizedDate2 = model.DateTime.localize(date2, "sv-SE", localeOptions)
		expect(localizedDate.split(" ")[1]).toEqual("10:30:40") // The other parts don't work in node or the CI tests
		expect(localizedDate2.split(" ")[1]).toEqual("12:30:50")
	})
	it("localize without argument", () => {
		const date = new Date("20 Jul 2019 10:30:40 GMT+2")
		const date2 = new Date("21 Jul 2019 10:30:41 GMT")
		const localizedDate = model.DateTime.localize(date)
		const localizedDate2 = model.DateTime.localize(date2)
		expect(localizedDate.split(" ")[1]).toEqual("10:30:40") // The other parts don't work in node or the CI tests
		expect(localizedDate2.split(" ")[1]).toEqual("12:30:41")
	})
})
