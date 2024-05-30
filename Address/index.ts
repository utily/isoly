import { isly } from "isly"
import { Alpha2 } from "../CountryCode"
import { GB as AddressGB } from "./GB"
import { Generic as AddressGeneric } from "./Generic"
import { SE as AddressSE } from "./SE"

export type Address = AddressGeneric | AddressGB | AddressSE

export namespace Address {
	export type Generic = AddressGeneric
	export const Generic = AddressGeneric
	export type GB = AddressGB
	export const GB = AddressGB
	export type SE = AddressSE
	export const SE = AddressSE
	export const type = isly.named("isoly.Address", isly.union<Address>(Generic.type, GB.type, SE.type))
}
