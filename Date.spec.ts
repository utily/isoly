import * as model from "./index"

describe("Date", () => {
	it("create + is", () => {
		const d = model.Date.create(new Date(Date.UTC(2020, 11, 31, 23, 59, 59)))
		expect(model.Date.is(d))
		expect(d).toBe("2020-12-31")
	})
	it("next", () => {
		expect(model.Date.next("2001-01-01")).toEqual("2001-01-02")
		expect(model.Date.next("2001-01-01", 90)).toEqual("2001-03-31")
	})
	it("previous", () => {
		expect(model.Date.previous("2001-01-01")).toEqual("2000-12-31")
		expect(model.Date.previous("2001-01-01", 10)).toEqual("2000-12-22")
	})
	if (new Date(Date.UTC(2020, 11, 31, 23, 59, 59)).getTimezoneOffset() == -60) {
		it("zero-pads localized", () => {
			expect(model.Date.localize(new Date("4 Jul 2020 10:20:30 GMT"), "sv-SE")).toEqual("2020-07-04")
		})
		const data = [
			["20 Jul 2019 10:30:40 GMT+2", "2019-07-20"],
			["21 Jul 2019 10:30:50 GMT", "2019-07-21"],
		]
		for (const date of data)
			it("localize with locale " + date[0], () =>
				expect(model.Date.localize(new Date(date[0]), "sv-SE")).toEqual(date[1])
			)

		it("localize Date with locale", () => {
			expect(model.Date.localize("2020-12-31", "en-US")).toEqual("12/31/2020")
		})
	}
})
