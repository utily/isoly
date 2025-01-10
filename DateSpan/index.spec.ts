import { isoly } from "../index"

describe("DateSpan", () => {
	it("is", () => {
		expect(isoly.DateSpan.is({})).toEqual(true)
		expect(isoly.DateSpan.is({ days: 0.75, months: 14, years: 59 })).toEqual(true)
		expect(isoly.DateSpan.is({ days: "4" })).toEqual(false)
		expect(isoly.DateSpan.is([0.75, 14, 59, 1000])).toEqual(false)
		expect(isoly.DateSpan.is(null)).toEqual(false)
	})
})
