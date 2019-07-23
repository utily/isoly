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
		expect(model.DateTime.localize(date, "sv-SE", localeOptions)).toEqual("2019-7-20 10:30:40 AM") // Node gives this result. Chrome gives "2019-07-20 10:30:40"
		expect(model.DateTime.localize(date2, "sv-SE", localeOptions)).toEqual("2019-7-21 12:30:50 PM") // Node gives this result. Chrome gives "2019-07-21 12:30:50"
	})
	it("localize withough argument", () => {
		const date = new Date("20 Jul 2019 10:30:40 GMT+2")
		const date2 = new Date("21 Jul 2019 10:30:41 GMT")
		expect(model.DateTime.localize(date)).toEqual("2019-7-20 10:30:40 AM") // Node gives this result. Chrome gives "2019-07-20 10:30:40"
		expect(model.DateTime.localize(date2)).toEqual("2019-7-21 12:30:41 PM") // Node gives this result. Chrome gives "2019-07-21 12:30:41"
	})
})
