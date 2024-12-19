import { isoly } from "./index"

describe("DateTime", () => {
	it("undefined", () => {
		expect(isoly.DateTime.is(undefined)).toBeFalsy()
	})
	it("create + is", () => {
		const d = isoly.DateTime.create(new Date(Date.UTC(2020, 11, 31, 23, 59, 59)))
		expect(d).toBe("2020-12-31T23:59:59.000Z")
		expect(isoly.DateTime.is(d)).toEqual(true)
	})
	it.each([
		["2019-04-01T01", new Date(2019, 3, 1, 1)],
		["2019-04-01T01Z", new Date(Date.UTC(2019, 3, 1, 1))],
		["2019-04-01T01+01:00", new Date(Date.UTC(2019, 3, 1, 0))],
		["2019-04-01T01:11", new Date(2019, 3, 1, 1, 11)],
		["2019-04-01T01:11Z", new Date(Date.UTC(2019, 3, 1, 1, 11))],
		["2019-04-01T01:11+01:00", new Date(Date.UTC(2019, 3, 1, 0, 11))],
		["2019-04-01T01:11:29", new Date(2019, 3, 1, 1, 11, 29)],
		["2019-04-01T01:11:29Z", new Date(Date.UTC(2019, 3, 1, 1, 11, 29))],
		["2019-04-01T01:11:29+01:00", new Date(Date.UTC(2019, 3, 1, 0, 11, 29))],
		["2019-04-01T01:11:29.123", new Date(2019, 3, 1, 1, 11, 29, 123)],
		["2019-04-01T01:11:29.123Z", new Date(Date.UTC(2019, 3, 1, 1, 11, 29, 123))],
		["2020-12-31T23:59:59.999Z", new Date(Date.UTC(2020, 11, 31, 23, 59, 59, 999))],
		["2019-04-01T01:11:29.123+01:00", new Date(Date.UTC(2019, 3, 1, 0, 11, 29, 123))],
	])("parse %s", (dateTime, date) => expect(isoly.DateTime.parse(dateTime)).toEqual(date))
	it.each([
		["milliseconds", "2019-04-01T01:11:29.123+01:00", "2019-04-01T01:11:29.123+01:00"],
		["seconds", "2019-04-01T01:11:29+01:00", "2019-04-01T01:11:29.000+01:00"],
		["minutes", "2019-04-01T01:11+01:00", "2019-04-01T01:11:00.000+01:00"],
		["hours", "2019-04-01T01+01:00", "2019-04-01T01:00:00.000+01:00"],
	] as const)("truncate %s", (precision, expected, padded) => {
		const dateTime = "2019-04-01T01:11:29.123+01:00"
		const truncated = isoly.DateTime.truncate(dateTime, precision)
		expect(truncated).toEqual(expected)
		expect(isoly.DateTime.truncate(truncated, "milliseconds")).toEqual(padded)
	})
	it.each([
		"2019-04-01T01",
		"2019-04-01T01Z",
		"2019-04-01T01+01:00",
		"2019-04-01T01:11",
		"2019-04-01T01:11Z",
		"2019-04-01T01:11+01:00",
		"2019-04-01T01:11:29",
		"2019-04-01T01:11:29",
		"2019-04-01T01:11:29",
		"2019-04-01T01:11:29Z",
		"2019-04-01T01:11:29+01:00",
		"2019-04-01T01:11:29.000",
		"2019-04-01T01:11:29.000Z",
		"2020-12-31T23:59:59.999Z",
		"2019-04-01T01:11:29.000+01:00",
		"1972-06-30T23:59:60", // leap second
		"1972-12-31T23:59:60", // leap second
	])("is %s", dateTime => expect(isoly.DateTime.is(dateTime)).toEqual(true))
	it.each([
		"2019-04-01T1",
		"2019-04-01T01:Z",
		"2019-04-01T01+25:00",
		"2019-04-01T01:1",
		"2019-04-01T01:1Z",
		"2019-04-01T01:1+01:00",
		"2019-04-01T01:11:29:",
		"2019-04-01T01:11:29:Z",
		"2019-04-01T01:11:2+01:00",
		"2019-02-30T01:11:29.000",
		"2019-04-01T01:11:29.00Z",
		"2019-04-01T01:11:29.000+01:0",
		"2019-04-01T24",
		"2019-04-01T25Z",
		"2019-04-01TA0+01:00",
		"2019-04-01T01:60Z",
		"2019-04-01T01:11:63",
		"2019-04-01T01:99:29Z",
		"2019-04-01T01:11:63+01:00",
		"2019-04-01T01:11:63.000",
		"2020-13-01",
		"2020-12-32",
		"2020-02-30",
		"2020-04-31",
		"2020-04-01T24:00",
		"2020-04-01T23:60",
		"2020-04-01T23:59:63",
	])("is not %s", dateTime => expect(isoly.DateTime.is(dateTime)).toEqual(false))
	it("epoch", () => expect(isoly.DateTime.epoch("2019-04-01T00:00:00.000Z")).toBe(1554076800))
	if (new Date(Date.UTC(2020, 11, 31, 23, 59, 59)).getTimezoneOffset() == -60) {
		it("zero-pads localized", () =>
			expect(isoly.DateTime.localize(new Date("4 Jul 2020 10:20:30 GMT"), "sv-SE")).toEqual("2020-07-04 12:20:30"))
		const data = [
			["20 Jul 2019 10:30:40 GMT+2", "10:30:40"],
			["21 Jul 2019 10:30:50 GMT", "12:30:50"],
		]
		for (const date of data)
			it("localize with locale " + date[0], () =>
				expect(isoly.DateTime.localize(new Date(date[0]), "sv-SE").split(" ")[1]).toEqual(date[1])
			)
		for (const date of data)
			it("localize without locale " + date[0], () =>
				expect(isoly.DateTime.localize(new Date(date[0])).split(" ")[1]).toEqual(date[1])
			)
		it("localize DateTime with locale", () => {
			expect(isoly.DateTime.localize("2020-12-31T23:59:59.000Z", "en-US")).toEqual("01/01/2021, 12:59:59 AM")
		})

		it("localize 2020-12-31T23:59Z to en-US", () => {
			expect(isoly.DateTime.localize("2020-12-31T23:59Z", "en-US")).toEqual("01/01/2021, 12:59 AM")
		})
		it("localize 2020-12-31T23Z to en-US", () => {
			expect(isoly.DateTime.localize("2020-12-31T23Z", "en-US")).toEqual("01/01/2021, 12 AM")
		})
		it('localize 2020-12-31T23:12Z to en-US { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }', () =>
			expect(
				isoly.DateTime.localize(
					"2020-12-31T23:12Z",
					{ month: "short", day: "numeric", hour: "numeric", minute: "numeric" },
					"en-US"
				)
			).toEqual("Jan 1, 12:12 AM"))
		it('localize 2020-12-31T23:12Z to de-DE { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }', () =>
			expect(
				isoly.DateTime.localize(
					"2020-12-31T23:12Z",
					{ month: "short", day: "numeric", hour: "numeric", minute: "numeric" },
					"de-DE"
				)
			).toEqual("1. Jan., 00:12"))
		it('localize 2020-12-01T23:02Z to se-SE { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }', () =>
			expect(
				isoly.DateTime.localize(
					"2020-12-01T23:02Z",
					{ month: "short", day: "numeric", hour: "numeric", minute: "numeric" },
					"sv-SE"
				)
			).toEqual("2 dec. 00:02"))
		it('localize 2020-12-01T22:02+01:00 to se-SE { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }', () =>
			expect(
				isoly.DateTime.localize(
					"2020-06-01T22:02+05:00",
					{ month: "short", day: "numeric", hour: "numeric", minute: "numeric" },
					"en-GB"
				)
			).toEqual("1 Jun, 19:02"))
		it("getDate", () => expect(isoly.DateTime.getDate("2020-12-31T23:59:59.000Z")).toEqual("2020-12-31"))
		it("getTime", () => expect(isoly.DateTime.getTime("2020-12-31T23:59:59.000Z")).toEqual("23:59:59.000Z"))
		it("getYear", () => {
			expect(isoly.DateTime.getYear("2020-12-31T23:59:59.000Z")).toEqual(2020)
			expect(isoly.DateTime.getYear("2024-12-31T23:59:59.000Z", { digits: 4 })).toEqual(2024)
			expect(isoly.DateTime.getYear("2024-12-31T23:59:59.000Z", { digits: 2 })).toEqual(24)
		})
		it("getMonth", () => expect(isoly.DateTime.getMonth("2020-12-31T23:59:59.000Z")).toEqual(12))
		it("getDay", () => expect(isoly.DateTime.getDay("2020-12-31T23:59:59.000Z")).toEqual(31))
		it("getHour", () => expect(isoly.DateTime.getHour("2020-12-31T23:59:59.000Z")).toEqual(23))
		it("getMinute", () => expect(isoly.DateTime.getMinute("2020-12-31T23:59:59.000Z")).toEqual(59))
		it("getSecond", () => expect(isoly.DateTime.getSecond("2020-12-31T23:59:57.000Z")).toEqual(57))
		it("getMillisecond", () => expect(isoly.DateTime.getMillisecond("2020-12-31T23:59:57.321Z")).toEqual(321))
		it("precision minutes", () => {
			const minutes = isoly.DateTime.truncate("2020-12-31T23:59:59.123Z", "minutes")
			expect(minutes).toEqual("2020-12-31T23:59Z")
			expect(isoly.DateTime.is(minutes)).toEqual(true)
		})
		it("previousMillisecond", () =>
			expect(isoly.DateTime.previousMillisecond("2020-01-01T00:00:00.100Z", 200)).toEqual("2019-12-31T23:59:59.900Z"))
		it("span", () =>
			expect(isoly.DateTime.span("2013-01-19T22:01:20.000Z", "2023-03-20T00:00:0.003Z")).toEqual({
				years: -10,
				months: -2,
				days: -1,
				hours: 22,
				minutes: 1,
				seconds: 20,
				milliseconds: -3,
			}))
		it("invert leap second", () => {
			expect(isoly.DateTime.invert("2013-01-19T22:01:61.070Z")).toEqual("7986-12-13T02:59:-1.929Z")
			expect(isoly.DateTime.invert("7986-12-13T02:59:-1.929Z")).toEqual("2013-01-19T22:01:61.070Z")
		})
		it("invert", () => {
			expect(isoly.DateTime.invert("2013-01-19T22:01:20:070Z")).toEqual("7986-12-13T02:59:40.929Z")
			expect(isoly.DateTime.invert("7986-12-13T02:59:40:929Z")).toEqual("2013-01-19T22:01:20.070Z")
		})
		it("invert consecutive", () => {
			expect(
				isoly.DateTime.invert("2013-01-19T22:01:20.000Z") > isoly.DateTime.invert("2013-01-19T22:01:20.001Z")
			).toEqual(true)
			expect(
				isoly.DateTime.invert("1999-12-31T23:59:59.999Z") > isoly.DateTime.invert("2000-01-01T00:00:00.000Z")
			).toEqual(true)
		})
	}
	it("next month", () => {
		expect(isoly.DateTime.nextMonth("2023-10-20T13:37:00.000Z", -8)).toEqual("2023-02-20T13:37:00.000Z")
		expect(isoly.DateTime.nextMonth("2023-03-25T00:30:00.000Z", 1)).toEqual("2023-04-25T00:30:00.000Z")
		expect(isoly.DateTime.nextMonth("2023-03-26T00:30:00.000Z", 1)).toEqual("2023-04-26T00:30:00.000Z")
		expect(isoly.DateTime.nextMonth("2023-03-26T01:30:00.000Z", 1)).toEqual("2023-04-26T01:30:00.000Z")
		expect(isoly.DateTime.nextMonth("2023-03-26T02:30:00.000Z", 1)).toEqual("2023-04-26T02:30:00.000Z")
		expect(isoly.DateTime.nextMonth("2023-03-26T03:30:00.000Z", 1)).toEqual("2023-04-26T03:30:00.000Z")
	})
	it("next millisecond", () => {
		expect(isoly.DateTime.nextMillisecond("2023-10-20T13:37:00.000Z", 10)).toEqual("2023-10-20T13:37:00.010Z")
		expect(isoly.DateTime.nextMillisecond("2023-03-26T01:30:00.000Z", 24 * 60 * 60 * 1000)).toEqual(
			"2023-03-27T01:30:00.000Z"
		)
		expect(isoly.DateTime.nextMillisecond("2023-03-26T02:30:00.000Z", 24 * 60 * 60 * 1000)).toEqual(
			"2023-03-27T02:30:00.000Z"
		)
	})
	it("next second", () => {
		expect(isoly.DateTime.nextSecond("2023-10-20T13:37:00.000Z", 10)).toEqual("2023-10-20T13:37:10.000Z")
		expect(isoly.DateTime.nextSecond("2023-03-26T01:30:00.000Z", 24 * 60 * 60)).toEqual("2023-03-27T01:30:00.000Z")
		expect(isoly.DateTime.nextSecond("2023-03-26T02:30:00.000Z", 24 * 60 * 60)).toEqual("2023-03-27T02:30:00.000Z")
	})
	it("next day", () =>
		expect(isoly.DateTime.nextDay("2023-10-20T13:37:00.000Z", 10)).toEqual("2023-10-30T13:37:00.000Z"))
	it("next hour", () =>
		expect(isoly.DateTime.nextHour("2023-10-29T13:37:00.000Z", 24)).toEqual("2023-10-30T13:37:00.000Z"))
	it("span", () => {
		expect(isoly.DateTime.span("2023-05-15T23:03:23.004Z", "2023-05-13T22:01:20.000Z", "years")).toEqual({
			years: 0,
			months: 0,
			days: 2,
			hours: 1,
			minutes: 2,
			seconds: 3,
			milliseconds: 4,
		})
		expect(isoly.DateTime.span("2023-05-15T23:03:23.004Z", "2023-05-15T22:01:20.000Z", "hours")).toEqual({
			hours: 1,
			minutes: 2,
			seconds: 3,
			milliseconds: 4,
		})
		expect(isoly.DateTime.span("2023-05-15T23:03:23.004Z", "2023-05-15T22:01:20.000Z", "minutes")).toEqual({
			minutes: 62,
			seconds: 3,
			milliseconds: 4,
		})
		expect(isoly.DateTime.span("2023-05-15T23:03:23.004Z", "2023-05-15T22:01:20.000Z", "seconds")).toEqual({
			seconds: 3723,
			milliseconds: 4,
		})
		expect(isoly.DateTime.span("2023-05-15T23:03:23.004Z", "2023-05-15T22:01:20.000Z", "milliseconds")).toEqual({
			milliseconds: 3723004,
		})
		expect(isoly.DateTime.span("2023-05-15T23:03:23.004-01:00", "2023-05-15T22:01:20.000+01:00", "hours")).toEqual({
			hours: 3,
			minutes: 2,
			seconds: 3,
			milliseconds: 4,
		})
		expect(isoly.DateTime.span("2023-05-15T22:01:20.000+01:00", "2023-05-15T23:03:23.004-01:00", "hours")).toEqual({
			hours: -3,
			minutes: -2,
			seconds: -3,
			milliseconds: -4,
		})
		expect(isoly.DateTime.span("2023-05-15T09:50:00.004Z", "2023-05-15T11:50:00.004+02:00", "hours")).toEqual({
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		})
		expect(isoly.DateTime.span("2023-05-15T09:50:00.004Z", "2023-05-15T09:50:00.004+00:00", "hours")).toEqual({
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		})
	})
	it("fromLocalDateTime", () => {
		expect(isoly.DateTime.fromLocalDateTime("2023-05-16T12:00:00", "Europe/Stockholm")).toEqual(
			"2023-05-16T12:00:00+02:00"
		)
		expect(isoly.DateTime.fromLocalDateTime("2023-01-16T12:00:00", "Europe/Stockholm")).toEqual(
			"2023-01-16T12:00:00+01:00"
		)
		expect(isoly.DateTime.fromLocalDateTime("2023-05-16T14:00:00", "Europe/London")).toEqual(
			"2023-05-16T14:00:00+01:00"
		)
		expect(isoly.DateTime.fromLocalDateTime("2023-01-16T14:00:00", "Europe/London")).toEqual(
			"2023-01-16T14:00:00+00:00"
		)
	})
	it("check fixed nextX issues related to change to summer time", () => {
		expect(isoly.DateTime.nextDay("2023-03-25T01:30:00.000Z", 1)).toEqual("2023-03-26T01:30:00.000Z")
		expect(isoly.DateTime.nextMinute("2023-03-26T00:30:00.000Z", 24 * 60)).toEqual("2023-03-27T00:30:00.000Z")
		expect(isoly.DateTime.nextHour("2023-03-26T00:30:00.000Z", 24)).toEqual("2023-03-27T00:30:00.000Z")
		expect(isoly.DateTime.nextDay("2023-03-25T01:30:00.000Z", 1)).toEqual("2023-03-26T01:30:00.000Z")
		expect(isoly.DateTime.nextMinute("2023-03-25T02:30:00.000Z", 24 * 60)).toEqual("2023-03-26T02:30:00.000Z")
		expect(isoly.DateTime.nextHour("2023-03-25T02:30:00.000Z", 24)).toEqual("2023-03-26T02:30:00.000Z")
		expect(isoly.DateTime.nextDay("2023-03-25T02:30:00.000+01:00", 1)).toEqual("2023-03-26T01:30:00.000Z")
		expect(isoly.DateTime.nextMinute("2023-03-26T00:30:00.000+01:00", 24 * 60)).toEqual("2023-03-26T23:30:00.000Z")
		expect(isoly.DateTime.nextHour("2023-03-26T00:30:00.000+01:00", 24)).toEqual("2023-03-26T23:30:00.000Z")
	})
	it("fixIncorrect milliseconds", () => {
		expect(isoly.DateTime.fixIncorrect("2023-10-31T11:23:40.8Z")).toEqual("2023-10-31T11:23:40.800Z")
		expect(isoly.DateTime.fixIncorrect("2023-10-31T11:23:40.81Z")).toEqual("2023-10-31T11:23:40.810Z")
		expect(isoly.DateTime.fixIncorrect("2023-10-31T11:23:40Z")).toEqual("2023-10-31T11:23:40Z")
		expect(isoly.DateTime.fixIncorrect("2023-10-31T11:23:40.000Z")).toEqual("2023-10-31T11:23:40.000Z")
	})
	it.each([
		["2023-10-29", "2023-10-29T00:00:00.000Z", "2023-10-29T23:59:59.999Z"],
		["1993-05-11T15:07:40.430Z", "1993-05-11T00:00:00.000Z", "1993-05-11T23:59:59.999Z"],
		["2023-10-29T15:07:40.430+00:00", "2023-10-29T00:00:00.000+00:00", "2023-10-29T23:59:59.999+00:00"],
		["2023-10-29T15:07:40.430+01:00", "2023-10-29T00:00:00.000+01:00", "2023-10-29T23:59:59.999+01:00"],
		["2023-10-29T15:07:40.430+05:30", "2023-10-29T00:00:00.000+05:30", "2023-10-29T23:59:59.999+05:30"],
	])("startOfDay and endOfDay", (date: isoly.DateTime | isoly.Date, start: isoly.DateTime, end: isoly.DateTime) => {
		expect(isoly.DateTime.startOfDay(date)).toEqual(start)
		expect(isoly.DateTime.is(isoly.DateTime.startOfDay(date))).toBeTruthy()
		expect(isoly.DateTime.endOfDay(date)).toEqual(end)
		expect(isoly.DateTime.is(isoly.DateTime.endOfDay(date))).toBeTruthy()
	})
})
