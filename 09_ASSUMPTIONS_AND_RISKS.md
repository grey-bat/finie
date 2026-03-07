# Assumptions and Risks

## Assumptions already embedded
- As-of date is 2026-03-06
- Starting bank balance is 164,956
- Immediate-liquid investments net is 39,912
- Pau Pau floor amount of 35,640 is treated as committed risk but not base-timed
- Projection horizon ends 2026-09-30
- Base CDI assumption is 10.0%
- Base IPCA assumption is 5.0%

## Important modeled assumptions
- Base monthly recurring shared baseline = 27,011
- Conservative monthly recurring shared baseline = 30,000
- Optimistic monthly recurring shared baseline = 24,000
- Optimistic discretionary funding / liquidation = 300,000

## Data ambiguities
- Pau Pau timing is not fully dated
- Some investment application dates were inferred
- Some future inflows/deposits may still be implicit rather than fully modeled
- Some shared-vs-personal classification edge cases remain
- Bucket-level future Greg/Sabrina splits are assumption-driven, not perfectly transaction-derived

## Risks in migrating to Sheets
- Excel formulas may not translate 1:1 if references are copied blindly
- Manual edits can get overwritten if Apps Script refresh is not careful
- Duplicate import risk if row ids/hashes are not handled idempotently
- Rule drift if manual corrections are not harvested back into rules
- Dashboard trust breaks if the event table is incomplete

## Validation checks required before relying on model
- all future obligations have dates
- all future obligations have bucket
- all rows have scenario
- no duplicate ids in raw tabs
- uncategorized rows flagged
- missing application dates flagged in investments
- funding plan horizon matches assumptions horizon
