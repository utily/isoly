import * as model from "."

describe("DateTime", () => {
	const data = [
		["20 Jul 2019 10:30:40 GMT+2", "10:30:40"],
		["21 Jul 2019 10:30:50 GMT", "12:30:50"],
	]
	it("create + is", () => {
		const d = model.DateTime.create(new Date(Date.UTC(2020, 11, 31, 23, 59, 59)))
		expect(model.DateTime.is(d))
		expect(d).toBe("2020-12-31T23:59:59.000Z")
	})
	it("localize with locale", () => {
		for (const date of data) {
			expect(model.DateTime.localize(new Date(date[0]), "sv-SE").split(" ")[1]).toEqual(date[1])
		}
	})
	it.skip("localize without locale", () => {
		for (const date of data) {
			expect(model.DateTime.localize(new Date(date[0])).split(" ")[1]).toEqual(date[1])
		}
	})
})
