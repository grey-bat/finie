# TODO

## Priority 0 — keep the model from drifting
- Freeze one Google Sheet as the new source of truth
- Import the current workbook logic into that Sheet
- Stop doing primary work in local xlsx files
- Add a changelog tab and a validation tab immediately

## Priority 1 — cashflow accuracy
- Rebuild `Projection_Helper` so it is generated from structured source tables, not hand-maintained rows
- Separate known obligations from modeled recurring assumptions
- Add bank-balance reconciliation inputs by account/date
- Add a short-term “cash runway” block:
  - today balance
  - 7-day min balance
  - 14-day min balance
  - 30-day min balance
  - next shortfall date
- Add “needs transfer by” logic for actual funding timing

## Priority 2 — funding plan
- Turn scenario assumptions into a clean parameter table
- Make scenario differences explicit:
  - recurring spend baseline
  - investment haircut
  - discretionary funding timing
  - expense slippage
- Add cumulative funding needed and bridge plan by source
- Distinguish “must fund” vs “optional funding”

## Priority 3 — remodel / obra
- Create a dedicated `Remodel_Obligations` table with:
  - vendor
  - item / scope
  - document source
  - due date
  - amount
  - status
  - confidence
  - notes
- Move remodel obligations out of ad hoc helper rows
- Add vendor-level dashboard and next-30/60/90-day views
- Add overdue obligations flag

## Priority 4 — Greg vs Sabrina
- Add explicit owner/share fields to future obligations where possible
- Separate:
  - shared daily
  - remodel
  - other major shared
  - personal
- Make current exact imbalance fully reconcilable by transaction
- Add future scenario imbalance views using explicit sharing assumptions

## Priority 5 — investments
- Re-source application dates from the older inventory and statements
- Split `current observed value` vs `projected forward value`
- Add liquidity / notice-period flag only if operationally needed
- Add “available for liquidation by date” output
- Add sensitivity for tax drag and haircut

## Priority 6 — rules and ingestion
- Create raw import tabs for each account/source
- Add Apps Script importers from Drive folder
- Add idempotent append logic based on transaction id / unique hash
- Add deterministic rule application with:
  - rule id
  - match type
  - matched text
- Add manual override columns that always win
- Add regression tests using known corrected rows

## Priority 7 — Sheets-native operating system
- Add custom menu:
  - Import new files
  - Rebuild classifications
  - Rebuild projections
  - Run validations
  - Snapshot version
- Add Drive folder config in a config tab
- Add GitHub sync for Apps Script via clasp
- Add docs folder in repo with this handoff pack
- Add automated CSV exports for critical tabs if needed

## Priority 8 — validation / QA
- Validation tab should flag:
  - missing dates
  - duplicate transaction ids
  - uncategorized rows
  - future obligations with no bucket
  - investments with missing app date
  - negative net liquidation
  - scenario rows outside horizon
- Add “red flag” counts at top of dashboard

## Open data issues Codex should resolve
- Pau Pau timing
- exact source of some Inter application dates
- exact handling of Banco Inter row in shared categories
- whether all future deposits/funding inflows are now explicitly modeled
- whether loan schedule should be generated from parameters instead of imported schedule
