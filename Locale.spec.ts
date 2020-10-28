import * as model from "./index"

describe("Locale", () => {
	const swedish = "sv-SE"
	const german = "de-DE"
	const unreal = "de-SE"
	it("is", () => {
		expect(model.Locale.is(swedish)).toEqual(true)
		expect(model.Locale.is(german)).toEqual(true)
		expect(model.Locale.is(unreal)).toEqual(false)
	})
	it("toAlpha2", () => {
		expect(model.Locale.toAlpha2(swedish)).toEqual("SE")
		expect(model.Locale.toAlpha2(german)).toEqual("DE")
	})
	it("toLanguage", () => {
		expect(model.Locale.toLanguage(swedish)).toEqual("sv")
		expect(model.Locale.toLanguage(german)).toEqual("de")
	})
	it("toLocale", () => {
		expect(model.Locale.toLocale("sv", "SE")).toEqual(swedish)
		expect(model.Locale.toLocale("de", "DE")).toEqual(german)
	})
})
