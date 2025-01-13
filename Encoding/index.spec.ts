import { isoly } from "../index"

describe("Encoding", () => {
	const sample = "\n\r\t\b 0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyzÅÄÖåäöÜüß"
	it.each([
		["UTF-8", true],
		["UTF-16", true],
		["US-ASCII", false],
		["ISO-8859-1", true],
		["ISO 8859-1", false],
	])("is %s", (encoding, expected) => expect(isoly.Encoding.is(encoding)).toEqual(expected))
	it.each(["UTF-8", "ISO-8859-1"] as const)("encode %s ", encoding =>
		expect(isoly.Encoding.encode(encoding, sample)).toMatchSnapshot()
	)
	it.each(["UTF-8", "ISO-8859-1"] as const)("decode %s", encoding =>
		expect(isoly.Encoding.decode(encoding, isoly.Encoding.encode(encoding, sample))).toEqual(sample)
	)
	it.each(["UTF-8", "ISO-8859-1"] as const)("decode(%s, undefined)", encoding =>
		expect(isoly.Encoding.decode(encoding, undefined)).toEqual("")
	)
	it.each([
		["US-ASCII", "ASCII"],
		["ISO-IR-100", "ISO-8859-1"],
		["CSISOLATIN1", "ISO-8859-1"],
		["LATIN1", "ISO-8859-1"],
		["LATIN-1", "ISO-8859-1"],
		["L1", "ISO-8859-1"],
		["IBM819", "ISO-8859-1"],
		["CODE PAGE 28591", "ISO-8859-1"],
		["WINDOWS-28591", "ISO-8859-1"],
		["CODE PAGE 819", "ISO-8859-1"],
		["CP819", "ISO-8859-1"],
		["CCSID 819", "ISO-8859-1"],
		["WE8ISO8859P1", "ISO-8859-1"],
		["ISO 8859-1", "ISO-8859-1"],
		["US-ASCll", undefined],
		...isoly.Encoding.values.map(v => [v, v]),
	])("parse(%s)", (input, expected) => expect(isoly.Encoding.parse(input)).toEqual(expected))
})
