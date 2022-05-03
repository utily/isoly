import { DateRange } from "./DateRange"
describe("DateRange", () => {
	it("create Date + Date", () => {
		expect(DateRange.create("2021-01-01", "2020-01-01")).toEqual({ start: "2020-01-01", end: "2021-01-01" })
	})
	it("create Date + DateSpan", () => {
		expect(DateRange.create("2001-01-01", { years: 1, months: 2, days: 3 })).toEqual({
			start: "2001-01-01",
			end: "2002-03-04",
		})
	})
	it("create Date - DateSpan", () => {
		expect(DateRange.create("2001-01-01", { years: -1, months: -1, days: -1 })).toEqual({
			start: "1999-11-30",
			end: "2001-01-01",
		})
	})
	it("getDays", () => {
		expect(DateRange.getDays({ start: "2022-04-30", end: "2022-05-20" })).toEqual(20)
		expect(DateRange.getDays({ start: "2022-04-30", end: "2022-04-30" })).toEqual(0)
		expect(DateRange.getDays({ start: "2022-05-20", end: "2022-04-30" })).toEqual(-20)
	})
})
