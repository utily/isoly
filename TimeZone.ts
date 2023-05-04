/** IANA format. */
export type TimeZone = "Europe/Stockholm" | "Europe/London" | "UTC" | (string & Record<never, never>) // The Record<never...> makes autocomplete work in your IDE.
export namespace TimeZone {
	export function is(value: TimeZone | any): value is TimeZone {
		let result: boolean
		try {
			result = typeof value == "string" && !!new Intl.DateTimeFormat("en-GB", { timeZone: value })
		} catch (error) {
			result = false
		}
		return result
	}
}
