import { isly } from "isly"
import { GB as AddressGB } from "./GB"
import { Generic as AddressGeneric } from "./Generic"
import { SE as AddressSE } from "./SE"

export type Address = AddressGeneric | AddressGB | AddressSE

export namespace Address {
	export import Generic = AddressGeneric
	export import GB = AddressGB
	export import SE = AddressSE
	export const type = isly.named("isoly.Address", isly.union<Address>(Generic.type, GB.type, SE.type))
}
