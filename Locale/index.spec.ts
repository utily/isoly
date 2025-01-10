import { isoly } from "../index"

describe("Locale", () => {
	const swedish = "sv-SE"
	const german = "de-DE"
	const unreal = "de-SE"
	it("is", () => {
		expect(isoly.Locale.is(swedish)).toEqual(true)
		expect(isoly.Locale.is(german)).toEqual(true)
		expect(isoly.Locale.is(unreal)).toEqual(false)
	})
	it("toAlpha2", () => {
		expect(isoly.Locale.toAlpha2(swedish)).toEqual("SE")
		expect(isoly.Locale.toAlpha2(german)).toEqual("DE")
	})
	it("toLanguage", () => {
		expect(isoly.Locale.toLanguage(swedish)).toEqual("sv")
		expect(isoly.Locale.toLanguage(german)).toEqual("de")
	})
	it("toLocale", () => {
		expect(isoly.Locale.toLocale("sv", "SE")).toEqual(swedish)
		expect(isoly.Locale.toLocale("de", "DE")).toEqual(german)
	})
})
