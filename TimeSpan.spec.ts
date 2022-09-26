import { TimeSpan } from "./TimeSpan"
describe("TimeSpan", () => {
	it("Timespan to Unit", () => {
		expect(TimeSpan.toMilliseconds({ hours: 0.75, minutes: 14, seconds: 59, milliseconds: 1000 })).toEqual(3600000)
		expect(TimeSpan.toMinutes({ hours: 1, minutes: 10, seconds: 44, milliseconds: 1000 })).toEqual(70.75)
		expect(TimeSpan.toSeconds({ hours: 0.75, minutes: 14, seconds: 59, milliseconds: 1000 })).toEqual(3600)
		expect(TimeSpan.toHours({ hours: 1, minutes: 14, seconds: 59, milliseconds: 1000 })).toEqual(1.25)
	})
	it("Timespan to Round Unit", () => {
		expect(TimeSpan.toMinutes({ hours: 1, minutes: 10, seconds: 50, milliseconds: 30 }, "round")).toEqual(71)
		expect(TimeSpan.toMinutes({ hours: 1, minutes: 10, seconds: 50, milliseconds: 30 }, "ceiling")).toEqual(71)
		expect(TimeSpan.toMinutes({ hours: 1, minutes: 10, seconds: 50, milliseconds: 30 }, "floor")).toEqual(70)
	})
	const hoursInDay = 24
	it("Days", () => {
		let days = 1
		expect(TimeSpan.toHours({ days })).toEqual(hoursInDay)
		days = 60
		expect(TimeSpan.toHours({ days })).toEqual(days * hoursInDay)
	})
	it("Months", () => {
		const daysInMonth = [31, 30, 29, 28]
		expect(daysInMonth.map(e => e * hoursInDay)).toContain(TimeSpan.toHours({ months: 1 }))
	})
	it("Years", () => {
		const daysInYear = [365, 366]
		expect(daysInYear.map(e => e * hoursInDay)).toContain(TimeSpan.toHours({ years: 1 }))
	})
})
