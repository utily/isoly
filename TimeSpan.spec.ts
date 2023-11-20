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
		expect(isoly.TimeSpan.subtract(minuend, ...subtrahends)).toEqual({ seconds: -10 })
		const result = isoly.TimeSpan.subtract({ hours: 8 }, { hours: 6.4 })
		expect(result).toEqual({ hours: 1, minutes: 36 })
	})
	it("fromMilliseconds", () => {
		const milliseconds = 1234560
		expect(isoly.TimeSpan.fromMilliseconds(milliseconds)).toEqual({
			minutes: 20,
			seconds: 34,
			milliseconds: 560,
		})
	})
	it("fromSeconds", () => {
		const seconds = 1234.56
		expect(isoly.TimeSpan.fromSeconds(seconds, { precision: "milliseconds" })).toEqual({
			minutes: 20,
			seconds: 34,
			milliseconds: 560,
		})
		expect(isoly.TimeSpan.fromSeconds(seconds * 2, { precision: "milliseconds" })).toEqual({
			minutes: 41,
			seconds: 9,
			milliseconds: 120,
		})
		expect(isoly.TimeSpan.fromSeconds(seconds, { precision: "seconds" })).toEqual({
			minutes: 20,
			seconds: 35,
		})
		expect(isoly.TimeSpan.fromSeconds(seconds * 2, { precision: "seconds" })).toEqual({
			minutes: 41,
			seconds: 9,
		})
	})
	it("fromMinutes", () => {
		const minutes = 20.576
		expect(isoly.TimeSpan.fromMinutes(minutes, { precision: "milliseconds" })).toEqual({
			minutes: 20,
			seconds: 34,
			milliseconds: 560,
		})
		expect(isoly.TimeSpan.fromMinutes(minutes * 2, { precision: "milliseconds" })).toEqual({
			minutes: 41,
			seconds: 9,
			milliseconds: 120,
		})
		expect(isoly.TimeSpan.fromMinutes(minutes, { precision: "seconds" })).toEqual({ minutes: 20, seconds: 35 })
		expect(isoly.TimeSpan.fromMinutes(minutes * 2, { precision: "seconds" })).toEqual({ minutes: 41, seconds: 9 })
		expect(isoly.TimeSpan.fromMinutes(minutes, { precision: "minutes" })).toEqual({ minutes: 21 })
		expect(isoly.TimeSpan.fromMinutes(minutes * 2, { precision: "minutes" })).toEqual({ minutes: 41 })
	})
	it("fromHours", () => {
		const hours = 0.34293333333333337
		expect(isoly.TimeSpan.fromHours(hours, { precision: "milliseconds" })).toEqual({
			minutes: 20,
			seconds: 34,
			milliseconds: 560,
		})
		expect(isoly.TimeSpan.fromHours(hours * 2, { precision: "milliseconds" })).toEqual({
			minutes: 41,
			seconds: 9,
			milliseconds: 120,
		})
		expect(isoly.TimeSpan.fromHours(hours, { precision: "seconds" })).toEqual({ minutes: 20, seconds: 35 })
		expect(isoly.TimeSpan.fromHours(hours * 2, { precision: "seconds" })).toEqual({ minutes: 41, seconds: 9 })
		expect(isoly.TimeSpan.fromHours(hours, { precision: "minutes" })).toEqual({ minutes: 21 })
		expect(isoly.TimeSpan.fromHours(hours * 2, { precision: "minutes" })).toEqual({ minutes: 41 })
		expect(isoly.TimeSpan.fromHours(hours * 2, { precision: "hours" })).toEqual({ hours: 1 })
		expect(isoly.TimeSpan.fromHours(6.4, { precision: "minutes" })).toEqual({ hours: 6, minutes: 24 })
		// handle bad floating point math
		// 6.4 - 4 == 2.4000000000000004
		expect(isoly.TimeSpan.fromHours(6.4 - 4, { precision: "milliseconds" })).toEqual({ hours: 2, minutes: 24 })
		// 6.4 - 4 - 0.4 ==  2.0000000000000004
		expect(isoly.TimeSpan.fromHours(6.4 - 4 - 0.4, { precision: "milliseconds" })).toEqual({ hours: 2 })
	})
})
