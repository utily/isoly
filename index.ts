import { Address as _Address } from "./Address"
import { CallingCode as _CallingCode } from "./CallingCode"
import { CountryCode as _CountryCode } from "./CountryCode"
import { Currency as _Currency } from "./Currency"
import { Date as _Date } from "./Date"
import { DateRange as _DateRange } from "./DateRange"
import { DateSpan as _DateSpan } from "./DateSpan"
import { DateTime as _DateTime } from "./DateTime"
import { DayOfWeek as _DayOfWeek } from "./DayOfWeek"
import { Digit as _Digit } from "./Digit"
import { Encoding as _Encoding } from "./Encoding"
import { Fixed as _Fixed } from "./Fixed"
import { Language as _Language } from "./Language"
import { Locale as _Locale } from "./Locale"
import { Month as _Month } from "./Month"
import { Time as _Time } from "./Time"
import { TimeRange as _TimeRange } from "./TimeRange"
import { TimeSpan as _TimeSpan } from "./TimeSpan"
import { TimeZone as _TimeZone } from "./TimeZone"
import { Week as _Week } from "./Week"

export namespace isoly {
	export import Address = _Address
	export import CallingCode = _CallingCode
	export import CountryCode = _CountryCode
	export import DateSpan = _DateSpan
	export import DateRange = _DateRange
	export import Digit = _Digit
	export import Currency = _Currency
	/// @deprecated
	export import CurrencyCode = Currency.Code
	export import Date = _Date
	export import DateTime = _DateTime
	export import DayOfWeek = _DayOfWeek
	export import Encoding = _Encoding
	export import Fixed = _Fixed
	export import Language = _Language
	export import Locale = _Locale
	export import Month = _Month
	export import Time = _Time
	export import TimeRange = _TimeRange
	export import TimeSpan = _TimeSpan
	export import TimeZone = _TimeZone
	export import Week = _Week
}
