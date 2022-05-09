import * as isoly from "./index"

describe("Date", () => {
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
})
