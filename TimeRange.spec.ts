import * as isoly from "./TimeRange"
describe("TimeRange", () => {
	it("undefined", () => {
		expect(isoly.TimeRange.is(undefined)).toBeFalsy()
	})
	it("create DateTime + DateTime", () => {
		expect(isoly.TimeRange.create("2021-01-01T00:00:00.000Z", "2021-01-01T13:37:42.000Z")).toEqual({
			start: "2021-01-01T00:00:00.000Z",
			end: "2021-01-01T13:37:42.000Z",
		})
	})
	it("create DateTime + TimeSpan", () => {
		expect(isoly.TimeRange.create("2021-01-01T00:00:00.000Z", { hours: 13, minutes: 37, seconds: 42 })).toEqual({
			start: "2021-01-01T00:00:00.000Z",
			end: "2021-01-01T13:37:42.000Z",
		})
	})
	it("create DateTime - TimeSpan", () => {
		expect(isoly.TimeRange.create("2021-01-01T00:00:00.000Z", { hours: -10, minutes: -22, seconds: -18 })).toEqual({
			start: "2020-12-31T13:37:42.000Z",
			end: "2021-01-01T00:00:00.000Z",
		})
	})
})
