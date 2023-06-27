import * as isoly from "./index"

describe("Date", () => {
	it("undefined", () => {
		expect(isoly.Date.is(undefined)).toBeFalsy()
	})
	it("create + is", () => {
		const d = isoly.Date.create(new Date(Date.UTC(2020, 11, 31, 23, 59, 59)))
		expect(isoly.Date.is(d)).toEqual(true)
		expect(d).toBe("2020-12-31")
	})
	it("is not DateTime", () => {
		expect(isoly.Date.is("2020-12-31T23:59:59.000Z")).toEqual(false)
	})
	it("localize Date with locale", () => {
		expect(isoly.Date.localize("2020-12-31", "en-US")).toEqual("12/31/2020")
	})
	it("next day original test", () => {
		expect(isoly.Date.next("2001-01-01")).toEqual("2001-01-02")
		expect(isoly.Date.next("2001-01-01", 90)).toEqual("2001-04-01")
		expect(isoly.Date.next("2001-01-01", { years: 1, months: 1, days: 1 })).toEqual("2002-02-02")
	})
	it("next day bug check", () => {
		const result: isoly.Date[] = []
		for (let i = 1; i <= 90; i++)
			result.push(isoly.Date.next("2001-01-01", i))
		const nonUniqueDay: string | undefined = result.reduce<string | undefined>(
			(nonUnique, current, index, original) =>
				nonUnique != undefined
					? nonUnique
					: [...original.slice(0, index), ...original.slice(index + 1, original.length)].find(
							other => other == current
					  ),
			undefined
		)
		expect(nonUniqueDay).not.toEqual("2001-03-35")
		expect(nonUniqueDay).toBeUndefined()
		expect(isoly.Date.next("2001-01-01", 83) == isoly.Date.next("2001-01-01", 84)).toBeFalsy()
	})
	it("next DateSpan", () => {
		expect(isoly.Date.next("2001-01-01")).toEqual("2001-01-02")
		expect(isoly.Date.next("2001-01-01", 10)).toEqual("2001-01-11")
		expect(isoly.Date.next("2012-12-10", { years: 10, months: 12, days: 1 })).toEqual("2023-12-11")
		expect(
			isoly.Date.next("2022-03-10", {
				days: 18,
				months: -1,
				years: 0,
			})
		).toEqual("2022-02-28")
	})
	it("previous", () => {
		expect(isoly.Date.previous("2001-01-01")).toEqual("2000-12-31")
		expect(isoly.Date.previous("2001-01-01", 10)).toEqual("2000-12-22")
		expect(isoly.Date.previous("2012-12-10", { years: 10, months: 12, days: 1 })).toEqual("2001-12-09")
	})
	it("nextMonth", () => {
		expect(isoly.Date.nextMonth("2001-12-01")).toEqual("2002-01-01")
		expect(isoly.Date.nextMonth("2021-03-31", 90)).toEqual("2028-10-01")
	})
	it("previousMonth", () => {
		expect(isoly.Date.previousMonth("2001-01-01")).toEqual("2000-12-01")
		expect(isoly.Date.previousMonth("2028-03-31")).toEqual("2028-03-02")
	})
	it("nextYear", () => {
		expect(isoly.Date.nextYear("2001-12-01")).toEqual("2002-12-01")
		expect(isoly.Date.nextYear("2002-02-01", 90)).toEqual("2092-02-01")
	})
	it("previousYear", () => {
		expect(isoly.Date.previousYear("2001-01-01")).toEqual("2000-01-01")
		expect(isoly.Date.previousYear("2001-03-01", 10)).toEqual("1991-03-01")
	})
	it("firstOfYear", () => {
		expect(isoly.Date.firstOfYear("2021-05-27")).toEqual("2021-01-01")
		expect(isoly.Date.firstOfYear("2021-01-01")).toEqual("2021-01-01")
		expect(isoly.Date.firstOfYear("2021-12-31")).toEqual("2021-01-01")
		expect(isoly.Date.firstOfYear("2023-03-04")).toEqual("2023-01-01")
	})
	it("firstOfMonth", () => {
		expect(isoly.Date.firstOfMonth("2002-12-21")).toEqual("2002-12-01")
		expect(isoly.Date.firstOfMonth("2021-02-01")).toEqual("2021-02-01")
	})
	it("lastOfMonth", () => {
		expect(isoly.Date.lastOfMonth("2001-01-01")).toEqual("2001-01-31")
		expect(isoly.Date.lastOfMonth("2001-11-24")).toEqual("2001-11-30")
		expect(isoly.Date.lastOfMonth("2001-02-01")).toEqual("2001-02-28")
		expect(isoly.Date.lastOfMonth("2004-02-24")).toEqual("2004-02-29")
	})
	it("firstOfWeek", () => {
		expect(isoly.Date.firstOfWeek("2000-01-01")).toEqual("1999-12-27")
		expect(isoly.Date.firstOfWeek("2000-01-31")).toEqual("2000-01-31")
	})
	it("lastOfWeek", () => {
		expect(isoly.Date.lastOfWeek("2000-01-01")).toEqual("2000-01-02")
		expect(isoly.Date.lastOfWeek("2000-01-31")).toEqual("2000-02-06")
	})
	if (new Date(Date.UTC(2020, 11, 31, 23, 59, 59)).getTimezoneOffset() == -60) {
		it("zero-pads localized", () => {
			expect(isoly.Date.localize(new Date("4 Jul 2020 10:20:30 GMT"), "sv-SE")).toEqual("2020-07-04")
		})
		const data = [
			["20 Jul 2019 10:30:40 GMT+2", "2019-07-20"],
			["21 Jul 2019 10:30:50 GMT", "2019-07-21"],
		]
		for (const date of data)
			it("localize with locale " + date[0], () =>
				expect(isoly.Date.localize(new Date(date[0]), "sv-SE")).toEqual(date[1])
			)

		it("localize Date with locale", () => {
			expect(isoly.Date.localize("2020-12-31", "en-US")).toEqual("12/31/2020")
		})
	}
	it("getYear", () => {
		expect(isoly.DateTime.getYear("2020-12-31")).toEqual(2020)
	})
	it("getMonth", () => {
		expect(isoly.DateTime.getMonth("2020-12-31")).toEqual(12)
	})
	it("getDay", () => {
		expect(isoly.DateTime.getDay("2020-12-31")).toEqual(31)
	})
	it("getWeekDay", () => {
		expect(isoly.Date.getWeekDay("2022-05-02")).toEqual(1) // Monday
		expect(isoly.Date.getWeekDay("2022-05-03")).toEqual(2) // Tuesday
		expect(isoly.Date.getWeekDay("2022-05-04")).toEqual(3) // Wednesday
		expect(isoly.Date.getWeekDay("2022-05-05")).toEqual(4) // Thursday
		expect(isoly.Date.getWeekDay("2022-05-06")).toEqual(5) // Friday
		expect(isoly.Date.getWeekDay("2022-05-07")).toEqual(6) // Saturday
		expect(isoly.Date.getWeekDay("2022-05-08")).toEqual(0) // Sunday
	})
	it("nextWeekday", () => {
		expect(isoly.Date.nextWeekday("2022-05-04")).toEqual("2022-05-05") // Wednesday -> Thursday
		expect(isoly.Date.nextWeekday("2022-05-04", 2)).toEqual("2022-05-06") // Wednesday -> Friday
		expect(isoly.Date.nextWeekday("2022-05-04", 3)).toEqual("2022-05-09") // Wednesday -> Monday
		expect(isoly.Date.nextWeekday("2022-05-04", 4)).toEqual("2022-05-09") // Wednesday -> Monday
		expect(isoly.Date.nextWeekday("2022-05-04", 5)).toEqual("2022-05-09") // Wednesday -> Monday
		expect(isoly.Date.nextWeekday("2022-05-04", 6)).toEqual("2022-05-10") // Wednesday -> Tuesday
		expect(isoly.Date.nextWeekday("2023-11-30", 1, ["2023-12-01"])).toEqual("2023-12-04") // Thursday -> Monday
		expect(isoly.Date.nextWeekday("2023-11-30", 1, ["2023-12-01", "2023-12-04"])).toEqual("2023-12-05") // Thursday -> Tuesday
	})
	it("invalid date", () => {
		expect(isoly.Date.is("2020-13-31")).toEqual(false)
	})
	it("valid date", () => {
		expect(isoly.Date.is("2020-02-29")).toEqual(true)
	})
	it("invalid date", () => {
		expect(isoly.Date.is("2022-02-29")).toEqual(false)
	})
	it("span", () => {
		expect(isoly.Date.span("2022-02-28", "2022-03-10")).toEqual({
			days: 18,
			months: -1,
			years: 0,
		})
	})
})
