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
	it("add", () => {
		const value: isoly.TimeSpan = { hours: 8, minutes: 15 }
		const addend: isoly.TimeSpan = { minutes: 10, seconds: 17 }
		const result = isoly.TimeSpan.add(value, addend)
		expect(result).toEqual({ hours: 8, minutes: 25, seconds: 17 })
		expect(result).not.toBe(value)
		expect(result).not.toBe(addend)
		expect(isoly.TimeSpan.add({ hours: 8, minutes: 15 }, { minutes: -10, seconds: -17 })).toEqual({
			hours: 8,
			minutes: 5,
			seconds: -17,
		})
		expect(isoly.TimeSpan.add({ minutes: -10, seconds: -17 }, { hours: 8, minutes: 15 })).toEqual({
			hours: 8,
			minutes: 5,
			seconds: -17,
		})
	})
	it("subtract", () => {
		const minuend: isoly.TimeSpan = { hours: 8, minutes: 15 }
		const subtrahends: isoly.TimeSpan[] = [{ hours: 8 }, { minutes: 15, seconds: 10 }]
		expect(isoly.TimeSpan.subtract(minuend, ...subtrahends)).toEqual({ hours: 0, minutes: 0, seconds: -10 })
	})
})
