import * as timeZone from "timezone-mock"
import * as model from "./index"
import { DateTime } from "./DateTime"


describe("DateTime", () => {
	it("create + is", () => {
		const d = model.DateTime.create(new Date(Date.UTC(2020, 11, 31, 23, 59, 59)))
		expect(model.DateTime.is(d))
		expect(d).toBe("2020-12-31T23:59:59.000Z")
	})
	if (new Date(Date.UTC(2020, 11, 31, 23, 59, 59)).getTimezoneOffset() == -60) {
		it("zero-pads localized", () => {
			expect(model.DateTime.localize(new Date("4 Jul 2020 10:20:30 GMT"), "sv-SE")).toEqual("2020-07-04 12:20:30")
		})
		const data = [
			["20 Jul 2019 10:30:40 GMT+2", "10:30:40"],
			["21 Jul 2019 10:30:50 GMT", "12:30:50"],
		]
		for (const date of data)
			it("localize with locale " + date[0], () => expect(model.DateTime.localize(new Date(date[0]), "sv-SE").split(" ")[1]).toEqual(date[1]))

		for (const date of data)
			it("localize without locale " + date[0], () => expect(model.DateTime.localize(new Date(date[0])).split(" ")[1]).toEqual(date[1]))

		it("localize DateTime with locale", () => {
			expect(model.DateTime.localize("2020-12-31T23:59:59.000Z", "en-US")).toEqual("01/01/2021, 12:59:59 AM")
		})
	}
})
