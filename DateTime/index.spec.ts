import { isoly } from "../index"

describe("isoly.DateTime", () => {
	it.each([
		"1972-06-30T23:59:60", // leap second
		"1972-12-31T23:59:60", // leap second
		"2012-06-30T23:59:60Z", // leap second
		"2016-12-31T23:59:60Z", // leap second
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
		"2020-12-31T23:59:59.000Z",
		"2020-12-31T23:59:59.999Z",
		"2019-04-01T01:11:29.000+01:00",
	])("is(%s)", dateTime => expect(isoly.DateTime.is(dateTime)).toBe(true))
	it.each([
		undefined,
		"2016-12-31T11:59:60Z", // never leap second in the middle of the day
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
	])("is not %s", dateTime => expect(isoly.DateTime.is(dateTime)).toBe(false))
	it.each([
		// [new Date(Date.UTC(2016, 12, 31, 23, 59, 60)), "2016-12-31T23:59:60Z"],
		[new Date(Date.UTC(2020, 11, 31, 23, 59, 59)), "2020-12-31T23:59:59.000Z"],
	])("create(%s) == %s", (value, expected) => expect(isoly.DateTime.from(value)).toBe(expected))
	it.each([
		[123, "seconds", "1970-01-01T00:02:03Z"],
		[43200, "seconds", "1970-01-01T12:00:00Z"],
		[86400, "seconds", "1970-01-02T00:00:00Z"],
		[2764800, "seconds", "1970-02-02T00:00:00Z"],
		[1554076800, undefined, "2019-04-01T00:00:00Z"],
		[1577836800, undefined, "2020-01-01T00:00:00Z"],
		[1623758400, undefined, "2021-06-15T12:00:00Z"],
		[1672531200, undefined, "2023-01-01T00:00:00Z"],
		[19651, "days", "2023-10-21TZ"],
		[28296817, "minutes", "2023-10-20T13:37Z"],
		[1697809020, "seconds", "2023-10-20T13:37:00Z"],
		[1697809020, undefined, "2023-10-20T13:37:00Z"],
		[1697809020, "seconds", "2023-10-20T13:37:00Z"],
		[1697809020123, "milliseconds", "2023-10-20T13:37:00.123Z"],
	] as const)("create(%d, %s) == %s", (value, resolution, expected) =>
		expect(isoly.DateTime.from(value, resolution)).toBe(expected)
	)
	it.each([
		["2023-10-31T11:23:40.8Z", "2023-10-31T11:23:40.800Z"],
		["2023-10-31T11:23:40.81Z", "2023-10-31T11:23:40.810Z"],
		["2023-10-31T11:23:40Z", "2023-10-31T11:23:40Z"],
		["2023-10-31T11:23:40.000Z", "2023-10-31T11:23:40.000Z"],
		["2023-10-31T11:23:40.123678978Z", "2023-10-31T11:23:40.123Z"],
		["2023-10-31T11:23:40.223678978", "2023-10-31T11:23:40.223"],
	])("from(%s) == %s", (value, expected) => expect(isoly.DateTime.from(value)).toEqual(expected))
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
	] as const)("system(%s) == %s", (value, expected) => expect(isoly.DateTime.system(value)).toEqual(expected))
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
		["2019-04-01T00:00:00.000Z", undefined, 1554076800],
		["2020-01-01T00:00:00.000Z", undefined, 1577836800],
		["2021-06-15T12:00:00.000Z", undefined, 1623758400],
		["2022-12-31T23:59:59.999Z", undefined, 1672531200],
		["2023-10-20T13:37:00.000Z", "days", 19651],
		["2023-10-20T13:37:00.000Z", "minutes", 28296817],
		["2023-10-20T13:37:00.000Z", "seconds", 1697809020],
		["2023-10-20T13:37:00.000Z", undefined, 1697809020],
		["2023-10-20T13:37:00.123Z", "seconds", 1697809020],
		["2023-10-20T13:37:00.123Z", "milliseconds", 1697809020123],
		["2023-10-20T13:37:00.123456Z", "milliseconds", 1697809020123],
	] as const)("epoch(%s, %s) == %f", (value, resolution, expected) =>
		expect(isoly.DateTime.epoch(value, resolution)).toBe(expected)
	)
	// if (new Date(Date.UTC(2020, 11, 31, 23, 59, 59)).getTimezoneOffset() == -60) {
	// 	it("zero-pads localized", () =>
	// 		expect(isoly.DateTime.localize(new Date("4 Jul 2020 10:20:30 GMT"), "sv-SE")).toEqual("2020-07-04 12:20:30"))
	// 	const data = [
	// 		["20 Jul 2019 10:30:40 GMT+2", "10:30:40"],
	// 		["21 Jul 2019 10:30:50 GMT", "12:30:50"],
	// 	]
	// 	for (const date of data)
	// 		it("localize with locale " + date[0], () =>
	// 			expect(isoly.DateTime.localize(new Date(date[0]), "sv-SE").split(" ")[1]).toEqual(date[1])
	// 		)
	// 	for (const date of data)
	// 		it("localize without locale " + date[0], () =>
	// 			expect(isoly.DateTime.localize(new Date(date[0])).split(" ")[1]).toEqual(date[1])
	// 		)
	// 	it("localize DateTime with locale", () => {
	// 		expect(isoly.DateTime.localize("2020-12-31T23:59:59.000Z", "en-US")).toEqual("01/01/2021, 12:59:59 AM")
	// 	})

	// 	it("localize 2020-12-31T23:59Z to en-US", () => {
	// 		expect(isoly.DateTime.localize("2020-12-31T23:59Z", "en-US")).toEqual("01/01/2021, 12:59 AM")
	// 	})
	// 	it("localize 2020-12-31T23Z to en-US", () => {
	// 		expect(isoly.DateTime.localize("2020-12-31T23Z", "en-US")).toEqual("01/01/2021, 12 AM")
	// 	})
	// 	it('localize 2020-12-31T23:12Z to en-US { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }', () =>
	// 		expect(
	// 			isoly.DateTime.localize(
	// 				"2020-12-31T23:12Z",
	// 				{ month: "short", day: "numeric", hour: "numeric", minute: "numeric" },
	// 				"en-US"
	// 			)
	// 		).toEqual("Jan 1, 12:12 AM"))
	// 	it('localize 2020-12-31T23:12Z to de-DE { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }', () =>
	// 		expect(
	// 			isoly.DateTime.localize(
	// 				"2020-12-31T23:12Z",
	// 				{ month: "short", day: "numeric", hour: "numeric", minute: "numeric" },
	// 				"de-DE"
	// 			)
	// 		).toEqual("1. Jan., 00:12"))
	// 	it('localize 2020-12-01T23:02Z to se-SE { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }', () =>
	// 		expect(
	// 			isoly.DateTime.localize(
	// 				"2020-12-01T23:02Z",
	// 				{ month: "short", day: "numeric", hour: "numeric", minute: "numeric" },
	// 				"sv-SE"
	// 			)
	// 		).toEqual("2 dec. 00:02"))
	// 	it('localize 2020-12-01T22:02+01:00 to se-SE { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }', () =>
	// 		expect(
	// 			isoly.DateTime.localize(
	// 				"2020-06-01T22:02+05:00",
	// 				{ month: "short", day: "numeric", hour: "numeric", minute: "numeric" },
	// 				"en-GB"
	// 			)
	// 		).toEqual("1 Jun, 19:02"))
	// 	it("getDate", () =>
	// 		expect(isoly.DateTime.Numeric.parse("2020-12-31T23:59:59.000Z").date?.format()).toEqual("2020-12-31"))
	// 	it("getTime", () =>
	// 		expect(isoly.DateTime.Numeric.parse("2020-12-31T23:59:59.000Z").time?.format()).toEqual("23:59:59.000"))
	// 	it('getYear("2020-12-31T23:59:59.000Z", %o) == %d', () =>
	// 		expect(isoly.DateTime.Numeric.parse("2020-12-31T23:59:59.000Z").years).toEqual(2020))
	// 	it("getMonth", () => expect(isoly.DateTime.Numeric.parse("2020-12-31T23:59:59.000Z").months).toEqual(11))
	// 	it("getDay", () => expect(isoly.DateTime.Numeric.parse("2020-12-31T23:59:59.000Z").days).toEqual(30))
	// 	it("getHour", () => expect(isoly.DateTime.Numeric.parse("2020-12-31T23:59:59.000Z").hours).toEqual(23))
	// 	it("getMinute", () => expect(isoly.DateTime.Numeric.parse("2020-12-31T23:59:59.000Z").minutes).toEqual(59))
	// 	it("getSecond", () => expect(isoly.DateTime.Numeric.parse("2020-12-31T23:59:57.000Z").seconds).toEqual(57))
	// 	it("getMillisecond", () =>
	// 		expect(isoly.DateTime.Numeric.parse("2020-12-31T23:59:57.321Z").milliseconds).toEqual(321))
	// 	it.each([
	// 		["1337-04-20TZ", "days"],
	// 		["1337-04-20T13Z", "hours"],
	// 		["1337-04-20T13:37Z", "minutes"],
	// 		["1337-04-20T13:37:42Z", "seconds"],
	// 		["1337-04-20T13:37:42.137Z", "milliseconds"],
	// 	] as const)("precision(%s) == %s", (value, expected) => expect(isoly.DateTime.precision(value)).toBe(expected))
	// 	it.each([
	// 		["days", "2020-12-31TZ"],
	// 		["hours", "2020-12-31T23Z"],
	// 		["minutes", "2020-12-31T23:59Z"],
	// 		["seconds", "2020-12-31T23:59:59Z"],
	// 		["milliseconds", "2020-12-31T23:59:59.123Z"],
	// 	] as const)("truncate(%s) == %s", (precision, expected) =>
	// 		expect(isoly.DateTime.truncate("2020-12-31T23:59:59.123Z", precision)).toBe(expected)
	// 	)
	// 	it("span", () =>
	// 		expect(isoly.DateTime.span("2013-01-19T22:01:20.000Z", "2023-03-20T00:00:0.003Z")).toEqual({
	// 			years: -10,
	// 			months: -2,
	// 			days: -1,
	// 			hours: 22,
	// 			minutes: 1,
	// 			seconds: 20,
	// 			milliseconds: -3,
	// 		}))
	// 	it("invert leap second", () => {
	// 		expect(isoly.DateTime.invert("2013-01-19T22:01:61.070Z")).toEqual("7986-12-13T02:59:-1.929Z")
	// 		expect(isoly.DateTime.invert("7986-12-13T02:59:-1.929Z")).toEqual("2013-01-19T22:01:61.070Z")
	// 	})
	// 	it("invert", () => {
	// 		expect(isoly.DateTime.invert("2013-01-19T22:01:20:070Z")).toEqual("7986-12-13T02:59:40.929Z")
	// 		expect(isoly.DateTime.invert("7986-12-13T02:59:40:929Z")).toEqual("2013-01-19T22:01:20.070Z")
	// 	})
	// 	it("invert consecutive", () => {
	// 		expect(
	// 			isoly.DateTime.invert("2013-01-19T22:01:20.000Z") > isoly.DateTime.invert("2013-01-19T22:01:20.001Z")
	// 		).toEqual(true)
	// 		expect(
	// 			isoly.DateTime.invert("1999-12-31T23:59:59.999Z") > isoly.DateTime.invert("2000-01-01T00:00:00.000Z")
	// 		).toEqual(true)
	// 	})
	// } // end of time zone
	it.each([
		["2023-10-20T13:37:00.000Z", { months: -8 }, "2023-02-20T13:37:00.000Z"],
		["2023-03-25T00:30:00.000Z", { months: 1 }, "2023-04-25T00:30:00.000Z"],
		["2023-03-26T00:30:00.000Z", { months: 1 }, "2023-04-26T00:30:00.000Z"],
		["2023-03-26T01:30:00.000Z", { months: 1 }, "2023-04-26T01:30:00.000Z"],
		["2023-03-26T02:30:00.000Z", { months: 1 }, "2023-04-26T02:30:00.000Z"],
		["2023-03-26T03:30:00.000Z", { months: 1 }, "2023-04-26T03:30:00.000Z"],
		["2023-10-20T13:37:00.000Z", { milliseconds: 10 }, "2023-10-20T13:37:00.010Z"],
		["2023-03-26T01:30:00.000Z", { milliseconds: 24 * 60 * 60 * 1000 }, "2023-03-27T01:30:00.000Z"],
		["2023-03-26T02:30:00.000Z", { milliseconds: 24 * 60 * 60 * 1000 }, "2023-03-27T02:30:00.000Z"],
		["2023-10-20T13:37:00.000Z", { seconds: 10 }, "2023-10-20T13:37:10.000Z"],
		["2023-03-26T01:30:00.000Z", { seconds: 24 * 60 * 60 }, "2023-03-27T01:30:00.000Z"],
		["2023-03-26T02:30:00.000Z", { seconds: 24 * 60 * 60 }, "2023-03-27T02:30:00.000Z"],
		["2023-10-20T13:37:00.000Z", { days: 10 }, "2023-10-30T13:37:00.000Z"],
		["2023-10-29T13:37:00.000Z", { hours: 24 }, "2023-10-30T13:37:00.000Z"],
		["2023-03-25T01:30:00.000Z", { days: 1 }, "2023-03-26T01:30:00.000Z"],
		["2023-03-25T02:30:00.000Z", { days: 1 }, "2023-03-26T02:30:00.000Z"],
		["2023-03-25T02:30:00.000+01:00", { days: 1 }, "2023-03-26T02:30:00.000+01:00"],
		["2023-03-26T00:30:00.000Z", { minutes: 1440 }, "2023-03-27T00:30:00.000Z"],
		["2023-03-25T02:30:00.000Z", { minutes: 1440 }, "2023-03-26T02:30:00.000Z"],
		["2023-03-26T00:30:00.000+01:00", { minutes: 1440 }, "2023-03-27T00:30:00.000+01:00"],
		["2023-03-26T00:30:00.000Z", { hours: 24 }, "2023-03-27T00:30:00.000Z"],
		["2023-03-25T02:30:00.000Z", { hours: 24 }, "2023-03-26T02:30:00.000Z"],
		["2023-03-26T00:30:00.000+01:00", { hours: 24 }, "2023-03-27T00:30:00.000+01:00"],
		["2023-03-26T01:30:00.000Z", { years: 1 }, "2024-03-26T01:30:00.000Z"],
		["2023-03-26T01:30:00.000Z", { months: 1 }, "2023-04-26T01:30:00.000Z"],
		["2023-03-25T01:30:00.000Z", { days: 1 }, "2023-03-26T01:30:00.000Z"],
		["2023-03-25T02:30:00.000Z", { days: 1 }, "2023-03-26T02:30:00.000Z"],
		["2023-03-25T02:30:00.000+01:00", { days: 1 }, "2023-03-26T02:30:00.000+01:00"],
		["2023-03-26T00:30:00.000Z", { hours: 24 }, "2023-03-27T00:30:00.000Z"],
		["2023-03-25T02:30:00.000Z", { hours: 24 }, "2023-03-26T02:30:00.000Z"],
		["2023-03-26T00:30:00.000+01:00", { hours: 24 }, "2023-03-27T00:30:00.000+01:00"],
		["2023-03-26T00:30:00.000Z", { minutes: 24 * 60 }, "2023-03-27T00:30:00.000Z"],
		["2023-03-25T02:30:00.000Z", { minutes: 24 * 60 }, "2023-03-26T02:30:00.000Z"],
		["2023-03-26T00:30:00.000+01:00", { minutes: 24 * 60 }, "2023-03-27T00:30:00.000+01:00"],
	] as const)("next(%s, %s) == %s", (value, increment, expected) =>
		expect(isoly.DateTime.next(value, increment)).toEqual(expected)
	)
	it.each([
		["2020-01-01T00:00:00.100Z", { milliseconds: 200 }, "2019-12-31T23:59:59.900Z"],
		["2023-03-26T01:30:00.000Z", { years: 1 }, "2022-03-26T01:30:00.000Z"],
		["2023-03-26T01:30:00.000Z", { months: 1 }, "2023-02-26T01:30:00.000Z"],
		["2023-03-26T02:30:00.000Z", { days: 1 }, "2023-03-25T02:30:00.000Z"],
		["2023-03-25T02:30:00.000+01:00", { days: 1 }, "2023-03-24T02:30:00.000+01:00"],
		["2023-03-27T00:30:00.000Z", { hours: 24 }, "2023-03-26T00:30:00.000Z"],
		["2023-03-26T02:30:00.000Z", { hours: 24 }, "2023-03-25T02:30:00.000Z"],
		["2023-03-27T00:30:00.000+01:00", { hours: 24 }, "2023-03-26T00:30:00.000+01:00"],
		["2023-03-27T00:30:00.000Z", { minutes: 1440 }, "2023-03-26T00:30:00.000Z"],
		["2023-03-26T02:30:00.000Z", { minutes: 1440 }, "2023-03-25T02:30:00.000Z"],
		["2023-03-25T02:30:00.000+01:00", { minutes: 1440 }, "2023-03-24T02:30:00.000+01:00"],
	] as const)("previous(%s, %s) == %s", (value, decrement, expected) =>
		expect(isoly.DateTime.previous(value, decrement)).toEqual(expected)
	)
	// it.each([
	// 	[
	// 		"2023-05-15T23:03:23.004Z",
	// 		"2023-05-13T22:01:20.000Z",
	// 		"years",
	// 		{
	// 			years: 0,
	// 			months: 0,
	// 			days: 2,
	// 			hours: 1,
	// 			minutes: 2,
	// 			seconds: 3,
	// 			milliseconds: 4,
	// 		},
	// 	],
	// 	[
	// 		"2023-05-15T23:03:23.004Z",
	// 		"2023-05-15T22:01:20.000Z",
	// 		"hours",
	// 		{
	// 			hours: 1,
	// 			minutes: 2,
	// 			seconds: 3,
	// 			milliseconds: 4,
	// 		},
	// 	],
	// 	[
	// 		"2023-05-15T23:03:23.004Z",
	// 		"2023-05-15T22:01:20.000Z",
	// 		"minutes",
	// 		{
	// 			minutes: 62,
	// 			seconds: 3,
	// 			milliseconds: 4,
	// 		},
	// 	],
	// 	[
	// 		"2023-05-15T23:03:23.004Z",
	// 		"2023-05-15T22:01:20.000Z",
	// 		"seconds",
	// 		{
	// 			seconds: 3723,
	// 			milliseconds: 4,
	// 		},
	// 	],
	// 	[
	// 		"2023-05-15T23:03:23.004Z",
	// 		"2023-05-15T22:01:20.000Z",
	// 		"milliseconds",
	// 		{
	// 			milliseconds: 3723004,
	// 		},
	// 	],
	// 	[
	// 		"2023-05-15T23:03:23.004-01:00",
	// 		"2023-05-15T22:01:20.000+01:00",
	// 		"hours",
	// 		{
	// 			hours: 3,
	// 			minutes: 2,
	// 			seconds: 3,
	// 			milliseconds: 4,
	// 		},
	// 	],
	// 	[
	// 		"2023-05-15T22:01:20.000+01:00",
	// 		"2023-05-15T23:03:23.004-01:00",
	// 		"hours",
	// 		{
	// 			hours: -3,
	// 			minutes: -2,
	// 			seconds: -3,
	// 			milliseconds: -4,
	// 		},
	// 	],
	// 	[
	// 		"2023-05-15T09:50:00.004Z",
	// 		"2023-05-15T11:50:00.004+02:00",
	// 		"hours",
	// 		{
	// 			hours: 0,
	// 			minutes: 0,
	// 			seconds: 0,
	// 			milliseconds: 0,
	// 		},
	// 	],
	// 	[
	// 		"2023-05-15T09:50:00.004Z",
	// 		"2023-05-15T09:50:00.004+00:00",
	// 		"hours",
	// 		{
	// 			hours: 0,
	// 			minutes: 0,
	// 			seconds: 0,
	// 			milliseconds: 0,
	// 		},
	// 	],
	// ] as const)("span(%s, %s, %s) == %o", (start, end, unit, expected) =>
	// 	expect(isoly.DateTime.span(start, end, unit)).toEqual(expected)
	// )
	// it.each([
	// 	["2023-05-16T12:00:00", "Europe/Stockholm", "2023-05-16T12:00:00+02:00"],
	// 	["2023-01-16T12:00:00", "Europe/Stockholm", "2023-01-16T12:00:00+01:00"],
	// 	["2023-05-16T14:00:00", "Europe/London", "2023-05-16T14:00:00+01:00"],
	// 	["2023-01-16T14:00:00", "Europe/London", "2023-01-16T14:00:00+00:00"],
	// 	["2023-01-16T14:00:00", "Asia/Kolkata", "2023-01-16T14:00:00+05:30"],
	// 	["2023-01-16T14:00:00", "America/New_York", "2023-01-16T14:00:00-05:00"],
	// ] as const)("fromLocal(%s, %s) == %s", (localDateTime, timeZone, expected) =>
	// 	expect(isoly.DateTime.fromLocal(localDateTime, timeZone)).toEqual(expected)
	// )
	it.each([
		["2023-10-31T11:23:40.8Z", "2023-10-31T11:23:40.800Z"],
		["2023-10-31T11:23:40.81Z", "2023-10-31T11:23:40.810Z"],
		["2023-10-31T11:23:40Z", "2023-10-31T11:23:40Z"],
		["2023-10-31T11:23:40.000Z", "2023-10-31T11:23:40.000Z"],
	])("from(%s) == %s", (input, expected) => expect(isoly.DateTime.from(input)).toEqual(expected))
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
