import { Alpha2 } from "./CountryCode"

export interface Address extends Partial<Record<"default" | Alpha2, object>> {
	default: {
		countryCode: Alpha2
		street: string
		zipCode: string
		city: string
		county?: string
		state?: string
	}
	GB: {
		countryCode: "GB"
		street: string
		building: string
		zipCode: string
		city: string
	}
	SE: {
		countryCode: "SE"
		street: string
		zipCode: string
		city: string
	}
}

export namespace Address {
	export type Default = Address["default"]
	export type GB = Address["GB"]
	export type SE = Address["SE"]
	export namespace Default {
		export function is(value: any | Default): value is Default {
			return (
				value &&
				typeof value == "object" &&
				value["street"] &&
				typeof value["street"] == "string" &&
				value["zipCode"] &&
				typeof value["zipCode"] == "string" &&
				value["city"] &&
				typeof value["city"] == "string" &&
				(!("county" in value) || typeof value["county"] == "string") &&
				(!("state" in value) || typeof value["state"] == "string") &&
				Alpha2.is(value["countryCode"]) &&
				Object.keys(value).every(key => ["street", "zipCode", "city", "countryCode", "county", "state"].includes(key))
			)
		}
	}
	export namespace GB {
		export function is(value: any | GB): value is GB {
			return (
				value &&
				typeof value == "object" &&
				value["street"] &&
				typeof value["street"] == "string" &&
				value["building"] &&
				typeof value["building"] == "string" &&
				value["zipCode"] &&
				typeof value["zipCode"] == "string" &&
				value["city"] &&
				typeof value["city"] == "string" &&
				value["countryCode"] == "GB" &&
				Object.keys(value).every(key => ["street", "building", "zipCode", "city", "countryCode"].includes(key))
			)
		}
	}
	export namespace SE {
		export function is(value: any | SE): value is SE {
			return (
				value &&
				typeof value == "object" &&
				value["street"] &&
				typeof value["street"] == "string" &&
				value["zipCode"] &&
				typeof value["zipCode"] == "string" &&
				value["city"] &&
				typeof value["city"] == "string" &&
				value["countryCode"] == "SE" &&
				Object.keys(value).every(key => ["street", "zipCode", "city", "countryCode"].includes(key))
			)
		}
	}
}
