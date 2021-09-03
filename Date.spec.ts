import * as model from "./index"

describe("Date", () => {
	it("create + is", () => {
		const d = model.Date.create(new Date(Date.UTC(2020, 11, 31, 23, 59, 59)))
		expect(model.Date.is(d))
		expect(d).toBe('2020-12-31')
	})
	it("next", () => {
		expect(model.Date.next("2001-01-01")).toEqual("2001-01-02")
		expect(model.Date.next("2001-01-01", 90)).toEqual("2001-03-31")
		expect(model.Date.next("2001-01-01", { years: 1, months: 1, days: 1 })).toEqual("2002-02-02")
	})
	it("previous", () => {
		expect(model.Date.previous("2001-01-01")).toEqual("2000-12-31")
		expect(model.Date.previous("2001-01-01", 10)).toEqual("2000-12-22")
		expect(model.Date.previous("2012-12-10", { years: 10, months: 12, days: 1 })).toEqual("2001-12-09")
	})
	it("nextMonth", () => {
		expect(model.Date.nextMonth("2001-12-01")).toEqual("2002-01-01")
		expect(model.Date.nextMonth("2021-03-31", 90)).toEqual("2028-10-01")
	})
	it("previousMonth", () => {
		expect(model.Date.previousMonth("2001-01-01")).toEqual("2000-12-01")
		expect(model.Date.previousMonth("2028-03-31")).toEqual("2028-03-02")
	})
	it("nextYear", () => {
		expect(model.Date.nextYear("2001-12-01")).toEqual("2002-12-01")
		expect(model.Date.nextYear("2002-02-01", 90)).toEqual("2092-02-01")
	})
	it("previousYear", () => {
		expect(model.Date.previousYear("2001-01-01")).toEqual("2000-01-01")
		expect(model.Date.previousYear("2001-03-01", 10)).toEqual("1991-03-01")
	})
	it("firstOfMonth", () => {
		expect(model.Date.firstOfMonth("2002-12-21")).toEqual("2002-12-01")
		expect(model.Date.firstOfMonth("2021-02-01")).toEqual("2021-02-01")
	})
	it("lastOfMonth", () => {
		expect(model.Date.lastOfMonth("2001-01-01")).toEqual("2001-01-30")
		expect(model.Date.lastOfMonth("2001-12-24")).toEqual("2001-12-30")
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
