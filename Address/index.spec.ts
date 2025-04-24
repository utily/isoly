import { isoly } from "../index"

describe("Address", () => {
	const defaultAddress: isoly.Address.Generic = {
		country: "AT",
		street: "Kaiserstrasse 1",
		zipCode: "5555",
		city: "Innsbruck",
	}
	const britishAddress: isoly.Address.GB = {
		country: "GB",
		building: "The Landing",
		street: "125 Redcliff St",
		zipCode: "BS1 6HU",
		city: "Bristol",
	}
	const swedishAddress: isoly.Address.SE = {
		country: "SE",
		street: "Kansliskrivargatan 19",
		zipCode: "75345",
		city: "Uppsala",
	}
	const badAddress = {
		country: "ÅL",
		street: "",
		zipCode: "",
		city: "",
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
		[defaultAddress, false],
		[britishAddress, false],
		[badAddress, false],
	])("Swedish %s", (address, expected) => expect(isoly.Address.SE.is(address)).toBe(expected))
})
