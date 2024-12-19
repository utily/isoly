import { isoly } from "./index"

describe("TimeZone", () => {
	it("Imports", () => {
		expect(isoly.TimeZone.is("Europe/Stockholm")).toBe(true)
		expect(isoly.TimeZone.is("Europe/Stockholm")).toBe(true)
	})
	it.each(isoly.TimeZone.values)("is %s", timeZone => expect(isoly.TimeZone.is(timeZone)).toBe(true))
	it.each(["GMT", "Europe/Göteborg", "+01:00", undefined, "timezone", "TZ", "Z", ""])("is not %s", timeZone =>
		expect(isoly.TimeZone.is(timeZone)).toBe(false)
	)
})
