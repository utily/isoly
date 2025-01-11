import { isoly } from "../index"

describe("Locale", () => {
	it.each([
		["sv-SE", true],
		["de-DE", true],
		["de-SE", false],
	] as const)("is %s == %s", (locale, expected) => expect(isoly.Locale.is(locale)).toEqual(expected))
	it.each([
		["sv-SE", "SE"],
		["de-DE", "DE"],
		["xx-XX" as any, undefined],
	] as const)("toAlpha2 %s == %s", (locale, expected) => expect(isoly.Locale.toAlpha2(locale)).toEqual(expected))
	it.each([
		["sv-SE", "sv"],
		["de-DE", "de"],
		["xx-XX" as any, undefined],
	] as const)("toLanguage %s == %s", (locale, expected) => expect(isoly.Locale.toLanguage(locale)).toEqual(expected))
	it.each([
		["sv", "SE", "sv-SE"],
		["de", "DE", "de-DE"],
		["de", "AT", "de-AT"],
		["en", undefined, "en-GB"],
		["sv", "DE", undefined],
	] as const)("toLocale(%s, %s) == %s", (language, country, expected) =>
		expect(isoly.Locale.toLocale(language, country)).toEqual(expected)
	)
})
