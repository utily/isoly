import * as model from "./index"

describe("Encoding", () => {
	it("is", () => {
		expect(model.Encoding.is("UTF-8")).toEqual(true)
		expect(model.Encoding.is("UTF-16")).toEqual(true)
		expect(model.Encoding.is("US-ASCII")).toEqual(true)
		expect(model.Encoding.is("ISO-8859-1")).toEqual(true)
		expect(model.Encoding.is("ISO 8859-1")).toEqual(false)
	})
})
