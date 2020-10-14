import * as isoly from "../index"

describe("Encoding", () => {
	const sample = "\n\r\t\b 0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyzÅÄÖåäöÜüß"
	it("is", () => {
		expect(isoly.Encoding.is("UTF-8")).toEqual(true)
		expect(isoly.Encoding.is("UTF-16")).toEqual(true)
		expect(isoly.Encoding.is("US-ASCII")).toEqual(false)
		expect(isoly.Encoding.is("ISO-8859-1")).toEqual(true)
		expect(isoly.Encoding.is("ISO 8859-1")).toEqual(false)
	})
	for (const encoding of ["UTF-8", "ISO-8859-1"] as ["UTF-8", "ISO-8859-1"])
		it(encoding, () => {
			const encoded = isoly.Encoding.encode(encoding, sample)
			expect(encoded).toMatchSnapshot()
			expect(isoly.Encoding.decode(encoding, encoded)).toEqual(sample)
		})
})
