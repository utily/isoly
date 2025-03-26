# isoly

Data types and functions specified by ISO-standards like ISO 8601.

## Examples

- `Year`
  - `"2025"`
- `Month`
  - `"2025-05"`
  - `Month.Numeric`
    - `{ years: number, months: number }`
- `Week`
  - `"2025-W52"`
  - `Week.Numeric`
    - `{ years: number, weeks: number }`
  - `Week.Number`
    - `52`
- `WeekDay`
  - `"2025-W52-3"`
  - `WeekDay.Numeric`
    - `{ years: number, weeks: number, days: number }`
  - `WeekDay.Name`
    - `"monday"`
    - `"tuesday"`
  - `WeekDay.Number`
    - `0`
    - `1`
- `Day`
  - `"2025-D360"`
- `Date`
- `Time`
- `DateTime`
- `DateRange`
- `DateSpan`
