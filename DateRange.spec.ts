import { isoly } from "./index"

describe("DateRange", () => {
	it("create Date + Date", () =>
		expect(isoly.DateRange.create("2021-01-01", "2020-01-01")).toEqual({ start: "2020-01-01", end: "2021-01-01" }))
	it("create Date + DateSpan", () =>
		expect(isoly.DateRange.create("2001-01-01", { years: 1, months: 2, days: 3 })).toEqual({
			start: "2001-01-01",
			end: "2002-03-04",
		}))
	it("create Date - DateSpan", () =>
		expect(isoly.DateRange.create("2001-01-01", { years: -1, months: -1, days: -1 })).toEqual({
			start: "1999-11-30",
			end: "2001-01-01",
		}))
	it("toDates", () => {
		expect(isoly.DateRange.toDates({ start: "2022-04-30", end: "2022-05-10" })).toEqual([
			"2022-04-30",
			"2022-05-01",
			"2022-05-02",
			"2022-05-03",
			"2022-05-04",
			"2022-05-05",
			"2022-05-06",
			"2022-05-07",
			"2022-05-08",
			"2022-05-09",
			"2022-05-10",
		])
		expect(isoly.DateRange.toDates({ start: "2022-04-30", end: "2022-04-30" })).toEqual(["2022-04-30"])
		expect(isoly.DateRange.toDates({ start: "2022-05-20", end: "2022-04-30" })).toEqual([])
	})
	it("toDates don't includeLast", () => {
		expect(isoly.DateRange.toDates({ start: "2022-04-30", end: "2022-05-10" }, false)).toEqual([
			"2022-04-30",
			"2022-05-01",
			"2022-05-02",
			"2022-05-03",
			"2022-05-04",
			"2022-05-05",
			"2022-05-06",
			"2022-05-07",
			"2022-05-08",
			"2022-05-09",
		])
		expect(isoly.DateRange.toDates({ start: "2022-04-30", end: "2022-04-30" }, false)).toEqual([])
		expect(isoly.DateRange.toDates({ start: "2022-04-30", end: "2022-05-01" }, false)).toEqual(["2022-04-30"])
		expect(isoly.DateRange.toDates({ start: "2022-05-20", end: "2022-04-30" }, false)).toEqual([])
	})
	it("getDays", () => {
		expect(isoly.DateRange.getDays({ start: "2022-04-30", end: "2022-05-20" })).toEqual(20)
		expect(isoly.DateRange.getDays({ start: "2022-04-30", end: "2022-04-30" })).toEqual(0)
		expect(isoly.DateRange.getDays({ start: "2022-05-20", end: "2022-04-30" })).toEqual(-20)
	})
})
