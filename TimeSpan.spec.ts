import { isoly } from "./index"

describe("TimeSpan", () => {
	it("undefined", () => {
		expect(isoly.TimeSpan.is(undefined)).toBeFalsy()
	})
	it("TimeSpan to Unit", () => {
		expect(isoly.TimeSpan.toMilliseconds({ hours: 0.75, minutes: 14, seconds: 59, milliseconds: 1000 })).toEqual(
			3600000
		)
		expect(isoly.TimeSpan.toMinutes({ hours: 1, minutes: 10, seconds: 44, milliseconds: 1000 })).toEqual(70.75)
		expect(isoly.TimeSpan.toSeconds({ hours: 0.75, minutes: 14, seconds: 59, milliseconds: 1000 })).toEqual(3600)
		expect(isoly.TimeSpan.toHours({ hours: 1, minutes: 14, seconds: 59, milliseconds: 1000 })).toEqual(1.25)
	})
	it("TimeSpan to Round Unit", () => {
		expect(isoly.TimeSpan.toMinutes({ hours: 1, minutes: 10, seconds: 50, milliseconds: 30 }, "round")).toEqual(71)
		expect(isoly.TimeSpan.toMinutes({ hours: 1, minutes: 10, seconds: 50, milliseconds: 30 }, "ceiling")).toEqual(71)
		expect(isoly.TimeSpan.toMinutes({ hours: 1, minutes: 10, seconds: 50, milliseconds: 30 }, "floor")).toEqual(70)
	})
	const hoursInDay = 24
	it("Days", () => {
		let days = 1
		expect(isoly.TimeSpan.toHours({ days })).toEqual(hoursInDay)
		days = 60
		expect(isoly.TimeSpan.toHours({ days })).toEqual(days * hoursInDay)
	})
	it("Months", () => {
		const daysInMonth = [31, 30, 29, 28]
		expect(daysInMonth.map(e => e * hoursInDay)).toContain(isoly.TimeSpan.toHours({ months: 1 }))
	})
	it("Years", () => {
		const daysInYear = [365, 366]
		expect(daysInYear.map(e => e * hoursInDay)).toContain(isoly.TimeSpan.toHours({ years: 1 }))
	})
})
