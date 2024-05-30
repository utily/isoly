import { isoly } from "../index"

describe("Address", () => {
	const defaultAddress: isoly.Address.Generic = {
		countryCode: "AT",
		street: "Kaiserstrasse 1",
		zipCode: "5555",
		city: "Innsbruck",
	}
	const britishAddress: isoly.Address.GB = {
		countryCode: "GB",
		building: "The Landing",
		street: "125 Redcliff St",
		zipCode: "BS1 6HU",
		city: "Bristol",
	}
	const swedishAddress: isoly.Address.SE = {
		countryCode: "SE",
		street: "Kansliskrivargatan 19",
		zipCode: "75345",
		city: "Uppsala",
	}
	const badAddress = {
		countryCode: "ÅL",
		street: "",
		zipCode: "",
		city: "",
	}
	it("Default", () => {
		expect(isoly.Address.Generic.is(defaultAddress)).toBeTruthy()
		expect(isoly.Address.Generic.is(britishAddress)).toBeTruthy()
		expect(isoly.Address.Generic.is(badAddress)).toBeFalsy()
	})
	it("British", () => {
		expect(isoly.Address.GB.is(britishAddress)).toBeTruthy()
		expect(isoly.Address.GB.is(defaultAddress)).toBeFalsy()
		expect(isoly.Address.GB.is(badAddress)).toBeFalsy()
	})
	it("Swedish", () => {
		expect(isoly.Address.SE.is(swedishAddress)).toBeTruthy()
		expect(isoly.Address.SE.is(britishAddress)).toBeFalsy()
		expect(isoly.Address.SE.is(badAddress)).toBeFalsy()
	})
})
