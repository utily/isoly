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
	const genericWithRegion: isoly.Address.Generic = {
		countryCode: "US",
		street: "525 Market St",
		zipCode: "94105",
		city: "San Francisco",
		state: "CA",
		county: "San Francisco",
	}
	it.each([
		[defaultAddress, true],
		[britishAddress, true],
		[badAddress, false],
	])("Default %s", (address, expected) => expect(isoly.Address.Generic.is(address)).toBe(expected))
	it.each([
		[defaultAddress, false],
		[britishAddress, true],
		[badAddress, false],
	])("British %s", (address, expected) => expect(isoly.Address.GB.is(address)).toBe(expected))
	it.each([
		[swedishAddress, true],
		[badAddress, false],
	])("Swedish %s", (address, expected) => expect(isoly.Address.SE.is(address)).toBe(expected))
	it.each([
		[genericWithRegion, true],
		[britishAddress, true],
	])("Generic with region %s", (address, expected) => expect(isoly.Address.Generic.is(address)).toBe(expected))
})
