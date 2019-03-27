import * as model from "."

describe("DateTime", () => {
	it("create + is", () => {
		const d = model.DateTime.create(new Date(Date.UTC(2020, 11, 31, 23, 59, 59)))
		expect(model.DateTime.is(d))
		expect(d).toBe("2020-12-31T23:59:59.000Z")
	})
})
