import { isoly } from "../../index"
describe("isoly.CountryCode.Name", () => {
	it.each([
		["Germany", "DE"],
		["France", "FR"],
		["United States of America", "US"],
		["Japan", "JP"],
		["Brazil", "BR"],
		["Unknown", undefined],
	] as const)("parse(%s) -> %s", (name, alpha2) => expect(isoly.CountryCode.Name.parse(name)).toEqual(alpha2))
	it.each(isoly.CountryCode.Name.languages)('from(%s, "DE")', language =>
		expect(isoly.CountryCode.Name.from(language, "DE")).toMatchSnapshot()
	)
	it.each(isoly.CountryCode.Name.languages)('from(%s, "SWE")', language =>
		expect(isoly.CountryCode.Name.from(language, "SWE")).toMatchSnapshot()
	)
	it.each(isoly.CountryCode.Name.languages)('from(%s, "XXX")', language =>
		expect(isoly.CountryCode.Name.from(language, "XXX" as any)).toBeUndefined()
	)
	it.each([
		["en", "DEU", "Germany"],
		["fr", "DEU", "Allemagne"],
		["es", "DEU", "Alemania"],
		["ja", "DEU", "ドイツ"],
		["zh", "DEU", "德国"],
	] as const)("from(%s, %s) -> %s", (language, alpha3, name) =>
		expect(isoly.CountryCode.Name.from(language, alpha3)).toBe(name)
	)
	it.each([
		["en", 276, "Germany"],
		["fr", 276, "Allemagne"],
		["es", 276, "Alemania"],
		["ja", 276, "ドイツ"],
		["zh", 276, "德国"],
	] as const)("from(%s, %s) -> %s", (language, numeric, countryName) =>
		expect(isoly.CountryCode.Name.from(language, numeric)).toBe(countryName)
	)
})
