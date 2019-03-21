import * as model from "."

describe("DateTime", () => {
	it("create + is", () => {
		const d = model.DateTime.create(new Date())
		expect(model.DateTime.is(d))
	})
})
