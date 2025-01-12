import { TimeZoneOffset } from "./TimeZoneOffset"

/** IANA format. Takes any time zone Stockholm, London and UTC is only examples. */
export type TimeZone = "Europe/Stockholm" | "Europe/London" | "UTC" | (string & Record<never, never>) // The Record<never...> makes autocomplete work in your IDE.
export namespace TimeZone {
	export function is(value: TimeZone | any): value is TimeZone {
		let result: boolean
		try {
			result =
				typeof value == "string" && !!new Intl.DateTimeFormat("en-GB", { timeZone: value }) && !TimeZoneOffset.is(value)
		} catch {
			result = false
		}
		return result
	}
}
